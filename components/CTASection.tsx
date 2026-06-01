"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { easePaint, inViewOnce } from "@/lib/animations";

/**
 * Faixa de conversão reutilizável (fundo branco, pincelada de acento).
 */
export default function CTASection({
  title = "Tem uma superfície para renovar?",
  subtitle = "Mostre-nos o espaço. Nós mostramos o que pode mudar.",
  ctaLabel = "Pedir orçamento",
  ctaHref = "/contactos",
  secondaryLabel,
  secondaryHref,
}: {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="shell py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewOnce}
        transition={{ duration: 0.8, ease: easePaint }}
        className="relative overflow-hidden rounded-[2.5rem] border border-line px-8 py-20 text-center sm:px-16"
      >
        {/* tinta de acento */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-paint-sweep opacity-[0.10] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-paint-sweep opacity-[0.08] blur-3xl"
        />

        <h2
          className="mx-auto max-w-3xl font-brand font-light uppercase tracking-wide2 text-ink"
          style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", lineHeight: 1.1 }}
        >
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-sans text-base font-light text-ink-soft">
          {subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={ctaHref} className="btn-primary">
            <span>{ctaLabel}</span>
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref} className="btn-ghost">
              <span>{secondaryLabel}</span>
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}
