import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ServiceAnimationCard from "@/components/ServiceAnimationCard";
import CTASection from "@/components/CTASection";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title:
    "Serviços de Pintura Interior, Exterior, Telhados e Revestimentos",
  description:
    "Pintura interior, pintura exterior, fachadas, lavagem e impermeabilização de telhados, revestimentos e acabamentos. Soluções profissionais em Arcos de Valdevez e Viana do Castelo.",
};

export default function ServicosPage() {
  return (
    <>
      <section className="shell pt-36 pb-12 sm:pt-44">
        <SectionHeading
          eyebrow="Serviços"
          title={
            <>
              Cada trabalho tem uma técnica.
              <br />
              Cada espaço tem uma solução.
            </>
          }
          intro="Interiores mais vivos. Exteriores mais protegidos. Acabamentos que se notam nos detalhes."
        />
      </section>

      <section className="shell pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <ServiceAnimationCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </section>

      <CTASection
        title="Não sabe que solução precisa?"
        subtitle="Conte-nos sobre o espaço e propomos a técnica certa para o resultado que procura."
        secondaryLabel="Ver obras"
        secondaryHref="/obras"
      />
    </>
  );
}
