import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getAllProjects, addProjectToStore } from "@/lib/projects-store";
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

    if (!data.slug || !data.title || !data.category) {
      return NextResponse.json(
        { error: "Campos obrigatórios em falta (title, slug, category)" },
        { status: 400 },
      );
    }

    addProjectToStore(data);
    return NextResponse.json({ ok: true, slug: data.slug }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
}
