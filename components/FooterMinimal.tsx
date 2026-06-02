import Link from "next/link";
import Logo from "./Logo";
import { navLinks } from "@/lib/utils";
import {
  company,
  hasInstagram,
  hasFacebook,
  hasEmail,
  hasPhone,
  mailHref,
  telHref,
} from "@/data/company";

// URL nacional do Livro de Reclamações eletrónico.
const LIVRO_RECLAMACOES_URL = "https://www.livroreclamacoes.pt/inicio";

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
        <nav className="md:col-span-3" aria-label="Rodapé">
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
        <div className="md:col-span-4">
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

          {/* Contactos */}
          {(hasEmail || hasPhone) && (
            <div className="mt-8">
              <p className="eyebrow mb-3">Contactos</p>
              <ul className="space-y-2">
                {hasEmail && (
                  <li>
                    <a
                      href={mailHref}
                      className="paint-underline pb-0.5 font-sans text-sm font-light text-ink-soft transition-colors hover:text-ink"
                    >
                      {company.email}
                    </a>
                  </li>
                )}
                {hasPhone && (
                  <li className="flex items-baseline gap-x-2 whitespace-nowrap">
                    <a
                      href={telHref}
                      className="paint-underline pb-0.5 font-sans text-sm font-light text-ink-soft transition-colors hover:text-ink"
                    >
                      {company.phoneDisplay}
                    </a>
                    <span className="text-[10px] font-light text-ink-faint">
                      ({company.phoneNote})
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="shell flex flex-col items-center gap-3 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <p className="font-sans text-[12px] text-ink-faint">
          © {year} {company.name}
        </p>
        <a
          href={LIVRO_RECLAMACOES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="paint-underline pb-0.5 font-sans text-[12px] text-ink-soft transition-colors hover:text-ink"
        >
          Livro de Reclamações
        </a>
        <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-ink-faint">
          Damos cor, proteção e vida a cada superfície
        </p>
      </div>
    </footer>
  );
}
