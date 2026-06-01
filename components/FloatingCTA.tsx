"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { easePaint } from "@/lib/animations";

/**
 * CTA flutuante discreto (canto inferior esquerdo).
 * Aparece após algum scroll; escondido na página de contactos
 * e enquanto o menu lateral está aberto.
 */
export default function FloatingCTA({ menuOpen }: { menuOpen: boolean }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = visible && !menuOpen && pathname !== "/contactos";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: easePaint }}
          className="fixed bottom-5 left-4 z-30 sm:bottom-7 sm:left-7"
        >
          <Link
            href="/contactos"
            className="group flex items-center gap-3 rounded-full border border-line bg-paper/85 px-5 py-3 shadow-[0_10px_40px_rgba(20,20,20,0.10)] backdrop-blur-md transition-colors hover:border-ink"
          >
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full bg-paint-sweep"
            />
            <span className="font-sans text-[12px] uppercase tracking-wide2 text-ink">
              Pedir orçamento
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
