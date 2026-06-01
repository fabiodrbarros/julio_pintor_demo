import { cn, paintHex, type PaintAccent } from "@/lib/utils";

/**
 * Placeholder gráfico premium — NUNCA stock photos.
 * Fundo claro + linhas arquitetónicas finas + mancha de tinta subtil.
 *
 * 🔁 SUBSTITUIR POR IMAGEM REAL:
 *    <Image src="/images/obras/<slug>/01.jpg" alt="..." fill className="object-cover" />
 *    Ver /data/projects.ts para a estrutura de caminhos.
 */

type Variant =
  | "interior"
  | "facade"
  | "roof"
  | "wood"
  | "metal"
  | "coating"
  | "generic";

function Motif({ variant }: { variant: Variant }) {
  const stroke = "#D9D9D9";
  const sw = 1.2;
  switch (variant) {
    case "interior":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw}>
          <path d="M40 60 H260 V210 H40 Z" />
          <path d="M40 210 L20 230 M260 210 L280 230" />
          <rect x="80" y="95" width="60" height="80" />
          <path d="M170 175 H230 M170 150 H230" />
        </g>
      );
    case "facade":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw}>
          <path d="M60 40 H240 V230 H60 Z" />
          <rect x="85" y="70" width="36" height="46" />
          <rect x="160" y="70" width="36" height="46" />
          <rect x="85" y="140" width="36" height="46" />
          <rect x="160" y="140" width="36" height="46" />
        </g>
      );
    case "roof":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw}>
          <path d="M30 150 L150 60 L270 150" />
          <path d="M55 150 L150 80 L245 150" />
          <path d="M70 175 H230 M70 200 H230" />
        </g>
      );
    case "wood":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw}>
          <path d="M40 80 H260 M40 115 H260 M40 150 H260 M40 185 H260" />
          <path d="M120 80 V220 M180 60 V200" opacity={0.5} />
        </g>
      );
    case "metal":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw}>
          <path d="M50 70 H250 V200 H50 Z" />
          <path d="M50 70 L250 200 M250 70 L50 200" opacity={0.35} />
        </g>
      );
    case "coating":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw}>
          <path d="M40 200 Q90 170 140 200 T240 200" />
          <path d="M40 165 Q90 135 140 165 T240 165" opacity={0.7} />
          <path d="M40 130 Q90 100 140 130 T240 130" opacity={0.45} />
        </g>
      );
    default:
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw}>
          <path d="M40 170 H260" />
          <rect x="70" y="90" width="70" height="80" />
          <rect x="165" y="120" width="55" height="50" />
        </g>
      );
  }
}

export default function Placeholder({
  variant = "generic",
  accent = "pink",
  label,
  className,
  rounded = "rounded-2xl",
}: {
  variant?: Variant;
  accent?: PaintAccent;
  label?: string;
  className?: string;
  rounded?: string;
}) {
  const hex = paintHex[accent];
  return (
    <div
      className={cn(
        "relative isolate aspect-[4/3] w-full overflow-hidden bg-[#FBFBFB]",
        rounded,
        className,
      )}
    >
      {/* tinta subtil ao fundo */}
      <div
        aria-hidden
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-[0.16] blur-2xl"
        style={{ backgroundColor: hex }}
      />
      <div
        aria-hidden
        className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full opacity-[0.10] blur-2xl"
        style={{ backgroundColor: hex }}
      />

      {/* linhas arquitetónicas */}
      <svg
        viewBox="0 0 300 260"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <Motif variant={variant} />
        {/* pequena pincelada de acento */}
        <path
          d="M60 235 q60 -18 180 -6"
          fill="none"
          stroke={hex}
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.5}
          filter="url(#brush-texture-soft)"
        />
      </svg>

      {label && (
        <span className="absolute bottom-3 left-4 font-sans text-[10px] uppercase tracking-[0.28em] text-ink-faint">
          {label}
        </span>
      )}
    </div>
  );
}
