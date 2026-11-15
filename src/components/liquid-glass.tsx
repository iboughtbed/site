"use client";

import { useEffect, useId, useRef, useState } from "react";

import {
  createDisplacementMap,
  type DisplacementMap,
  supportsBackdropSvgFilter,
} from "@/lib/liquid-glass";

export function useLiquidGlass<T extends HTMLElement>({
  bezel,
  refraction,
  blur,
  saturation,
}: {
  bezel: number;
  refraction: number;
  blur: number;
  saturation: number;
}) {
  const ref = useRef<T>(null);
  const filterId = `liquid-glass-${useId().replace(/[^\w-]/g, "")}`;
  const [map, setMap] = useState<DisplacementMap | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !supportsBackdropSvgFilter()) return;
    const observer = new ResizeObserver(() => {
      const { offsetWidth: width, offsetHeight: height } = element;
      if (width === 0 || height === 0) return;
      setMap(
        createDisplacementMap({
          width,
          height,
          radius: parseFloat(getComputedStyle(element).borderTopLeftRadius),
          bezel,
          pixelRatio: window.devicePixelRatio,
        }),
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [bezel]);

  const filter = map && (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter
        id={filterId}
        x="0"
        y="0"
        width={map.width}
        height={map.height}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="frosted" />
        <feImage
          href={map.href}
          x="0"
          y="0"
          width={map.width}
          height={map.height}
          preserveAspectRatio="none"
          result="displacement"
        />
        <feDisplacementMap
          in="frosted"
          in2="displacement"
          scale={refraction * 2}
          xChannelSelector="R"
          yChannelSelector="G"
          result="refracted"
        />
        <feColorMatrix in="refracted" type="saturate" values={String(saturation)} />
      </filter>
    </svg>
  );

  return {
    ref,
    filter,
    glassProps: map
      ? { "data-liquid": "", style: { backdropFilter: `url(#${filterId})` } }
      : {},
  };
}
