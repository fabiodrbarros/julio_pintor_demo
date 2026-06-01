"use client";

import { motion } from "framer-motion";
import { easePaint, inViewOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Revela conteúdo ao entrar no ecrã.
 *  - mode="fade": sobe suavemente com fade
 *  - mode="wipe": revelado por uma máscara de tinta (clip-path)
 */
export default function ScrollPaintReveal({
  children,
  className,
  delay = 0,
  mode = "fade",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  mode?: "fade" | "wipe";
}) {
  if (mode === "wipe") {
    return (
      <motion.div
        className={cn(className)}
        initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0.4 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        viewport={inViewOnce}
        transition={{ duration: 0.9, ease: easePaint, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.7, ease: easePaint, delay }}
    >
      {children}
    </motion.div>
  );
}
