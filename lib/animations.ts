import type { Variants, Transition } from "framer-motion";

/** Easing "pintura" — suave, premium, derivado da pincelada. */
export const easePaint: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 26,
};

/** Entrada suave de baixo para cima. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easePaint },
  },
};

/** Entrada com leve escala (para cards e media). */
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easePaint },
  },
};

/** Container que escalona a entrada dos filhos. */
export const stagger = (delayChildren = 0.05, staggerChildren = 0.09): Variants => ({
  hidden: {},
  show: {
    transition: { delayChildren, staggerChildren },
  },
});

/** Revelação por máscara de tinta (clip-path) — de baixo para cima. */
export const paintWipeUp: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.9, ease: easePaint },
  },
};

/** Desenho de traço (pathLength) — para SVGs de pincel/ícones. */
export const drawStroke: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.6, ease: easePaint },
  },
};

/** Viewport partilhado para animações on-scroll. */
export const inViewOnce = { once: true, amount: 0.3 } as const;
