"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/jp-admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass }),
    });

    if (res.ok) {
      router.push("/jp-guest-admin/dashboard");
      router.refresh();
    } else {
      setError("Utilizador ou palavra-passe incorretos.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-brand text-2xl font-light uppercase tracking-[0.25em] text-stone-800">
            JÚLIO PINTOR
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-400">
            Área administrativa
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm"
        >
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-stone-400">
              Utilizador
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-800 outline-none transition-colors focus:border-stone-400"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-stone-400">
              Palavra-passe
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-800 outline-none transition-colors focus:border-stone-400"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-stone-800 px-4 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-stone-700 disabled:opacity-50"
          >
            {loading ? "A entrar…" : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
