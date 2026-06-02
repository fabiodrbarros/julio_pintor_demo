import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import ScrollPaintReveal from "@/components/ScrollPaintReveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import CTASection from "@/components/CTASection";
import Placeholder from "@/components/Placeholder";
import ShareButtons from "@/components/ShareButtons";
import { getProjectFromStore } from "@/lib/projects-store";
import { categoryVariant } from "@/data/projects";

export const dynamic = "force-dynamic";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProjectFromStore(params.slug);
  if (!project) return { title: "Obra não encontrada" };
  return {
    title: project.title,
    description: `${project.description} — ${project.service}, ${project.location}.`,
    alternates: { canonical: `/obras/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      url: `/obras/${project.slug}`,
      // Usa a imagem da obra; se não houver, recorre ao logótipo (nunca fica vazio).
      images: [project.image || "/logo/logo.png"],
    },
  };
}

export default function ObraDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectFromStore(params.slug);
  if (!project) notFound();

  const variant = categoryVariant(project.category);

  return (
    <>
      <article className="shell pt-32 sm:pt-40">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/obras"
            className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-wide2 text-ink-faint transition-colors hover:text-ink"
          >
            <span aria-hidden>←</span>
            <span className="paint-underline pb-0.5">Voltar às obras</span>
          </Link>
          <ShareButtons />
        </div>

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-4">
          <p className="eyebrow">
            {project.category} · {project.location}
          </p>
          <p className="font-sans text-[12px] uppercase tracking-wide2 text-ink-faint">
            {project.service}
          </p>
        </div>

        <h1
          className="mt-4 max-w-3xl font-brand font-light uppercase tracking-wide2 text-ink"
          style={{ fontSize: "clamp(1.9rem, 5vw, 3.4rem)", lineHeight: 1.08 }}
        >
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl font-sans text-base font-light leading-relaxed text-ink-soft">
          {project.description}
        </p>

        {/* Media principal + galeria */}
        <div className="mt-14">
          <ScrollPaintReveal mode="wipe">
            {project.image ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <Placeholder
                variant={variant}
                accent={project.accent}
                className="aspect-[16/9]"
                label="Imagem da obra"
              />
            )}
          </ScrollPaintReveal>

          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {(project.images.length > 0 ? project.images.slice(0, 3) : [0, 1, 2]).map(
              (img, i) =>
                project.images.length > 0 ? (
                  <div
                    key={i}
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={img as string}
                      alt={`${project.title} — ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <Placeholder
                    key={i}
                    variant={variant}
                    accent={project.accent}
                    label={`Detalhe ${i + 1}`}
                  />
                ),
            )}
          </div>
        </div>

        {/* Antes / Depois */}
        <section className="mt-20">
          <SectionHeading eyebrow="Antes / Depois" title="A transformação." />
          <div className="mt-10 max-w-3xl">
            <BeforeAfterSlider
              className="aspect-[16/10]"
              before={
                project.before ? (
                  <div className="relative h-full w-full">
                    <Image src={project.before} alt="Antes" fill className="object-cover" />
                  </div>
                ) : (
                  <Placeholder
                    variant={variant}
                    accent={project.accent}
                    className="grayscale aspect-[16/10]"
                  />
                )
              }
              after={
                project.after ? (
                  <div className="relative h-full w-full">
                    <Image src={project.after} alt="Depois" fill className="object-cover" />
                  </div>
                ) : (
                  <Placeholder
                    variant={variant}
                    accent={project.accent}
                    className="aspect-[16/10]"
                  />
                )
              }
            />
          </div>
        </section>

        {/* Desafio · Solução · Resultado */}
        <section className="mt-20 grid gap-10 border-t border-line pt-14 md:grid-cols-3">
          {[
            { tag: "Desafio", text: project.challenge },
            { tag: "Solução", text: project.solution },
            { tag: "Resultado", text: project.result },
          ].map((block) => (
            <div key={block.tag}>
              <p className="eyebrow mb-4">{block.tag}</p>
              <p className="font-sans text-sm font-light leading-relaxed text-ink-soft">
                {block.text}
              </p>
            </div>
          ))}
        </section>

      </article>

      <CTASection
        title="Quer um resultado semelhante?"
        subtitle="Mostre-nos o seu espaço e preparamos uma proposta ajustada ao seu projeto."
        ctaLabel="Pedir orçamento semelhante"
      />
    </>
  );
}
