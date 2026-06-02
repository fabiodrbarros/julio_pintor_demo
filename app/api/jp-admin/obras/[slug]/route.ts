import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import {
  deleteProjectFromStore,
  updateProjectInStore,
} from "@/lib/projects-store";
import type { Project } from "@/data/projects";

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  if (!isAuthenticated())
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const data = (await req.json()) as Project;

    if (!data.title || !data.category) {
      return NextResponse.json(
        { error: "Campos obrigatórios em falta (título, categoria)" },
        { status: 400 },
      );
    }

    // O slug/URL mantém-se: usamos o da rota.
    const ok = updateProjectInStore(params.slug, { ...data, slug: params.slug });
    if (!ok)
      return NextResponse.json({ error: "Obra não encontrada" }, { status: 404 });

    return NextResponse.json({ ok: true, slug: params.slug });
  } catch {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string } },
) {
  if (!isAuthenticated())
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const deleted = deleteProjectFromStore(params.slug);
  if (!deleted)
    return NextResponse.json({ error: "Obra não encontrada" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
