const tones = {
  sky: "[--tone:var(--color-sky)]",
  bridge: "[--tone:var(--color-bridge)]",
};

export const surfacePillClassName =
  "surface-pill";

export type ChipTone = keyof typeof tones;

export function chipClassName(tone: ChipTone, className = "") {
  return `chip [&>svg]:mr-1 ${tones[tone]} ${className}`;
}
