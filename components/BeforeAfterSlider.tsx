"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Comparador antes/depois reutilizável.
 * Arrasta o cursor (ou usa as setas do teclado) para comparar.
 *
 * Aceita nós React (placeholders) ou imagens reais:
 *   <BeforeAfterSlider before={<Image .../>} after={<Image .../>} />
 */
export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Antes",
  afterLabel = "Depois",
  className,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div
      className={cn(
        "relative isolate select-none overflow-hidden rounded-2xl border border-line",
        className,
      )}
    >
      {/* Depois (base, à direita) */}
      <div className="relative">{after}</div>

      {/* Antes (por cima, recortado à esquerda) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {before}
      </div>

      {/* etiquetas */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-paper/85 px-3 py-1 font-sans text-[10px] uppercase tracking-wide2 text-ink backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/85 px-3 py-1 font-sans text-[10px] uppercase tracking-wide2 text-paper backdrop-blur">
        {afterLabel}
      </span>

      {/* linha + pega */}
      <div
        className="pointer-events-none absolute inset-y-0 w-[2px] bg-paper shadow-[0_0_0_1px_rgba(20,20,20,0.06)]"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper shadow-[0_6px_20px_rgba(20,20,20,0.18)]">
          <span className="h-3 w-3 rounded-full bg-paint-sweep" />
        </span>
      </div>

      {/* controlo acessível (rato + teclado) */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Comparar antes e depois"
        aria-valuetext={`${pos}% revelado`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
