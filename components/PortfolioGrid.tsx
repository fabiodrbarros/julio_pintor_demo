"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects, projectCategories } from "@/data/projects";
import { cn } from "@/lib/utils";

type Filter = (typeof projectCategories)[number] | "Todas";

/**
 * Galeria de obras com filtros por categoria.
 * "Antes/Depois" mostra todas as obras (cada uma é uma transformação).
 */
export default function PortfolioGrid() {
  const [filter, setFilter] = useState<Filter>("Todas");
  const filters: Filter[] = ["Todas", ...projectCategories];

  const visible = projects.filter((p) => {
    if (filter === "Todas") return true;
    if (filter === "Antes/Depois") return true;
    return p.category === filter;
  });

  return (
    <div>
      {/* filtros */}
      <div className="mb-12 flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-4 py-2 font-sans text-[12px] uppercase tracking-wide2 transition-colors duration-300",
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink hover:text-ink",
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* grelha */}
      <LayoutGroup>
        <motion.div layout className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
