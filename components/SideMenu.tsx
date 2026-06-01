"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { navLinks, cn } from "@/lib/utils";
import { easePaint } from "@/lib/animations";

/**
 * Menu lateral escondido à direita.
 * Abre com animação fluida; fundo branco translúcido (vidro fosco)
 * com uma pincelada colorida subtil. Links grandes, finos e espaçados.
 */
export default function SideMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  // Fechar com Escape + bloquear scroll do body quando aberto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // foco no painel para navegação por teclado
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const linkVariants = {
    hidden: { opacity: 0, x: 26 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.12 + i * 0.07, duration: 0.5, ease: easePaint },
    }),
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Fechar menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 z-40 cursor-default bg-ink/10 backdrop-blur-sm"
          />

          {/* Painel */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: easePaint }}
            className={cn(
              "fixed right-0 top-0 z-50 flex h-[100dvh] w-full flex-col",
              "sm:w-[440px]",
              "bg-paper/85 backdrop-blur-xl",
              "border-l border-line shadow-[0_0_80px_rgba(20,20,20,0.08)]",
            )}
          >
            {/* Pincelada colorida subtil ao fundo do painel */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-paint-sweep opacity-[0.10] blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-1 w-full bg-paint-sweep opacity-70"
            />

            {/* Topo: logo + fechar */}
            <div className="flex items-center justify-between px-8 pt-8">
              <Logo ringSize={30} onClick={onClose} href="/" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar menu"
                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-ink"
              >
                <span className="absolute h-px w-5 rotate-45 bg-ink transition-transform group-hover:scale-110" />
                <span className="absolute h-px w-5 -rotate-45 bg-ink transition-transform group-hover:scale-110" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-1 flex-col justify-center overflow-y-auto px-8 py-4">
              <ul className="space-y-1">
                {navLinks.map((link, i) => {
                  const active =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <motion.li
                      key={link.href}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="show"
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-baseline py-2"
                      >
                        <span
                          className={cn(
                            "paint-underline pb-1 font-brand text-[1.1rem] font-light uppercase tracking-[0.12em] text-ink transition-colors sm:text-[1.25rem]",
                            active && "[background-size:100%_2px]",
                          )}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* CTA + rodapé do menu */}
            <div className="px-8 pb-10">
              <Link
                href="/contactos"
                onClick={onClose}
                className="btn-primary w-full"
              >
                <span>Pedir orçamento</span>
              </Link>
              <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.28em] text-ink-faint">
                Arcos de Valdevez · Viana do Castelo
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
