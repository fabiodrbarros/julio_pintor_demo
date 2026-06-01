"use client";

import { motion } from "framer-motion";
import { paintHex, type PaintAccent } from "@/lib/utils";
import { easePaint } from "@/lib/animations";
import type { ServiceAnimation } from "@/data/services";

/**
 * Ícone/ilustração animada própria de cada serviço.
 * Reage ao estado "hover" propagado pelo ServiceAnimationCard
 * (variants "rest" / "hover").
 */
export default function AnimatedServiceIcon({
  animation,
  accent,
}: {
  animation: ServiceAnimation;
  accent: PaintAccent;
}) {
  const c = paintHex[accent];
  const stroke = {
    fill: "none",
    stroke: "#141414",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const t = { duration: 0.8, ease: easePaint };

  const svgProps = {
    viewBox: "0 0 72 72",
    className: "h-16 w-16",
    "aria-hidden": true as const,
  };

  switch (animation) {
    // Pintura interior — rolo passa e revela cor
    case "roller":
      return (
        <svg {...svgProps}>
          <rect x="10" y="18" width="46" height="36" {...stroke} />
          <motion.rect
            x="10"
            y="18"
            width="46"
            height="36"
            fill={c}
            opacity={0.85}
            style={{ transformBox: "fill-box", transformOrigin: "0% 50%" }}
            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={t}
          />
          <motion.g
            variants={{ rest: { x: -2 }, hover: { x: 44 } }}
            transition={t}
          >
            <rect x="6" y="14" width="10" height="9" rx="1.5" {...stroke} fill="#fff" />
            <path d="M11 23v7M11 30h7" {...stroke} />
          </motion.g>
        </svg>
      );

    // Pintura exterior / fachadas — fachada ganha cor em camadas
    case "facade":
      return (
        <svg {...svgProps}>
          <motion.rect
            x="16"
            y="12"
            width="40"
            height="48"
            fill={c}
            opacity={0.8}
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
            variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
            transition={t}
          />
          <rect x="16" y="12" width="40" height="48" {...stroke} />
          <rect x="23" y="20" width="9" height="11" {...stroke} />
          <rect x="40" y="20" width="9" height="11" {...stroke} />
          <rect x="23" y="38" width="9" height="11" {...stroke} />
          <rect x="40" y="38" width="9" height="11" {...stroke} />
        </svg>
      );

    // Lavagem de telhados — água escorre, surge camada protetora
    case "roofWash":
      return (
        <svg {...svgProps}>
          <path d="M12 38L36 18l24 20" {...stroke} />
          <path d="M16 44h40M16 52h40" {...stroke} />
          <motion.path
            d="M12 38L36 18l24 20"
            fill="none"
            stroke={c}
            strokeWidth={3}
            strokeLinecap="round"
            variants={{ rest: { pathLength: 0, opacity: 0 }, hover: { pathLength: 1, opacity: 1 } }}
            transition={t}
          />
          <motion.circle
            cx="36"
            cy="22"
            r="2.4"
            fill={c}
            variants={{ rest: { cy: 22, opacity: 0 }, hover: { cy: 40, opacity: [0, 1, 0] } }}
            transition={{ duration: 0.9, ease: "easeIn" }}
          />
        </svg>
      );

    // Impermeabilização — gota desliza sem entrar
    case "waterproof":
      return (
        <svg {...svgProps}>
          <path d="M10 46h52" {...stroke} />
          <motion.path
            d="M10 46h52"
            stroke={c}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
            variants={{ rest: { pathLength: 0 }, hover: { pathLength: 1 } }}
            transition={t}
          />
          <motion.path
            d="M22 26 C22 26 17 33 17 37 a5 5 0 0 0 10 0 C27 33 22 26 22 26 Z"
            fill={c}
            variants={{
              rest: { x: 0, y: 0, opacity: 1 },
              hover: { x: [0, 30, 38], y: [0, 0, -6], opacity: [1, 1, 0] },
            }}
            transition={{ duration: 1, ease: easePaint }}
          />
        </svg>
      );

    // Revestimentos — textura aparece progressivamente
    case "coating":
      return (
        <svg {...svgProps}>
          {[44, 34, 24].map((y, i) => (
            <motion.path
              key={y}
              d={`M10 ${y}q9 -7 18 0t18 0 18 0`}
              fill="none"
              stroke={i === 0 ? "#141414" : c}
              strokeWidth={1.6}
              strokeLinecap="round"
              variants={{ rest: { opacity: 0, y: 6 }, hover: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: easePaint, delay: i * 0.12 }}
            />
          ))}
        </svg>
      );

    // Acabamentos — linha imperfeita torna-se limpa
    case "finish":
      return (
        <svg {...svgProps}>
          <motion.path
            d="M10 36q6 -10 12 0t12 0 12 0 12 0"
            {...stroke}
            variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
            transition={t}
          />
          <motion.path
            d="M10 36h52"
            fill="none"
            stroke={c}
            strokeWidth={2}
            strokeLinecap="round"
            variants={{ rest: { opacity: 0, pathLength: 0 }, hover: { opacity: 1, pathLength: 1 } }}
            transition={t}
          />
        </svg>
      );

    // Remodelações — divisão muda (antes/depois)
    case "remodel":
      return (
        <svg {...svgProps}>
          <rect x="12" y="16" width="48" height="40" {...stroke} />
          <motion.rect
            x="12"
            y="16"
            width="24"
            height="40"
            fill={c}
            opacity={0.8}
            variants={{ rest: { opacity: 0 }, hover: { opacity: 0.8 } }}
            transition={t}
          />
          <motion.line
            x1="36"
            y1="16"
            x2="36"
            y2="56"
            stroke="#141414"
            strokeWidth={1.5}
            variants={{ rest: { x: 0 }, hover: { x: 10 } }}
            transition={t}
          />
        </svg>
      );

    // Obras novas — linhas arquitetónicas ganham cor e acabamento
    case "newBuild":
      return (
        <svg {...svgProps}>
          <motion.path
            d="M14 56V28l22-14 22 14v28"
            fill="none"
            stroke={c}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{ rest: { pathLength: 0, opacity: 0.3 }, hover: { pathLength: 1, opacity: 1 } }}
            transition={{ duration: 1, ease: easePaint }}
          />
          <path d="M14 56h44" {...stroke} />
          <motion.rect
            x="30"
            y="40"
            width="12"
            height="16"
            fill={c}
            opacity={0.8}
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
            variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
            transition={{ ...t, delay: 0.2 }}
          />
        </svg>
      );

    // Manutenção e recuperação — a fenda fecha-se
    case "maintenance":
      return (
        <svg {...svgProps}>
          <rect x="12" y="16" width="48" height="40" {...stroke} />
          <motion.path
            d="M36 18l-5 10 6 6-5 10 4 10"
            fill="none"
            stroke={c}
            strokeWidth={2}
            strokeLinecap="round"
            variants={{ rest: { opacity: 1, pathLength: 1 }, hover: { opacity: 0, pathLength: 0 } }}
            transition={t}
          />
          <motion.rect
            x="12"
            y="16"
            width="48"
            height="40"
            fill={c}
            opacity={0.16}
            variants={{ rest: { opacity: 0 }, hover: { opacity: 0.16 } }}
            transition={t}
          />
        </svg>
      );
  }
}
