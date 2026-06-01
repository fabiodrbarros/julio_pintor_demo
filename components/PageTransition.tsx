"use client";

import { motion } from "framer-motion";
import { easePaint } from "@/lib/animations";

/**
 * Transição de entrada por pincelada horizontal.
 * Montado no template.tsx, corre a cada navegação:
 * uma mancha de tinta varre o ecrã e revela a página.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* pincelada que varre da esquerda e sai pela direita */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] origin-right bg-paint-sweep"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.7, ease: easePaint }}
      />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easePaint, delay: 0.18 }}
      >
        {children}
      </motion.div>
    </>
  );
}
