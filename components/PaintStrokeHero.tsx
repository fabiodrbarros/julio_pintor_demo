"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { company } from "@/data/company";
import { easePaint } from "@/lib/animations";

/**
 * Hero da homepage.
 * Logo oficial (pincelada + wordmark) à esquerda, animado com fade+scale.
 * Tagline, pitch e CTAs à direita.
 */
export default function PaintStrokeHero() {
  const reveal = {
    hidden: { opacity: 0, y: 18 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easePaint, delay: 1.0 + i * 0.14 },
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
        {/* Logo oficial — pincelada circular com JÚLIO PINTOR dentro */}
        <motion.div
          className="order-1 flex justify-center lg:order-1 lg:col-span-6 lg:justify-start"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: easePaint, delay: 0.1 }}
        >
          <Image
            src="/logo/logo.png"
            alt={company.brandName}
            width={900}
            height={305}
            priority
            className="w-[clamp(340px,74vw,900px)] h-auto"
          />
        </motion.div>

        {/* Texto */}
        <div className="order-2 lg:col-span-6">
          <motion.p
            custom={0}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mt-2 max-w-md font-sans text-base font-light text-ink-soft sm:text-lg"
          >
            {company.tagline}
          </motion.p>

          <motion.p
            custom={2}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mt-3 max-w-md font-sans text-lg font-light sm:text-xl"
          >
            <span className="text-paint">{company.shortPitch}</span>
          </motion.p>

          <motion.div
            custom={3}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link href="/contactos" className="btn-primary">
              <span>Pedir orçamento</span>
            </Link>
            <Link href="/obras" className="btn-ghost">
              <span>Ver obras</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* indicador de scroll — gota de tinta (estável, com bob suave) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
        aria-hidden
      >
        <motion.svg
          width="28"
          height="40"
          viewBox="0 0 28 40"
          fill="none"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="dripGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6A2B" />
              <stop offset="42%" stopColor="#FF2E93" />
              <stop offset="100%" stopColor="#8B3DD6" />
            </linearGradient>
          </defs>
          {/* gota estável (sem piscar) */}
          <path
            d="M14 3 C14 3 4 17 4 26 a10 10 0 0 0 20 0 C24 17 14 3 14 3 Z"
            fill="url(#dripGrad)"
          />
        </motion.svg>

        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ink-faint">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
