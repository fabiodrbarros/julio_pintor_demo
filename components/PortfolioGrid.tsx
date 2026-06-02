"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projectCategories, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type Filter = (typeof projectCategories)[number] | "Todas";

/**
 * Galeria de obras com filtros por categoria.
 * As categorias vêm de `projectCategories` (fonte única, igual à do admin).
 */
export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("Todas");
  const filters: Filter[] = ["Todas", ...projectCategories];

  const visible = projects.filter((p) => {
    if (filter === "Todas") return true;
    return p.category === filter;
  });

  return (
    <div className="lg:flex lg:gap-12">
      {/* Filtros — horizontais no mobile, coluna vertical (sticky) no desktop */}
      <aside className="mb-10 lg:mb-0 lg:w-60 lg:shrink-0 lg:self-start lg:sticky lg:top-28">
        <p className="eyebrow mb-3">Filtrar por</p>
        <ul className="flex flex-col border-t border-line">
          {filters.map((f) => {
            const active = filter === f;
            return (
              <li key={f}>
                <button
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 border-b border-line py-3 text-left font-sans text-[12px] uppercase tracking-wide2 transition-colors duration-300",
                    active ? "text-ink" : "text-ink-faint hover:text-ink-soft",
                  )}
                >
                  <span>{f}</span>
                  {/* marca de tinta no selecionado */}
                  <span
                    aria-hidden
                    className={cn(
                      "h-1.5 w-1.5 rounded-full bg-paint-sweep transition-opacity duration-300",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Grelha de obras, ao lado dos filtros */}
      <div className="min-w-0 flex-1">
        <LayoutGroup>
          <motion.div layout className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}
