const refractiveIndex = 1.5;
const profileSamples = 128;

function convexSquircle(t: number) {
  return Math.pow(1 - Math.pow(1 - t, 4), 1 / 4);
}

function buildRefractionProfile() {
  const profile = new Float32Array(profileSamples + 1);
  const step = 1 / profileSamples;
  for (let i = 0; i <= profileSamples; i++) {
    const t = i * step;
    const before = Math.max(t - step / 2, 0);
    const after = Math.min(t + step / 2, 1);
    const slope = (convexSquircle(after) - convexSquircle(before)) / (after - before);
    const incidence = Math.atan(slope);
    const refraction = Math.asin(Math.sin(incidence) / refractiveIndex);
    profile[i] = Math.tan(incidence - refraction);
  }
  const strongest = Math.max(...profile);
  return profile.map((value) => value / strongest);
}

const refractionProfile = buildRefractionProfile();

function outwardNormal(x: number, y: number, innerHalfWidth: number, innerHalfHeight: number) {
  const qx = Math.abs(x) - innerHalfWidth;
  const qy = Math.abs(y) - innerHalfHeight;
  if (qx > 0 && qy > 0) {
    const length = Math.hypot(qx, qy);
    return { nx: (Math.sign(x) * qx) / length, ny: (Math.sign(y) * qy) / length, distance: length };
  }
  return qx > qy
    ? { nx: Math.sign(x), ny: 0, distance: qx }
    : { nx: 0, ny: Math.sign(y), distance: qy };
}

export type DisplacementMap = { href: string; width: number; height: number };

export function createDisplacementMap({
  width,
  height,
  radius,
  bezel,
  pixelRatio,
}: {
  width: number;
  height: number;
  radius: number;
  bezel: number;
  pixelRatio: number;
}): DisplacementMap {
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width * pixelRatio);
  canvas.height = Math.ceil(height * pixelRatio);
  const context = canvas.getContext("2d")!;
  const image = context.createImageData(canvas.width, canvas.height);

  const cornerRadius = Math.min(radius, width / 2, height / 2);
  const innerHalfWidth = width / 2 - cornerRadius;
  const innerHalfHeight = height / 2 - cornerRadius;

  for (let row = 0; row < canvas.height; row++) {
    for (let column = 0; column < canvas.width; column++) {
      const x = (column + 0.5) / pixelRatio - width / 2;
      const y = (row + 0.5) / pixelRatio - height / 2;
      const { nx, ny, distance } = outwardNormal(x, y, innerHalfWidth, innerHalfHeight);
      const depth = cornerRadius - distance;
      const t = depth / bezel;
      const strength =
        t >= 0 && t < 1 ? refractionProfile[Math.round(t * profileSamples)] : 0;

      const offset = (row * canvas.width + column) * 4;
      image.data[offset] = 128 - nx * strength * 127;
      image.data[offset + 1] = 128 - ny * strength * 127;
      image.data[offset + 2] = 128;
      image.data[offset + 3] = 255;
    }
  }

  context.putImageData(image, 0, 0);
  return { href: canvas.toDataURL(), width, height };
}

export function supportsBackdropSvgFilter() {
  return (
    "userAgentData" in navigator &&
    !window.matchMedia("(prefers-reduced-transparency: reduce)").matches
  );
}
