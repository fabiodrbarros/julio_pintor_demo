import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import ScrollPaintReveal from "@/components/ScrollPaintReveal";
import CTASection from "@/components/CTASection";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Sobre a Júlio Pintor, Unipessoal, Lda",
  description:
    "Conheça a Júlio Pintor, empresa dedicada à pintura, acabamentos e valorização de espaços em Arcos de Valdevez e Viana do Castelo.",
};

const valores = [
  {
    title: "Preparação cuidada",
    text: "Antes da cor, o essencial: limpar, reparar e preparar cada superfície para um acabamento que dura.",
  },
  {
    title: "Acabamento profissional",
    text: "Linhas limpas, remates rigorosos e uma aplicação uniforme. O detalhe é onde a qualidade se nota.",
  },
  {
    title: "Interiores e exteriores",
    text: "Soluções para dentro e fora — da divisão mais íntima à fachada exposta ao clima.",
  },
  {
    title: "Trabalho limpo e organizado",
    text: "Proteção do espaço, método e respeito pelo que é seu, do primeiro dia ao último retoque.",
  },
  {
    title: "Confiança de ponta a ponta",
    text: "Do primeiro contacto ao resultado final, comunicação clara e compromisso com o combinado.",
  },
];

const areas = [
  "Projetos residenciais",
  "Pintura interior e exterior",
  "Soluções para telhados",
  "Clientes particulares e empresas",
];

export default function SobrePage() {
  return (
    <>
      <section className="shell pt-36 pb-12 sm:pt-44">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Sobre"
              title={
                <>
                  Rigor de obra.
                  <br />
                  Olho de detalhe.
                  <br />
                  <span className="text-paint">Acabamento de artista.</span>
                </>
              }
            />
          </div>
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <Image
              src="/logo/logo.png"
              alt={company.brandName}
              width={2172}
              height={724}
              priority
              className="h-auto w-[clamp(240px,42vw,440px)]"
            />
          </div>
        </div>
      </section>

      {/* Texto base */}
      <section className="shell pb-20">
        <ScrollPaintReveal>
          <p className="max-w-3xl font-sans text-lg font-light leading-relaxed text-ink-soft sm:text-xl">
            A <span className="text-ink">{company.name}</span> dedica-se a
            trabalhos de pintura, acabamentos e valorização de espaços. Cada
            projeto é tratado com atenção ao detalhe, preparação cuidada das
            superfícies e foco num resultado limpo, duradouro e profissional.
          </p>
        </ScrollPaintReveal>
      </section>

      {/* Valores */}
      <section className="shell pb-12">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {valores.map((v, i) => (
            <div
              key={v.title}
              className="group relative bg-paper p-8 transition-colors sm:p-10"
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-[3px] w-0 bg-paint-sweep transition-all duration-700 ease-paint group-hover:w-full"
              />
              <span className="font-sans text-[12px] tabular-nums text-ink-faint">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-brand text-xl font-light uppercase tracking-wide2 text-ink">
                {v.title}
              </h3>
              <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink-soft">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Áreas (sem números inventados) */}
      <section className="shell py-20">
        <SectionHeading
          eyebrow="Áreas de trabalho"
          title="Onde fazemos a diferença."
          intro="Em vez de números, deixamos o trabalho falar. Estas são as frentes onde atuamos."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <div
              key={area}
              className="rounded-2xl border border-line p-6 text-center"
            >
              <span
                aria-hidden
                className="mx-auto mb-4 block h-1 w-10 rounded-full bg-paint-sweep"
              />
              <p className="font-sans text-sm font-light uppercase tracking-wide2 text-ink">
                {area}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Vamos dar presença ao seu espaço?"
        subtitle="Conte-nos o que tem em mãos. O resto, tratamos nós."
        secondaryLabel="Ver obras"
        secondaryHref="/obras"
      />
    </>
  );
}
