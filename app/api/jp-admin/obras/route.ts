import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import {
  getAllProjects,
  addProjectToStore,
  makeUniqueSlug,
} from "@/lib/projects-store";
import { slugify } from "@/lib/utils";
import type { Project } from "@/data/projects";

export async function GET() {
  if (!isAuthenticated())
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  return NextResponse.json(getAllProjects());
}

export async function POST(req: NextRequest) {
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

    // O URL é automático: gerado a partir do título e garantido único.
    const base = slugify(data.title);
    if (!base) {
      return NextResponse.json(
        { error: "O título não gera um URL válido. Use letras ou números." },
        { status: 400 },
      );
    }
    const slug = makeUniqueSlug(base);

    addProjectToStore({ ...data, slug });
    return NextResponse.json({ ok: true, slug }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
}
