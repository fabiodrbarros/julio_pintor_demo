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
  { label: "Transformações", href: "/transformacoes" },
  { label: "Serviços", href: "/servicos" },
  { label: "Obras", href: "/obras" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contactos", href: "/contactos" },
];
