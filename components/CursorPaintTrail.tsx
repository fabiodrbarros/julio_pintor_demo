"use client";

import { useEffect, useRef } from "react";

/**
 * Rasto de tinta muito subtil que segue o cursor (apenas desktop).
 * Desativado em ecrãs táteis e quando o utilizador prefere menos movimento.
 */
const COLORS = ["#FF6A2B", "#FF2E93", "#FFB627", "#8B3DD6", "#4F6BF0"];

interface Dot {
  x: number;
  y: number;
  life: number;
  color: string;
  size: number;
}

export default function CursorPaintTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Só desktop com ponteiro fino e sem preferência por menos movimento.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const dots: Dot[] = [];
    let colorIndex = 0;
    let lastSpawn = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      // limitar a densidade do rasto
      if (now - lastSpawn < 26) return;
      lastSpawn = now;
      dots.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        color: COLORS[colorIndex % COLORS.length],
        size: 7 + Math.random() * 6,
      });
      colorIndex++;
      if (dots.length > 40) dots.shift();
    };

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.life -= 0.035;
        if (d.life <= 0) {
          dots.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = d.life * 0.16;
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size * d.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] hidden mix-blend-multiply lg:block"
      style={{ filter: "blur(6px)" }}
    />
  );
}
