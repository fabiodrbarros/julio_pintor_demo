"use client";

import { motion } from "framer-motion";
import { easePaint } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Revelação por pincelada: a camada "depois" (renovada) é revelada
 * sobre a camada "antes" (cansada) por uma máscara de tinta que
 * varre da esquerda para a direita quando entra no ecrã.
 */
export default function PaintReveal({
  before,
  after,
  className,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("relative isolate overflow-hidden", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.45 }}
    >
      {/* Antes (por baixo) */}
      <div className="relative">{before}</div>

      {/* Depois (revelado por cima) */}
      <motion.div
        className="absolute inset-0"
        variants={{
          hidden: { clipPath: "inset(0% 100% 0% 0%)" },
          show: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 1.15, ease: easePaint },
          },
        }}
      >
        {after}
      </motion.div>

      {/* Pincelada que viaja na linha de revelação */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 w-16 bg-paint-sweep opacity-70 blur-md"
        variants={{
          hidden: { left: "-10%", opacity: 0 },
          show: {
            left: ["-10%", "100%"],
            opacity: [0, 0.8, 0],
            transition: { duration: 1.15, ease: easePaint },
          },
        }}
      />
    </motion.div>
  );
}
