/**
 * Obras / portfólio.
 *
 * ⚠️  DADOS DE ESTRUTURA — NÃO SÃO OBRAS REAIS.
 * Servem apenas para construir a galeria e as páginas de detalhe.
 * Substituir por trabalhos reais quando houver fotografias.
 *
 * Para imagens reais:
 *   1. Colocar os ficheiros em /public/images/obras/<slug>/
 *   2. Preencher `images` e (quando aplicável) `before` / `after`
 *      com os caminhos, ex.: "/images/obras/<slug>/01.jpg"
 *   3. Manter `image` como capa da galeria.
 * Enquanto não houver imagens, os componentes mostram placeholders
 * gráficos elegantes (gradientes + linhas), nunca stock photos.
 */

export type ProjectCategory =
  | "Interiores"
  | "Exteriores"
  | "Telhados"
  | "Fachadas"
  | "Revestimentos";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  description: string;
  service: string;
  challenge: string;
  solution: string;
  result: string;
  /** Acento de tinta para o placeholder. */
  accent: "pink" | "orange" | "amber" | "purple" | "blue";
  /** Capa — caminho para imagem real, ou "" para usar placeholder. */
  image: string;
  /** Galeria — caminhos reais; vazio => placeholders. */
  images: string[];
  /** Par antes/depois (opcional) — caminhos reais. */
  before?: string;
  after?: string;
}

export const projectCategories: (ProjectCategory | "Antes/Depois")[] = [
  "Interiores",
  "Exteriores",
  "Telhados",
  "Fachadas",
  "Revestimentos",
  "Antes/Depois",
];

export const projects: Project[] = [
  {
    slug: "pintura-exterior-moradia",
    title: "Pintura exterior em moradia",
    category: "Exteriores",
    location: "Arcos de Valdevez",
    description:
      "Renovação completa da pintura exterior de uma moradia, com proteção reforçada contra a humidade.",
    service: "Pintura exterior",
    challenge:
      "Paredes exteriores com sinais de desgaste, manchas de humidade e cor desvanecida pela exposição ao clima.",
    solution:
      "Lavagem, tratamento das zonas afetadas e aplicação de tinta exterior resistente, em camadas uniformes.",
    result:
      "Fachada protegida e renovada, com cor uniforme e maior resistência à humidade e aos raios solares.",
    accent: "orange",
    image: "",
    images: [],
    before: "",
    after: "",
  },
  {
    slug: "renovacao-de-interiores",
    title: "Renovação de interiores",
    category: "Interiores",
    location: "Viana do Castelo",
    description:
      "Pintura interior de uma habitação, com preparação cuidada de paredes e tetos.",
    service: "Pintura interior",
    challenge:
      "Paredes interiores com fissuras finas, marcas e tom envelhecido que tiravam luz ao espaço.",
    solution:
      "Reparação de imperfeições, lixagem e aplicação de tinta com acabamento regular e cor clara.",
    result:
      "Interiores mais luminosos e uniformes, com um acabamento limpo que valoriza cada divisão.",
    accent: "pink",
    image: "",
    images: [],
    before: "",
    after: "",
  },
  {
    slug: "lavagem-impermeabilizacao-telhado",
    title: "Lavagem e impermeabilização de telhado",
    category: "Telhados",
    location: "Arcos de Valdevez",
    description:
      "Remoção de musgo e aplicação de camada impermeabilizante para travar infiltrações.",
    service: "Lavagem e impermeabilização de telhados",
    challenge:
      "Telhado com musgo acumulado e sinais de infiltração que ameaçavam o interior da habitação.",
    solution:
      "Lavagem completa, remoção de musgos e líquenes, e aplicação de solução impermeabilizante protetora.",
    result:
      "Telhado limpo, selado contra a água e com vida útil prolongada, protegendo o interior.",
    accent: "blue",
    image: "",
    images: [],
    before: "",
    after: "",
  },
  {
    slug: "acabamentos-obra-nova",
    title: "Acabamentos em obra nova",
    category: "Interiores",
    location: "Ponte da Barca",
    description:
      "Pintura e acabamentos finais de uma construção nova, do reboco ao detalhe.",
    service: "Obras novas",
    challenge:
      "Construção nova a precisar de pintura integral e de remates rigorosos em portas, rodapés e tetos.",
    solution:
      "Planeamento por fases, primário, pintura e acabamentos com atenção a cada linha e transição.",
    result:
      "Espaço entregue pronto a habitar, com acabamentos limpos e uniformes do primeiro ao último detalhe.",
    accent: "amber",
    image: "",
    images: [],
    before: "",
    after: "",
  },
  {
    slug: "revestimento-pintura-fachada",
    title: "Revestimento e pintura de fachada",
    category: "Fachadas",
    location: "Arcos de Valdevez",
    description:
      "Aplicação de revestimento texturado e pintura de fachada para proteção e carácter.",
    service: "Revestimentos · Pintura de fachadas",
    challenge:
      "Fachada sem proteção adequada e com aspeto envelhecido, exposta à chuva e ao vento.",
    solution:
      "Preparação da superfície, aplicação de revestimento texturado e pintura final resistente.",
    result:
      "Fachada com textura, carácter e uma camada de proteção que prolonga a sua durabilidade.",
    accent: "purple",
    image: "",
    images: [],
    before: "",
    after: "",
  },
  {
    slug: "pintura-interior-comercial",
    title: "Pintura de espaço comercial",
    category: "Interiores",
    location: "Viana do Castelo",
    description:
      "Pintura interior de um espaço comercial, com planeamento para minimizar a paragem da atividade.",
    service: "Pintura interior · Acabamentos",
    challenge:
      "Espaço comercial em funcionamento, a precisar de renovação sem interromper o negócio durante muito tempo.",
    solution:
      "Trabalho faseado e organizado, fora dos horários de maior movimento, com proteção de mobiliário.",
    result:
      "Ambiente renovado e cuidado, transmitindo uma imagem mais profissional aos clientes.",
    accent: "blue",
    image: "",
    images: [],
    before: "",
    after: "",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
