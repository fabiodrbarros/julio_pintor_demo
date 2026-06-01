"use client";

import { motion } from "framer-motion";
import { easePaint } from "@/lib/animations";

/**
 * Pincelada circular aberta — recriação fiel do símbolo do logótipo.
 * Anel "C" aberto à direita, com textura de pincel e gradiente de tinta.
 *
 * - `animate`: desenha o traço como se estivesse a ser pintado agora.
 * - usa o filtro #brush-texture (ver PaintDefs, montado no layout).
 */

// Anel aberto: lacuna de ~70° à direita, como no logótipo.
const RING_PATH = "M 178.8 158.18 A 84 84 0 1 1 178.8 61.82";
// Pequeno segundo passo de pincel, mais curto, para dar densidade.
const ACCENT_PATH = "M 60 176 A 84 84 0 0 1 36 96";

export default function PaintRing({
  size = 220,
  strokeWidth = 26,
  animate = false,
  className = "",
  delay = 0,
}: {
  size?: number;
  strokeWidth?: number;
  animate?: boolean;
  className?: string;
  delay?: number;
}) {
  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Pincelada circular Júlio Pintor"
    >
      <g filter="url(#brush-texture)">
        {/* Traço principal do anel. */}
        <motion.path
          d={RING_PATH}
          fill="none"
          stroke="url(#paintRing)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={animate ? { pathLength: 0, opacity: 0 } : false}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.7, ease: easePaint, delay }}
        />
        {/* Segundo passo de pincel — densidade e textura. */}
        <motion.path
          d={ACCENT_PATH}
          fill="none"
          stroke="url(#paintRing)"
          strokeWidth={strokeWidth * 0.5}
          strokeLinecap="round"
          opacity={0.55}
          initial={animate ? { pathLength: 0 } : false}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.4, ease: easePaint, delay: delay + 0.3 }}
        />
      </g>
    </svg>
  );
}
