"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Botão flutuante discreto no lado direito (a meio do ecrã).
 * Usa o "C" do logótipo (recorte de logo.png) como ícone.
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
        "transition-[transform,border-color,box-shadow] duration-500 ease-paint",
        "hover:scale-110 hover:border-transparent hover:shadow-[0_8px_32px_rgba(255,46,147,0.18)]",
      )}
    >
      <Image
        src="/logo/logo-mark.png"
        alt=""
        width={44}
        height={44}
        className="h-9 w-9 shrink-0 object-contain"
      />
    </motion.button>
  );
}
