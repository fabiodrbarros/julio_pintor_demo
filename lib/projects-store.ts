/**
 * Store de obras em runtime — lê/escreve data/projects-runtime.json.
 *
 * Modelo de "overlay" sobre as obras estáticas (data/projects.ts):
 *  - `projects`: obras adicionadas pelo admin OU edições/override de estáticas
 *  - `deleted`:  slugs de obras estáticas marcadas como apagadas (tombstones)
 *
 * Assim o admin pode adicionar, editar E apagar qualquer obra,
 * incluindo as de demonstração, sem alterar o código.
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { projects as staticProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

const STORE_PATH = path.join(process.cwd(), "data", "projects-runtime.json");
const staticSlugs = new Set(staticProjects.map((p) => p.slug));

interface Store {
  projects: Project[];
  deleted: string[];
}

function readStore(): Store {
  if (!existsSync(STORE_PATH)) return { projects: [], deleted: [] };
  try {
    const raw = JSON.parse(readFileSync(STORE_PATH, "utf-8"));
    // Compatibilidade com o formato antigo (apenas um array de obras).
    if (Array.isArray(raw)) return { projects: raw as Project[], deleted: [] };
    return { projects: raw.projects ?? [], deleted: raw.deleted ?? [] };
  } catch {
    return { projects: [], deleted: [] };
  }
}

function writeStore(store: Store): void {
  writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

/** Obras geridas no runtime (adicionadas ou editadas). */
export function readRuntimeProjects(): Project[] {
  return readStore().projects;
}

/** Slugs de obras (estáticas) apagadas pelo admin. */
export function readDeletedSlugs(): string[] {
  return readStore().deleted;
}

/** Todas as obras: estáticas (com overrides/remoções aplicadas) + adicionadas. */
export function getAllProjects(): Project[] {
  const { projects: runtime, deleted } = readStore();
  const overrideBySlug = new Map(runtime.map((p) => [p.slug, p]));

  // estáticas: tira as apagadas e aplica edições/override
  const fromStatic = staticProjects
    .filter((p) => !deleted.includes(p.slug))
    .map((p) => overrideBySlug.get(p.slug) ?? p);

  // obras novas (não correspondem a nenhuma estática)
  const extra = runtime.filter((p) => !staticSlugs.has(p.slug));

  return [...fromStatic, ...extra];
}

export function getProjectFromStore(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

/** True se o slug pertence às obras estáticas (demonstração). */
export function isStaticProject(slug: string): boolean {
  return staticSlugs.has(slug);
}

/** Cria/atualiza uma obra no runtime (upsert por slug). */
export function addProjectToStore(project: Project): void {
  const store = readStore();
  store.projects = store.projects.filter((p) => p.slug !== project.slug);
  store.projects.push(project);
  // se estava marcada como apagada, "ressuscita"
  store.deleted = store.deleted.filter((s) => s !== project.slug);
  writeStore(store);
}

/** Edita uma obra existente mantendo o slug/URL. Funciona p/ estáticas e runtime. */
export function updateProjectInStore(slug: string, data: Project): boolean {
  const current = getProjectFromStore(slug);
  if (!current) return false;
  addProjectToStore({ ...current, ...data, slug });
  return true;
}

/** Apaga qualquer obra: remove do runtime e/ou marca a estática como apagada. */
export function deleteProjectFromStore(slug: string): boolean {
  const exists = getAllProjects().some((p) => p.slug === slug);
  if (!exists) return false;

  const store = readStore();
  store.projects = store.projects.filter((p) => p.slug !== slug);
  if (staticSlugs.has(slug) && !store.deleted.includes(slug)) {
    store.deleted.push(slug);
  }
  writeStore(store);
  return true;
}

/**
 * Garante um slug único: se `base` já existir, acrescenta -2, -3, …
 * Evita que uma obra nova sobrescreva outra.
 */
export function makeUniqueSlug(base: string): string {
  const existing = new Set(getAllProjects().map((p) => p.slug));
  if (!existing.has(base)) return base;
  let i = 2;
  while (existing.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}
