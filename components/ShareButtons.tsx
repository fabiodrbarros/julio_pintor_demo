"use client";

import { useEffect, useState } from "react";

/** Partilhar uma obra: Facebook + copiar link. */
export default function ShareButtons() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  function shareFacebook() {
    // O Facebook lê os metadados Open Graph da página partilhada (título,
    // descrição e imagem). O preview só aparece quando o URL é público
    // (ex.: domínio real via Cloudflare) — em localhost fica vazio.
    const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(fb, "_blank", "noopener,width=600,height=500");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponível — ignora */
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-ink-faint">
        Partilhar
      </span>

      {/* Facebook */}
      <button
        onClick={shareFacebook}
        aria-label="Partilhar no Facebook"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-faint transition hover:border-[#1877F2] hover:text-[#1877F2]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H8.08v-2.89h2.358V9.845c0-2.334 1.388-3.62 3.51-3.62.995 0 2.034.178 2.034.178v2.25h-1.146c-1.13 0-1.48.7-1.48 1.417V12h2.518l-.402 2.89h-2.116v6.987C18.344 21.128 22 16.991 22 12z" />
        </svg>
      </button>

      {/* Copiar link */}
      <button
        onClick={copyLink}
        aria-label="Copiar link"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-faint transition hover:border-ink hover:text-ink"
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
        )}
      </button>
    </div>
  );
}
