import Link from "next/link";
import PaintRing from "@/components/PaintRing";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <PaintRing className="w-40 h-auto" />
      <p className="eyebrow mt-10">Erro 404</p>
      <h1 className="mt-4 font-brand text-3xl font-light uppercase tracking-wide2 text-ink">
        Esta superfície ainda não foi pintada.
      </h1>
      <p className="mt-4 max-w-md font-sans text-sm font-light text-ink-soft">
        A página que procura não existe ou foi movida. Voltemos ao início.
      </p>
      <Link href="/" className="btn-primary mt-10">
        <span>Voltar ao início</span>
      </Link>
    </section>
  );
}
