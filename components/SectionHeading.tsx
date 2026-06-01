"use client";

import { motion } from "framer-motion";
import { easePaint, inViewOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Cabeçalho de secção/página: eyebrow + título fino e espaçado.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.7, ease: easePaint }}
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2
        className={cn(
          "font-brand font-light uppercase tracking-wide2 text-ink",
          titleClassName,
        )}
        style={{ fontSize: "clamp(1.7rem, 4vw, 3rem)", lineHeight: 1.12 }}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-6 font-sans text-base font-light leading-relaxed text-ink-soft",
            align === "center" ? "mx-auto max-w-xl" : "max-w-2xl",
          )}
        >
          {intro}
        </p>
      )}
    </motion.div>
  );
}
