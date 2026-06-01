"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ slug, title }: { slug: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Apagar "${title}"?`)) return;
    setLoading(true);
    await fetch(`/api/jp-admin/obras/${slug}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs uppercase tracking-widest text-stone-300 transition hover:text-red-500 disabled:opacity-40"
    >
      {loading ? "…" : "Apagar"}
    </button>
  );
}
