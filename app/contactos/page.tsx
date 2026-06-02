import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { company, telHref, mailHref } from "@/data/company";

export const metadata: Metadata = {
  title: "Contactar Júlio Pintor | Pedir Orçamento",
  description:
    "Peça orçamento para pintura interior, exterior, fachadas, telhados, impermeabilização ou revestimentos em Arcos de Valdevez e Viana do Castelo.",
};

export default function ContactosPage() {
  return (
    <section className="shell pt-36 pb-28 sm:pt-44">
      <div className="grid gap-16 lg:grid-cols-12">
        {/* Coluna de contexto */}
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Contactos"
            title="Tem uma superfície para renovar?"
            intro="Envie algumas informações sobre o trabalho e receba uma resposta ajustada ao seu projeto."
          />

          <div className="mt-12 space-y-8">
            <div>
              <p className="eyebrow mb-2">Onde estamos</p>
              <p className="font-sans text-base font-light text-ink">
                {company.location}
              </p>
            </div>

            <div>
              <p className="eyebrow mb-3">Contactos diretos</p>
              <ul className="space-y-2.5 font-sans text-base font-light text-ink">
                <li>
                  <a href={mailHref} className="paint-underline pb-0.5">
                    {company.email}
                  </a>
                </li>
                <li className="flex flex-wrap items-baseline gap-x-2">
                  <a href={telHref} className="paint-underline pb-0.5">
                    {company.phoneDisplay}
                  </a>
                  <span className="text-[11px] font-light text-ink-faint">
                    ({company.phoneNote})
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-line p-8">
              <p
                className="font-brand font-light uppercase tracking-wide2 text-ink"
                style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", lineHeight: 1.2 }}
              >
                Mostre-nos o espaço.
                <br />
                <span className="text-paint">
                  Nós mostramos o que pode mudar.
                </span>
              </p>
              <p className="mt-4 font-sans text-sm font-light text-ink-soft">
                Peça uma avaliação para o seu projeto.
              </p>
            </div>
          </div>
        </div>

        {/* Coluna do formulário */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
