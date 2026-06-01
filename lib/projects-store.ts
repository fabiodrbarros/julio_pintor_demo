/**
 * Store de obras em runtime — lê/escreve data/projects-runtime.json.
 * As obras adicionadas pelo admin são guardadas aqui e fundidas com as estáticas.
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { projects as staticProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

const STORE_PATH = path.join(process.cwd(), "data", "projects-runtime.json");

export function readRuntimeProjects(): Project[] {
  if (!existsSync(STORE_PATH)) return [];
  try {
    return JSON.parse(readFileSync(STORE_PATH, "utf-8")) as Project[];
  } catch {
    return [];
  }
}

function writeRuntimeProjects(list: Project[]): void {
  writeFileSync(STORE_PATH, JSON.stringify(list, null, 2), "utf-8");
}

/** Todas as obras: estáticas + adicionadas pelo admin. */
export function getAllProjects(): Project[] {
  const runtime = readRuntimeProjects();
  const staticSlugs = new Set(staticProjects.map((p) => p.slug));
  const extra = runtime.filter((p) => !staticSlugs.has(p.slug));
  return [...staticProjects, ...extra];
}

export function getProjectFromStore(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function addProjectToStore(project: Project): void {
  const runtime = readRuntimeProjects();
  const filtered = runtime.filter((p) => p.slug !== project.slug);
  writeRuntimeProjects([...filtered, project]);
}

export function deleteProjectFromStore(slug: string): boolean {
  const runtime = readRuntimeProjects();
  const filtered = runtime.filter((p) => p.slug !== slug);
  if (filtered.length === runtime.length) return false;
  writeRuntimeProjects(filtered);
  return true;
}
