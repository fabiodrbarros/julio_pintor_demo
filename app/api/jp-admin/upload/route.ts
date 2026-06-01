import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { isAuthenticated } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  if (!isAuthenticated())
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const form = await req.formData();
  const slug = form.get("slug") as string;
  const files = form.getAll("files") as File[];

  if (!slug || files.length === 0)
    return NextResponse.json({ error: "Falta slug ou ficheiros" }, { status: 400 });

  const dir = path.join(process.cwd(), "public", "images", "obras", slug);
  mkdirSync(dir, { recursive: true });

  const paths: string[] = [];
  for (const file of files) {
    const buf = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
    writeFileSync(path.join(dir, filename), buf);
    paths.push(`/images/obras/${slug}/${filename}`);
  }

  return NextResponse.json({ ok: true, paths });
}
