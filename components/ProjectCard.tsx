"use client";

import { forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Placeholder from "./Placeholder";
import type { Project, ProjectCategory } from "@/data/projects";
import { easePaint } from "@/lib/animations";

const variantByCategory: Record<
  ProjectCategory,
  "interior" | "facade" | "roof" | "coating"
> = {
  Interiores: "interior",
  Exteriores: "facade",
  Fachadas: "facade",
  Telhados: "roof",
  Revestimentos: "coating",
};

const ProjectCard = forwardRef<HTMLElement, { project: Project }>(
  function ProjectCard({ project }, ref) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.55, ease: easePaint }}
      className="group"
    >
      <Link href={`/obras/${project.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl">
          {/* media — placeholder ou imagem real */}
          <div className="transition-transform duration-700 ease-paint group-hover:scale-[1.04]">
            {project.image ? (
              // 🔁 Imagem real (lazy loading automático do next/image)
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <Placeholder
                variant={variantByCategory[project.category]}
                accent={project.accent}
                rounded="rounded-2xl"
              />
            )}
          </div>
          {/* véu de tinta no hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-paint-sweep opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-[0.10]"
          />
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <p className="eyebrow">{project.category}</p>
          <p className="font-sans text-[11px] uppercase tracking-wide2 text-ink-faint">
            {project.location}
          </p>
        </div>
        <h3 className="mt-2 font-brand text-xl font-light uppercase tracking-wide2 text-ink">
          {project.title}
        </h3>
        <p className="mt-2 font-sans text-sm font-light leading-relaxed text-ink-soft">
          {project.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-wide2 text-ink-faint transition-colors group-hover:text-ink">
          <span className="paint-underline pb-0.5">Ver detalhes</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </motion.article>
  );
  },
);

export default ProjectCard;
