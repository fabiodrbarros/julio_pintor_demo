"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedServiceIcon from "./AnimatedServiceIcon";
import type { Service } from "@/data/services";
import { paintHex } from "@/lib/utils";
import { easePaint } from "@/lib/animations";

/**
 * Card de serviço grande, limpo e elegante.
 * A microanimação do ícone corre ao entrar no ecrã (mobile) e
 * volta a reagir ao hover/foco (desktop).
 */
export default function ServiceAnimationCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  const hex = paintHex[service.accent];

  return (
    <motion.article
      initial="rest"
      whileInView="hover"
      whileHover="hover"
      whileFocus="hover"
      viewport={{ once: true, amount: 0.5 }}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper p-8 transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(20,20,20,0.07)] sm:p-10"
    >
      {/* linha de tinta no topo, cresce no hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-paint group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, ${hex}, transparent)` }}
      />

      <div className="mb-8 text-ink">
        <AnimatedServiceIcon animation={service.animation} accent={service.accent} />
      </div>

      <h3 className="font-brand text-2xl font-light uppercase tracking-wide2 text-ink">
        {service.title}
      </h3>
      <p className="mt-4 max-w-sm flex-1 font-sans text-sm font-light leading-relaxed text-ink-soft">
        {service.description}
      </p>

      <Link
        href="/contactos"
        className="mt-8 inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-wide2 text-ink-faint transition-colors hover:text-ink"
      >
        <span className="paint-underline pb-0.5">Pedir orçamento</span>
        <motion.span
          aria-hidden
          variants={{ rest: { x: 0 }, hover: { x: 4 } }}
          transition={{ duration: 0.4, ease: easePaint }}
        >
          →
        </motion.span>
      </Link>
    </motion.article>
  );
}
