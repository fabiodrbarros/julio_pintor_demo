import Link from "next/link";
import Logo from "./Logo";
import { navLinks } from "@/lib/utils";
import {
  company,
  hasInstagram,
  hasFacebook,
} from "@/data/company";

/** Footer minimalista, alinhado ao logótipo. */
export default function FooterMinimal() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-line">
      {/* pincelada fina no topo do footer */}
      <div aria-hidden className="h-px w-full bg-paint-sweep opacity-60" />

      <div className="shell grid gap-12 py-16 md:grid-cols-12">
        {/* Marca */}
        <div className="md:col-span-5">
          <Logo ringSize={36} />
          <p className="mt-6 max-w-xs font-sans text-sm font-light text-ink-soft">
            Pintura, acabamentos e soluções profissionais.
          </p>
          <p className="mt-4 font-sans text-[12px] uppercase tracking-wide2 text-ink-faint">
            {company.location}
          </p>
        </div>

        {/* Navegação */}
        <nav className="md:col-span-4" aria-label="Rodapé">
          <p className="eyebrow mb-5">Navegação</p>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="paint-underline pb-0.5 font-sans text-sm font-light text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Redes sociais */}
        <div className="md:col-span-3">
          <p className="eyebrow mb-5">Seguir</p>
          {hasInstagram || hasFacebook ? (
            <ul className="space-y-3">
              {hasInstagram && (
                <li>
                  <a
                    href={company.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="paint-underline pb-0.5 font-sans text-sm font-light text-ink-soft transition-colors hover:text-ink"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {hasFacebook && (
                <li>
                  <a
                    href={company.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="paint-underline pb-0.5 font-sans text-sm font-light text-ink-soft transition-colors hover:text-ink"
                  >
                    Facebook
                  </a>
                </li>
              )}
            </ul>
          ) : (
            // Placeholders — preencher os links em /data/company.ts
            <p className="font-sans text-sm font-light text-ink-faint">
              Instagram · Facebook
            </p>
          )}
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-[12px] text-ink-faint">
          © {year} {company.name}
        </p>
        <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-ink-faint">
          Damos cor, proteção e vida a cada superfície
        </p>
      </div>
    </footer>
  );
}
