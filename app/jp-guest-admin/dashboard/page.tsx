import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import {
  getAllProjects,
  readRuntimeProjects,
  isStaticProject,
} from "@/lib/projects-store";
import LogoutButton from "./LogoutButton";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  if (!isAuthenticated()) redirect("/jp-guest-admin");

  const all = getAllProjects();
  const runtimeSlugs = new Set(readRuntimeProjects().map((p) => p.slug));

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="font-brand text-xl font-light uppercase tracking-[0.2em] text-stone-800">
              JÚLIO PINTOR
            </p>
            <p className="mt-0.5 text-xs uppercase tracking-widest text-stone-400">
              Gestão de obras
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/obras"
              target="_blank"
              className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-xs uppercase tracking-widest text-stone-500 transition hover:border-stone-400"
            >
              Ver site →
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Stat + Add button */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-stone-400">
            <span className="font-medium text-stone-700">{all.length}</span> obras no total
            {" · "}
            <span className="font-medium text-stone-700">{runtimeSlugs.size}</span> geridas aqui
          </p>
          <Link
            href="/jp-guest-admin/adicionar"
            className="rounded-lg bg-stone-800 px-5 py-2.5 text-xs uppercase tracking-widest text-white transition hover:bg-stone-700"
          >
            + Adicionar obra
          </Link>
        </div>

        {/* Lista */}
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-xs uppercase tracking-widest text-stone-400">
                <th className="px-6 py-4 text-left">Título</th>
                <th className="px-6 py-4 text-left">Categoria</th>
                <th className="px-6 py-4 text-left">Localização</th>
                <th className="px-6 py-4 text-left">Origem</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {all.map((p) => {
                const isRuntime = runtimeSlugs.has(p.slug);
                const isStatic = isStaticProject(p.slug);
                const origin = !isStatic ? "Admin" : isRuntime ? "Editada" : "Estática";
                const originCls = !isStatic
                  ? "bg-green-50 text-green-700"
                  : isRuntime
                    ? "bg-amber-50 text-amber-700"
                    : "bg-stone-100 text-stone-400";
                return (
                  <tr
                    key={p.slug}
                    className="border-b border-stone-50 last:border-0 hover:bg-stone-50"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/obras/${p.slug}`}
                        target="_blank"
                        className="font-medium text-stone-800 underline-offset-2 hover:underline"
                      >
                        {p.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-stone-500">{p.category}</td>
                    <td className="px-6 py-4 text-stone-500">{p.location}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs ${originCls}`}>
                        {origin}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/jp-guest-admin/editar/${p.slug}`}
                          className="text-xs uppercase tracking-widest text-stone-400 transition hover:text-stone-700"
                        >
                          Editar
                        </Link>
                        <DeleteButton slug={p.slug} title={p.title} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
