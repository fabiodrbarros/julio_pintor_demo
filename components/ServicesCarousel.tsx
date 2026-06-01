"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceAnimationCard from "./ServiceAnimationCard";
import { services } from "@/data/services";
import { easePaint } from "@/lib/animations";

const VISIBLE = 3; // cards visíveis em desktop

export default function ServicesCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);

  const total = services.length;
  const maxIndex = total - VISIBLE;

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(next, maxIndex));
      setDir(clamped >= index ? 1 : -1);
      setIndex(clamped);
    },
    [index, maxIndex],
  );

  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  /* swipe por drag */
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    dragStartX.current =
      "touches" in e ? e.touches[0].clientX : e.clientX;
  };
  const onDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const endX =
      "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const delta = dragStartX.current - endX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
  };

  return (
    <div className="mt-14 select-none">
      {/* Track */}
      <div
        ref={trackRef}
        className="overflow-hidden"
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
      >
        <motion.div
          className="flex gap-6"
          animate={{ x: `calc(-${index} * (100% / ${VISIBLE} + 8px))` }}
          transition={{ duration: 0.55, ease: easePaint }}
          style={{ cursor: "grab" }}
        >
          {services.map((service, i) => (
            <div
              key={service.slug}
              className="w-[calc((100%-48px)/3)] shrink-0 max-lg:w-[calc((100%-24px)/2)] max-sm:w-full"
            >
              <ServiceAnimationCard service={service} index={i} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controlos */}
      <div className="mt-8 flex items-center justify-between">
        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Serviço ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-400 ease-paint focus:outline-none"
              style={{
                width: i === index ? 24 : 6,
                background:
                  i === index
                    ? "linear-gradient(90deg,#FF6A2B,#FF2E93)"
                    : "#d4d0cc",
              }}
            />
          ))}
        </div>

        {/* Setas */}
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={index === 0}
            aria-label="Anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-300 hover:border-ink disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={index === maxIndex}
            aria-label="Seguinte"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-300 hover:border-ink disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
