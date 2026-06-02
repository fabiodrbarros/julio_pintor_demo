"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { projectCategories } from "@/data/projects";
import type { Project } from "@/data/projects";

const ACCENTS = ["pink", "orange", "amber", "purple", "blue"] as const;
const ACCENT_LABELS: Record<string, string> = {
  pink: "Rosa", orange: "Laranja", amber: "Amarelo", purple: "Roxo", blue: "Azul",
};
const ACCENT_COLORS: Record<string, string> = {
  pink: "#FF2E93", orange: "#FF6A2B", amber: "#FFB627", purple: "#8B3DD6", blue: "#4F6BF0",
};

async function uploadFiles(slug: string, files: FileList | null): Promise<string[]> {
  if (!files || files.length === 0) return [];
  const form = new FormData();
  form.append("slug", slug);
  Array.from(files).forEach((f) => form.append("files", f));
  const res = await fetch("/api/jp-admin/upload", { method: "POST", body: form });
  const data = await res.json();
  return data.paths ?? [];
}

/**
 * Formulário de obra reutilizável.
 *  - mode="create": URL gerado automaticamente do título
 *  - mode="edit": pré-preenchido; o URL/slug mantém-se; imagens só mudam se enviares novas
 */
export default function ObraForm({
  mode,
  initial,
}: {
  mode: "create" | "edit";
  initial?: Project;
}) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState<string>(
    initial?.category ?? projectCategories[0],
  );
  const [location, setLocation] = useState(initial?.location ?? "");
  const [service, setService] = useState(initial?.service ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [challenge, setChallenge] = useState(initial?.challenge ?? "");
  const [solution, setSolution] = useState(initial?.solution ?? "");
  const [result, setResult] = useState(initial?.result ?? "");
  const [accent, setAccent] = useState<string>(initial?.accent ?? "pink");

  // imagens existentes (modo edição) — mantidas se não enviares novas
  const existingCover = initial?.image ?? "";
  const existingGallery = initial?.images ?? [];
  const existingBefore = initial?.before ?? "";
  const existingAfter = initial?.after ?? "";

  const [coverFile, setCoverFile] = useState<FileList | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);
  const [beforeFile, setBeforeFile] = useState<FileList | null>(null);
  const [afterFile, setAfterFile] = useState<FileList | null>(null);

  // Edição mantém o slug original; criação gera-o do título.
  const slug = isEdit ? initial?.slug ?? "" : slugify(title);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const finalSlug = slug || slugify(title);

      const [coverPaths, galleryPaths, beforePaths, afterPaths] = await Promise.all([
        uploadFiles(finalSlug, coverFile),
        uploadFiles(finalSlug, galleryFiles),
        uploadFiles(finalSlug, beforeFile),
        uploadFiles(finalSlug, afterFile),
      ]);

      const obra = {
        slug: finalSlug,
        title,
        category,
        location,
        service,
        description,
        challenge,
        solution,
        result,
        accent,
        image: coverPaths[0] ?? existingCover,
        images: galleryPaths.length > 0 ? galleryPaths : existingGallery,
        before: beforePaths[0] ?? existingBefore,
        after: afterPaths[0] ?? existingAfter,
      };

      const res = await fetch(
        isEdit ? `/api/jp-admin/obras/${finalSlug}` : "/api/jp-admin/obras",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obra),
        },
      );

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Erro desconhecido");
      }

      router.push("/jp-guest-admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao guardar");
      setSaving(false);
    }
  }

  const inputCls = "w-full rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-stone-400";
  const labelCls = "mb-1.5 block text-xs uppercase tracking-widest text-stone-400";

  const imageFields: {
    label: string;
    multiple: boolean;
    set: (f: FileList | null) => void;
    current: string;
  }[] = [
    { label: "Imagem de capa", multiple: false, set: setCoverFile, current: existingCover },
    {
      label: "Galeria (múltiplas)",
      multiple: true,
      set: setGalleryFiles,
      current: existingGallery.length ? `${existingGallery.length} imagem(ns)` : "",
    },
    { label: "Antes (para o slider)", multiple: false, set: setBeforeFile, current: existingBefore },
    { label: "Depois (para o slider)", multiple: false, set: setAfterFile, current: existingAfter },
  ];

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/jp-guest-admin/dashboard"
              className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-600"
            >
              ← Dashboard
            </Link>
            <h1 className="mt-2 font-brand text-xl font-light uppercase tracking-[0.2em] text-stone-800">
              {isEdit ? "Editar obra" : "Nova obra"}
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título + URL */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-stone-400">Identificação</h2>
            <div>
              <label className={labelCls}>Título *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Pintura exterior em moradia"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>
                {isEdit ? "URL da obra (fixo)" : "URL da obra (automático)"}
              </label>
              <div className="flex items-center rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-sm">
                <span className="text-stone-300">/obras/</span>
                <span className="font-medium text-stone-700">{slug || "…"}</span>
              </div>
              <p className="mt-1 text-xs text-stone-300">
                {isEdit
                  ? "O URL mantém-se ao editar (não muda, mesmo que mudes o título)."
                  : "Gerado a partir do título. Se já existir, é acrescentado um número."}
              </p>
            </div>
          </div>

          {/* Categoria + Localização + Serviço */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-stone-400">Detalhes</h2>
            <div>
              <label className={labelCls}>Categoria *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputCls}
              >
                {projectCategories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Localização *</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="Arcos de Valdevez"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Serviço realizado</label>
              <input
                type="text"
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="Pintura exterior"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Descrição</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Breve descrição da obra…"
                className={inputCls}
              />
            </div>
          </div>

          {/* Desafio · Solução · Resultado */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-stone-400">Narrativa</h2>
            {[
              { label: "Desafio", val: challenge, set: setChallenge, ph: "O que estava degradado ou em falta…" },
              { label: "Solução", val: solution, set: setSolution, ph: "Como foi tratado…" },
              { label: "Resultado", val: result, set: setResult, ph: "O que ficou melhor…" },
            ].map(({ label, val, set, ph }) => (
              <div key={label}>
                <label className={labelCls}>{label}</label>
                <textarea
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  rows={2}
                  placeholder={ph}
                  className={inputCls}
                />
              </div>
            ))}
          </div>

          {/* Acento */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-3">
            <h2 className="text-xs uppercase tracking-widest text-stone-400">Cor de acento</h2>
            <div className="flex gap-3">
              {ACCENTS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAccent(a)}
                  title={ACCENT_LABELS[a]}
                  className="h-8 w-8 rounded-full transition-transform hover:scale-110"
                  style={{
                    background: ACCENT_COLORS[a],
                    outline: accent === a ? `3px solid ${ACCENT_COLORS[a]}` : "none",
                    outlineOffset: 2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Imagens */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-stone-400">Imagens</h2>
            {imageFields.map(({ label, multiple, set, current }) => (
              <div key={label}>
                <label className={labelCls}>{label}</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple={multiple}
                  onChange={(e) => set(e.target.files)}
                  className="w-full rounded-lg border border-dashed border-stone-200 px-4 py-3 text-sm text-stone-400 file:mr-4 file:rounded-md file:border-0 file:bg-stone-100 file:px-3 file:py-1 file:text-xs file:uppercase file:tracking-widest file:text-stone-500"
                />
                {isEdit && current && (
                  <p className="mt-1 truncate text-xs text-stone-300">
                    Atual: {current} — deixar vazio para manter.
                  </p>
                )}
              </div>
            ))}
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          )}

          <div className="flex gap-3 pb-10">
            <Link
              href="/jp-guest-admin/dashboard"
              className="flex-1 rounded-lg border border-stone-200 px-4 py-3 text-center text-xs uppercase tracking-widest text-stone-400 transition hover:border-stone-300"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-stone-800 px-4 py-3 text-xs uppercase tracking-widest text-white transition hover:bg-stone-700 disabled:opacity-50"
            >
              {saving ? "A guardar…" : isEdit ? "Guardar alterações" : "Guardar obra"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
