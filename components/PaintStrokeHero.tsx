"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PaintRing from "./PaintRing";
import { company } from "@/data/company";
import { easePaint } from "@/lib/animations";

/**
 * Hero da homepage.
 * Começa quase vazio sobre fundo branco; a pincelada circular é
 * "pintada" no momento e só depois surge o wordmark JÚLIO PINTOR.
 */
export default function PaintStrokeHero() {
  const reveal = {
    hidden: { opacity: 0, y: 18 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easePaint, delay: 1.05 + i * 0.14 },
    }),
  };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* halo de tinta muito subtil ao fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full opacity-[0.06] blur-3xl bg-paint-sweep"
      />

      <div className="shell grid w-full items-center gap-10 py-24 lg:grid-cols-12 lg:gap-6">
        {/* Pincelada circular */}
        <div className="order-1 flex justify-center lg:order-1 lg:col-span-5 lg:justify-start">
          <PaintRing
            animate
            className="w-[clamp(240px,42vw,500px)] h-auto"
          />
        </div>

        {/* Texto */}
        <div className="order-2 lg:col-span-7">
          <motion.p
            custom={0}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="eyebrow mb-6"
          >
            Atelier de pintura · {company.location}
          </motion.p>

          <motion.h1
            custom={1}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="wordmark text-ink"
            style={{
              fontSize: "clamp(2.4rem, 7vw, 5.2rem)",
              lineHeight: 1.04,
            }}
          >
            JÚLIO
            <br />
            PINTOR
          </motion.h1>

          <motion.p
            custom={2}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-md font-sans text-base font-light text-ink-soft sm:text-lg"
          >
            {company.tagline}
          </motion.p>

          <motion.p
            custom={3}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mt-3 max-w-md font-sans text-lg font-light sm:text-xl"
          >
            <span className="text-paint">{company.shortPitch}</span>
          </motion.p>

          <motion.div
            custom={4}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link href="/contactos" className="btn-primary">
              <span>Pedir orçamento</span>
            </Link>
            <Link href="/transformacoes" className="btn-ghost">
              <span>Ver transformações</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-hidden
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ink-faint">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-paint-pink to-transparent"
        />
      </motion.div>
    </section>
  );
}
