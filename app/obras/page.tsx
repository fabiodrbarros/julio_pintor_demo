import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import PortfolioGrid from "@/components/PortfolioGrid";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Obras e Trabalhos Realizados",
  description:
    "Galeria de trabalhos de pintura, fachadas, telhados, revestimentos e acabamentos em Arcos de Valdevez e Viana do Castelo.",
};

export default function ObrasPage() {
  return (
    <>
      <section className="shell pt-36 pb-12 sm:pt-44">
        <SectionHeading
          eyebrow="Obras"
          title="Trabalhos que falam por si."
          intro="Uma seleção de intervenções em interiores, exteriores, fachadas e telhados. Filtre por categoria para explorar."
        />
      </section>

      <section className="shell pb-12">
        {/* 🔁 Estrutura pronta para fotografias reais — ver /data/projects.ts */}
        <PortfolioGrid />
      </section>

      <CTASection
        title="Quer um resultado assim no seu espaço?"
        subtitle="Peça uma avaliação para o seu projeto. Respondemos com uma proposta ajustada."
      />
    </>
  );
}
