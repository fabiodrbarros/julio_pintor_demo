import Link from "next/link";
import PaintStrokeHero from "@/components/PaintStrokeHero";
import SectionHeading from "@/components/SectionHeading";
import ServicesCarousel from "@/components/ServicesCarousel";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <PaintStrokeHero />

      {/* Todos os serviços — carrossel */}
      <section className="shell py-12 sm:py-16">
        <SectionHeading
          eyebrow="O que fazemos"
          title="Tudo o que tratamos."
        />
        <ServicesCarousel />
        <div className="mt-10">
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-wide2 text-ink-faint transition-colors hover:text-ink"
          >
            <span className="paint-underline pb-0.5">Ver todos os serviços</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <CTASection
        title="A cor certa muda tudo."
        subtitle="Damos cor, proteção e vida a cada superfície. Comece por nos contar sobre o seu espaço."
        secondaryLabel="Ver obras"
        secondaryHref="/obras"
      />
    </>
  );
}
