import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ScrollPaintReveal from "@/components/ScrollPaintReveal";
import PaintReveal from "@/components/PaintReveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import CTASection from "@/components/CTASection";
import Placeholder from "@/components/Placeholder";
import type { PaintAccent } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Transformações de Espaços",
  description:
    "Antes e depois de espaços renovados através de pintura, acabamentos e soluções profissionais. Do desgaste ao destaque.",
};

const steps = [
  {
    tag: "Antes",
    title: "Superfície cansada",
    text: "Manchas, humidade, cor desvanecida. Um espaço que perdeu presença com o tempo.",
    variant: "interior" as const,
    neutral: true,
  },
  {
    tag: "Durante",
    title: "Preparação e aplicação",
    text: "Limpeza, reparação de imperfeições e aplicação cuidada, camada a camada.",
    variant: "coating" as const,
    neutral: false,
  },
  {
    tag: "Depois",
    title: "Acabamento renovado",
    text: "Limpo, protegido e duradouro. A superfície volta a ter presença.",
    variant: "facade" as const,
    neutral: false,
  },
];

const transformacoes: {
  title: string;
  text: string;
  variant: "interior" | "facade" | "roof" | "coating";
  accent: PaintAccent;
}[] = [
  { title: "Interior renovado", text: "Paredes uniformes, mais luz, mais vida.", variant: "interior", accent: "pink" },
  { title: "Fachada recuperada", text: "Cor e proteção devolvidas ao exterior.", variant: "facade", accent: "orange" },
  { title: "Telhado protegido", text: "Limpo de musgo e selado contra a água.", variant: "roof", accent: "blue" },
  { title: "Acabamento de obra nova", text: "Remates perfeitos do primeiro ao último detalhe.", variant: "interior", accent: "amber" },
  { title: "Revestimento aplicado", text: "Textura e carácter, com durabilidade.", variant: "coating", accent: "purple" },
];

export default function TransformacoesPage() {
  return (
    <>
      <section className="shell pt-36 pb-16 sm:pt-44">
        <SectionHeading
          eyebrow="Transformações"
          title="Do desgaste ao destaque."
          intro="Mais do que pintar, protegemos e valorizamos. Faça scroll e veja cada superfície voltar a ter presença."
        />
      </section>

      {/* Processo: Antes · Durante · Depois */}
      <section className="shell pb-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step, i) => (
            <ScrollPaintReveal key={step.tag} mode="wipe" delay={i * 0.12}>
              <div>
                <Placeholder
                  variant={step.variant}
                  accent="purple"
                  className={step.neutral ? "grayscale" : ""}
                />
                <p className="eyebrow mt-6">{step.tag}</p>
                <h3 className="mt-2 font-brand text-xl font-light uppercase tracking-wide2 text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 font-sans text-sm font-light leading-relaxed text-ink-soft">
                  {step.text}
                </p>
              </div>
            </ScrollPaintReveal>
          ))}
        </div>
      </section>

      {/* Revelação grande por pincelada */}
      <section className="shell py-24">
        <SectionHeading
          eyebrow="Antes / Depois"
          title="Cada superfície pode voltar a ter presença."
          align="center"
        />
        <div className="mx-auto mt-14 max-w-4xl">
          <PaintReveal
            className="rounded-2xl"
            before={
              <Placeholder
                variant="facade"
                accent="orange"
                className="grayscale"
                label="Antes"
              />
            }
            after={
              <Placeholder variant="facade" accent="orange" label="Depois" />
            }
          />
          <p className="mt-4 text-center font-sans text-[12px] uppercase tracking-wide2 text-ink-faint">
            A camada de cor revela-se à medida que avança no ecrã
          </p>
        </div>
      </section>

      {/* Comparador interativo */}
      <section className="shell pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Interativo"
              title="Arraste e compare."
              intro="Quando houver fotografias reais, este comparador mostra o antes e o depois lado a lado. Arraste o cursor para experimentar."
            />
          </div>
          <BeforeAfterSlider
            className="aspect-[4/3]"
            before={
              <Placeholder variant="interior" accent="pink" className="grayscale" />
            }
            after={<Placeholder variant="interior" accent="pink" />}
          />
        </div>
      </section>

      {/* Galeria de transformações */}
      <section className="shell pb-12">
        <SectionHeading eyebrow="Exemplos" title="Transformações que falam por si." />
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {transformacoes.map((item) => (
            <div key={item.title}>
              {/* 🔁 Substituir os placeholders por fotografias reais (antes/depois). */}
              <PaintReveal
                className="rounded-2xl"
                before={
                  <Placeholder
                    variant={item.variant}
                    accent={item.accent}
                    className="grayscale"
                  />
                }
                after={<Placeholder variant={item.variant} accent={item.accent} />}
              />
              <h3 className="mt-5 font-brand text-lg font-light uppercase tracking-wide2 text-ink">
                {item.title}
              </h3>
              <p className="mt-2 font-sans text-sm font-light text-ink-soft">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Tem um espaço para transformar?"
        subtitle="Mostre-nos o espaço. Nós mostramos o que pode mudar."
        secondaryLabel="Ver serviços"
        secondaryHref="/servicos"
      />
    </>
  );
}
