import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { deleteProjectFromStore } from "@/lib/projects-store";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string } },
) {
  if (!isAuthenticated())
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const deleted = deleteProjectFromStore(params.slug);
  if (!deleted)
    return NextResponse.json({ error: "Obra não encontrada ou é estática" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
