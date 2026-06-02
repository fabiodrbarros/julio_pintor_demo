/** Junta classNames condicionais sem dependências externas. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Acentos de tinta -> valor hex, partilhado por componentes. */
export const paintHex = {
  pink: "#FF2E93",
  orange: "#FF6A2B",
  amber: "#FFB627",
  purple: "#8B3DD6",
  blue: "#4F6BF0",
} as const;

export type PaintAccent = keyof typeof paintHex;

/** Navegação principal — usada no menu lateral e no footer. */
export const navLinks: { label: string; href: string }[] = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Obras", href: "/obras" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contactos", href: "/contactos" },
];

/**
 * Gera um slug de URL a partir de um título (ex.: "Pintura Exterior, Moradia" →
 * "pintura-exterior-moradia"). Remove acentos/diacríticos, passa a minúsculas e
 * substitui tudo o que não seja letra/dígito por hífens.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFD") // separa letras dos acentos
    .replace(/[̀-ͯ]/g, "") // remove acentos (á→a, ç→c, ã→a, ...)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // não-alfanumérico → hífen
    .replace(/^-+|-+$/g, "") // tira hífens nas pontas
    .replace(/-{2,}/g, "-"); // colapsa hífens repetidos
}
