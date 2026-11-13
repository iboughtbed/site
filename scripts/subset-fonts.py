# /// script
# requires-python = ">=3.9"
# dependencies = ["fonttools[woff]==4.60.2"]
# ///
"""Subset JetBrains Mono into a preloaded core file and an on-demand extended file.

Run by hand, then commit the output (public/fonts/*, src/app/fonts.css, src/lib/fonts.ts):

    uv run scripts/subset-fonts.py
    # or: python3 -m venv /tmp/fonts-venv && /tmp/fonts-venv/bin/pip install "fonttools[woff]==4.60.2"
    #     /tmp/fonts-venv/bin/python scripts/subset-fonts.py

Rerun when:
- content gains a non-ASCII character outside Latin-1 and Latin Extended-A (the script scans src/),
- the site starts using a weight outside WEIGHT_RANGE, italics, or another OpenType feature (update WEIGHT_RANGE / FEATURES),
- the font version changes (update SOURCE_URL / SOURCE_SHA256).
"""

import hashlib
import io
import re
import sys
import tempfile
import urllib.request
from pathlib import Path

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
SOURCE_URL = (
    "https://raw.githubusercontent.com/google/fonts/2e05c1cf00a6e4f40a4b931600a90881c26e15cd"
    "/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf"
)
SOURCE_SHA256 = "48715a42ec242c21e9f02692891e147d022299a52e48d5e413e1a942193ffeda"

FAMILY = "JetBrains Mono"
FILE_STEM = "jetbrains-mono"
# WHY: only weight 500 is used, but pinning or narrowing below 400-800 rescales deltas and
# moves glyph edges by sub-pixel amounts; 400-800 keeps the default master and the deltas
# used at 500 untouched, so text renders the same as the full font.
WEIGHT_RANGE = (400, 800)
FEATURES = ["calt", "ccmp", "locl", "mark"]

CORE = {*range(0x20, 0x7F), 0xA0, 0x2010, 0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2026}
LATIN_1_AND_EXTENDED_A = set(range(0xA0, 0x180))
CONTENT_GLOBS = ["src/**/*.ts", "src/**/*.tsx", "src/**/*.css", "src/**/*.md", "src/**/*.mdx"]
GENERATED = {ROOT / "src/app/fonts.css", ROOT / "src/lib/fonts.ts"}

FONT_DIR = ROOT / "public/fonts"
CSS_PATH = ROOT / "src/app/fonts.css"
TS_PATH = ROOT / "src/lib/fonts.ts"

FALLBACK_FACE = """@font-face {
  font-family: "JetBrains Mono Fallback";
  src: local(Arial);
  ascent-override: 75.79%;
  descent-override: 22.29%;
  line-gap-override: 0%;
  size-adjust: 134.59%;
}

.font-jetbrains-mono {
  --font-mono: "JetBrains Mono", "JetBrains Mono Fallback";
}
"""


def load_source() -> bytes:
    cache = Path(tempfile.gettempdir()) / f"jetbrains-mono-{SOURCE_SHA256[:12]}.ttf"
    if not cache.exists():
        with urllib.request.urlopen(SOURCE_URL) as response:
            cache.write_bytes(response.read())
    data = cache.read_bytes()
    if hashlib.sha256(data).hexdigest() != SOURCE_SHA256:
        cache.unlink()
        sys.exit("source font checksum mismatch")
    return data


def content_characters() -> set[int]:
    characters = set()
    for pattern in CONTENT_GLOBS:
        for path in ROOT.glob(pattern):
            if path not in GENERATED:
                characters |= {ord(char) for char in path.read_text(encoding="utf-8") if ord(char) > 0x7E}
    return characters


def static_instance(font: TTFont, weight: int) -> TTFont:
    return instantiateVariableFont(font, {"wght": weight}, inplace=False)


def subset(source: bytes, unicodes: set[int]) -> TTFont:
    font = TTFont(io.BytesIO(source), recalcTimestamp=False)
    options = Options()
    options.layout_features = FEATURES
    options.hinting = False
    options.notdef_outline = True
    options.name_IDs = ["*"]
    options.name_languages = ["*"]
    options.drop_tables += ["STAT", "DSIG"]
    subsetter = Subsetter(options)
    subsetter.populate(unicodes=sorted(unicodes))
    subsetter.subset(font)
    buffer = io.BytesIO()
    font.save(buffer)
    font = instantiateVariableFont(TTFont(io.BytesIO(buffer.getvalue()), recalcTimestamp=False), {"wght": WEIGHT_RANGE})
    font.recalcTimestamp = False
    font.flavor = "woff2"
    return font


def unicode_range(codepoints: set[int]) -> str:
    spans, start, previous = [], None, None
    for codepoint in sorted(codepoints):
        if start is not None and codepoint == previous + 1:
            previous = codepoint
            continue
        if start is not None:
            spans.append((start, previous))
        start = previous = codepoint
    if start is not None:
        spans.append((start, previous))
    return ", ".join(f"U+{a:X}" if a == b else f"U+{a:X}-{b:X}" for a, b in spans)


def verify(font: TTFont, source: TTFont, requested: set[int]) -> None:
    cmap = font.getBestCmap()
    missing = (requested & source.getBestCmap().keys()) - cmap.keys()
    extra = cmap.keys() - requested
    assert not missing, f"lost characters: {sorted(missing)}"
    assert not extra, f"unexpected characters: {sorted(extra)}"
    axes = [(axis.axisTag, axis.minValue, axis.maxValue) for axis in font["fvar"].axes]
    assert axes == [("wght", *WEIGHT_RANGE)], f"unexpected axes: {axes}"
    assert not ({"fpgm", "prep", "cvt "} & set(font.keys())), "hinting tables left behind"
    features = {
        record.FeatureTag
        for table in ("GSUB", "GPOS")
        if table in font and font[table].table.FeatureList
        for record in font[table].table.FeatureList.FeatureRecord
    }
    assert features <= set(FEATURES), f"unexpected features: {sorted(features - set(FEATURES))}"
    for weight in WEIGHT_RANGE:
        tolerance = 0 if weight == 400 else 0.5
        compare_outlines(static_instance(font, weight), static_instance(source, weight), weight, tolerance)


def compare_outlines(font: TTFont, reference: TTFont, weight: int, tolerance: float) -> None:
    glyf, reference_glyf = font["glyf"], reference["glyf"]
    reference_cmap = reference.getBestCmap()
    for codepoint, name in font.getBestCmap().items():
        expected_name = reference_cmap[codepoint]
        glyph, expected = glyf[name], reference_glyf[expected_name]
        outline = list(glyph.getCoordinates(glyf)[0]) if glyph.numberOfContours else []
        expected_outline = list(expected.getCoordinates(reference_glyf)[0]) if expected.numberOfContours else []
        deviation = max(
            (max(abs(x - ex), abs(y - ey)) for (x, y), (ex, ey) in zip(outline, expected_outline)),
            default=0,
        )
        same_shape = len(outline) == len(expected_outline) and deviation <= tolerance
        same_advance = font["hmtx"][name][0] == reference["hmtx"][expected_name][0]
        assert same_shape and same_advance, f"glyph changed for U+{codepoint:04X} at wght {weight}"


def write_font(font: TTFont, label: str) -> tuple[str, int]:
    buffer = io.BytesIO()
    font.save(buffer)
    data = buffer.getvalue()
    name = f"{FILE_STEM}-{label}.{hashlib.sha256(data).hexdigest()[:10]}.woff2"
    (FONT_DIR / name).write_bytes(data)
    return f"/fonts/{name}", len(data)


def font_face(href: str, codepoints: set[int]) -> str:
    return f"""@font-face {{
  font-family: "{FAMILY}";
  font-style: normal;
  font-weight: {WEIGHT_RANGE[0]} {WEIGHT_RANGE[1]};
  font-display: swap;
  src: url("{href}") format("woff2");
  unicode-range: {unicode_range(codepoints)};
}}
"""


def main() -> None:
    source = load_source()
    reference = TTFont(io.BytesIO(source))
    available = set(reference.getBestCmap())
    used = content_characters()
    core = CORE & available
    extended = ((LATIN_1_AND_EXTENDED_A | used) & available) - core
    skipped = used - available

    FONT_DIR.mkdir(parents=True, exist_ok=True)
    for old in FONT_DIR.glob(f"{FILE_STEM}-*.woff2"):
        old.unlink()

    faces, report = [], []
    for label, unicodes in (("core", core), ("extended", extended)):
        font = subset(source, unicodes)
        verify(font, reference, unicodes)
        codepoints = set(font.getBestCmap())
        href, size = write_font(font, label)
        faces.append((label, href, codepoints))
        report.append(f"{label}: {size} B, {font['maxp'].numGlyphs} glyphs, {len(codepoints)} characters -> {href}")

    CSS_PATH.write_text(
        "/* Generated by scripts/subset-fonts.py. Do not edit. */\n\n"
        + "\n".join(font_face(href, codepoints) for _, href, codepoints in faces)
        + "\n"
        + FALLBACK_FACE,
        encoding="utf-8",
    )
    core_href = next(href for label, href, _ in faces if label == "core")
    TS_PATH.write_text(
        f'// Generated by scripts/subset-fonts.py. Do not edit.\nexport const preloadFontHref = "{core_href}";\n',
        encoding="utf-8",
    )

    print("\n".join(report))
    if skipped:
        print("not in the font, left to fallback fonts:", unicode_range(skipped))


if __name__ == "__main__":
    main()
