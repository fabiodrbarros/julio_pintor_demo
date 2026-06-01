"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Botão flutuante discreto no lado direito (a meio do ecrã).
 * Forma de gota de tinta minimal. Sem header tradicional.
 */
export default function FloatingMenuButton({
  onOpen,
  hidden,
}: {
  onOpen: () => void;
  hidden: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label="Abrir menu"
      aria-haspopup="dialog"
      initial={{ opacity: 0, x: 30 }}
      animate={{
        opacity: hidden ? 0 : 1,
        x: hidden ? 30 : 0,
        pointerEvents: hidden ? "none" : "auto",
      }}
      transition={{ duration: 0.5, delay: hidden ? 0 : 1.6 }}
      className={cn(
        "group fixed right-4 top-1/2 z-30 -translate-y-1/2 sm:right-6",
        "flex h-14 w-14 items-center justify-center rounded-full",
        "border border-line bg-paper/80 backdrop-blur-md",
        "shadow-[0_8px_30px_rgba(20,20,20,0.08)]",
        "transition-[transform,border-color] duration-500 ease-paint",
        "hover:scale-105 hover:border-paint-pink/40",
      )}
    >
      {/* anel de tinta que pulsa muito subtilmente */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 180deg, #FF6A2B, #FF2E93, #8B3DD6, #4F6BF0, #FF6A2B)",
          WebkitMask:
            "radial-gradient(circle, transparent 60%, #000 61%, #000 62%, transparent 64%)",
          mask: "radial-gradient(circle, transparent 60%, #000 61%, #000 62%, transparent 64%)",
        }}
      />

      {/* gota de tinta */}
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M12 3 C12 3 5.5 11 5.5 15.8 a6.5 6.5 0 0 0 13 0 C18.5 11 12 3 12 3 Z"
          fill="url(#paintGradient)"
          className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <path
          d="M12 3 C12 3 5.5 11 5.5 15.8 a6.5 6.5 0 0 0 13 0 C18.5 11 12 3 12 3 Z"
          fill="none"
          stroke="#141414"
          strokeWidth="1.1"
          className="transition-opacity duration-500 group-hover:opacity-0"
        />
      </svg>
    </motion.button>
  );
}
