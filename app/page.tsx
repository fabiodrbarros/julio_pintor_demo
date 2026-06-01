import Link from "next/link";
import PaintStrokeHero from "@/components/PaintStrokeHero";
import SectionHeading from "@/components/SectionHeading";
import SurfaceSelector from "@/components/SurfaceSelector";
import ServiceAnimationCard from "@/components/ServiceAnimationCard";
import ScrollPaintReveal from "@/components/ScrollPaintReveal";
import CTASection from "@/components/CTASection";
import Placeholder from "@/components/Placeholder";
import { getService } from "@/data/services";

const tresIdeias = [
  getService("pintura-interior"),
  getService("pintura-exterior"),
  getService("impermeabilizacao-de-telhados"),
].filter(Boolean);

export default function HomePage() {
  return (
    <>
      <PaintStrokeHero />

      {/* Escolhe a superfície */}
      <section className="shell py-24 sm:py-28">
        <SectionHeading
          eyebrow="Interativo"
          title={
            <>
              Escolhe a superfície.
              <br />
              Nós tratamos do resto.
            </>
          }
          intro="Cada material pede uma preparação e um acabamento diferentes. Passe o rato (ou toque) e veja cada superfície ganhar cor."
        />
        <div className="mt-14">
          <SurfaceSelector />
        </div>
      </section>

      {/* Três frentes */}
      <section className="shell py-12 sm:py-16">
        <SectionHeading
          eyebrow="O que fazemos"
          title="Três frentes, o mesmo cuidado."
          intro="Do interior ao telhado, tratamos cada espaço como um todo — com preparação rigorosa e um acabamento que dura."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tresIdeias.map((service, i) =>
            service ? (
              <ServiceAnimationCard key={service.slug} service={service} index={i} />
            ) : null,
          )}
        </div>
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

      {/* Teaser transformações */}
      <section className="shell py-24 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollPaintReveal mode="wipe">
            <Placeholder
              variant="interior"
              accent="purple"
              label="Antes · Depois"
              className="aspect-[5/4]"
            />
          </ScrollPaintReveal>
          <div>
            <SectionHeading
              eyebrow="Transformações"
              title="Do desgaste ao destaque."
              intro="Mais do que pintar, protegemos e valorizamos. Cada superfície pode voltar a ter presença — e nós mostramos-lhe como."
            />
            <div className="mt-10">
              <Link href="/transformacoes" className="btn-ghost">
                <span>Ver transformações</span>
              </Link>
            </div>
          </div>
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
