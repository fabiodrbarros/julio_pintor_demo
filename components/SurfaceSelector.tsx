"use client";

import { motion } from "framer-motion";
import SurfaceCard, { type SurfaceVariant } from "./SurfaceCard";
import { type PaintAccent } from "@/lib/utils";
import { easePaint, inViewOnce } from "@/lib/animations";

const surfaces: {
  name: string;
  variant: SurfaceVariant;
  accent: PaintAccent;
}[] = [
  { name: "Parede interior", variant: "wall", accent: "pink" },
  { name: "Fachada exterior", variant: "facade", accent: "orange" },
  { name: "Telhado", variant: "roof", accent: "blue" },
  { name: "Madeira", variant: "wood", accent: "amber" },
  { name: "Metal", variant: "metal", accent: "purple" },
  { name: "Revestimento", variant: "coating", accent: "pink" },
];

/**
 * "Escolhe a superfície. Nós tratamos do resto."
 * Cada superfície ganha cor (tinta) ao passar o rato / foco.
 */
export default function SurfaceSelector() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07 } },
      }}
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
    >
      {surfaces.map((s) => (
        <motion.div
          key={s.name}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: easePaint },
            },
          }}
        >
          <SurfaceCard name={s.name} variant={s.variant} accent={s.accent} />
        </motion.div>
      ))}
    </motion.div>
  );
}
