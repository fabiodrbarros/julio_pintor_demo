"use client";

import { paintHex, cn, type PaintAccent } from "@/lib/utils";

export type SurfaceVariant =
  | "wall"
  | "facade"
  | "roof"
  | "wood"
  | "metal"
  | "coating";

function SurfaceIcon({ variant }: { variant: SurfaceVariant }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (variant) {
    case "wall":
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" {...common}>
          <rect x="8" y="10" width="32" height="28" />
          <path d="M8 19h32M8 28h32M19 10v9M30 19v9M14 28v10M34 28v10" />
        </svg>
      );
    case "facade":
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" {...common}>
          <path d="M12 8h24v32H12z" />
          <rect x="17" y="14" width="6" height="7" />
          <rect x="25" y="14" width="6" height="7" />
          <rect x="17" y="26" width="6" height="7" />
          <rect x="25" y="26" width="6" height="7" />
        </svg>
      );
    case "roof":
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" {...common}>
          <path d="M8 26L24 12l16 14" />
          <path d="M13 26L24 17l11 9" />
          <path d="M14 32h20M14 37h20" />
        </svg>
      );
    case "wood":
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" {...common}>
          <path d="M9 15h30M9 24h30M9 33h30" />
          <path d="M22 15v18M31 12v15" opacity={0.6} />
        </svg>
      );
    case "metal":
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" {...common}>
          <rect x="10" y="12" width="28" height="24" />
          <path d="M10 12l28 24M38 12L10 36" opacity={0.4} />
        </svg>
      );
    case "coating":
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" {...common}>
          <path d="M9 34q7-6 15 0t15 0" />
          <path d="M9 26q7-6 15 0t15 0" opacity={0.7} />
          <path d="M9 18q7-6 15 0t15 0" opacity={0.45} />
        </svg>
      );
  }
}

export default function SurfaceCard({
  name,
  variant,
  accent,
}: {
  name: string;
  variant: SurfaceVariant;
  accent: PaintAccent;
}) {
  const hex = paintHex[accent];
  return (
    <button
      type="button"
      tabIndex={0}
      aria-label={name}
      className="group relative isolate flex h-44 flex-col items-start justify-between overflow-hidden rounded-2xl border border-line bg-paper p-5 text-left transition-colors duration-500 hover:border-transparent focus-visible:border-transparent sm:h-52"
    >
      {/* tinta que sobe a partir de baixo no hover */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-[650ms] ease-paint group-hover:scale-y-100 group-focus-visible:scale-y-100"
        style={{
          background: `linear-gradient(160deg, ${hex}, ${hex}cc)`,
        }}
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ filter: "url(#brush-texture-soft)" }}
      />

      <span className="text-ink transition-colors duration-500 group-hover:text-paper group-focus-visible:text-paper">
        <SurfaceIcon variant={variant} />
      </span>

      <span className="font-sans text-sm font-light uppercase tracking-wide2 text-ink transition-colors duration-500 group-hover:text-paper group-focus-visible:text-paper">
        {name}
      </span>
    </button>
  );
}
