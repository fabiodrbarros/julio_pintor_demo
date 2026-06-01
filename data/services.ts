/**
 * Serviços da Júlio Pintor.
 * `animation` identifica a microanimação própria de cada serviço
 * (ver components/AnimatedServiceIcon.tsx).
 */

export type ServiceAnimation =
  | "roller" // rolo passa e revela cor
  | "facade" // fachada ganha cor em camadas
  | "roofWash" // água escorre e surge camada protetora
  | "waterproof" // gota desliza sem entrar
  | "coating" // textura aparece progressivamente
  | "finish" // linha imperfeita torna-se perfeita
  | "remodel" // divisão muda (antes/depois)
  | "newBuild" // linhas arquitetónicas ganham acabamento
  | "maintenance"; // recuperação / retoque

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  animation: ServiceAnimation;
  /** Acento de tinta dominante para este serviço. */
  accent: "pink" | "orange" | "amber" | "purple" | "blue";
}

export const services: Service[] = [
  {
    slug: "pintura-interior",
    title: "Pintura interior",
    short: "Interiores mais vivos, com acabamento limpo e uniforme.",
    description:
      "Preparação de superfícies, correção de imperfeições e aplicação de tinta com acabamento regular. Cor que valoriza cada divisão e dura no tempo.",
    animation: "roller",
    accent: "pink",
  },
  {
    slug: "pintura-exterior",
    title: "Pintura exterior",
    short: "Exteriores protegidos contra o desgaste e o clima.",
    description:
      "Pintura de paredes exteriores com produtos resistentes à humidade e aos raios solares. Proteção e presença para a fachada da sua casa.",
    animation: "facade",
    accent: "orange",
  },
  {
    slug: "pintura-de-fachadas",
    title: "Pintura de fachadas",
    short: "A primeira impressão de um edifício, tratada ao detalhe.",
    description:
      "Recuperação e pintura de fachadas, com preparação rigorosa e acabamento uniforme. Valorizamos o edifício e protegemos a estrutura.",
    animation: "facade",
    accent: "amber",
  },
  {
    slug: "lavagem-de-telhados",
    title: "Lavagem de telhados",
    short: "Telhados limpos de musgo, sujidade e infiltrações.",
    description:
      "Remoção de musgos, líquenes e sujidade acumulada que retêm humidade e deterioram o telhado. Um passo essencial antes de qualquer tratamento.",
    animation: "roofWash",
    accent: "blue",
  },
  {
    slug: "impermeabilizacao-de-telhados",
    title: "Impermeabilização de telhados",
    short: "Camada protetora que mantém a água do lado de fora.",
    description:
      "Aplicação de soluções impermeabilizantes que selam o telhado contra infiltrações, prolongam a sua vida útil e protegem o interior.",
    animation: "waterproof",
    accent: "blue",
  },
  {
    slug: "revestimentos",
    title: "Revestimentos",
    short: "Texturas e revestimentos que dão carácter às superfícies.",
    description:
      "Aplicação de revestimentos decorativos e de proteção, com textura e durabilidade. Superfícies com presença, dentro e fora.",
    animation: "coating",
    accent: "purple",
  },
  {
    slug: "acabamentos",
    title: "Acabamentos",
    short: "Os detalhes que separam um trabalho bom de um trabalho perfeito.",
    description:
      "Remates, linhas e transições tratadas com rigor. O acabamento é onde a qualidade de um trabalho se nota — e onde fazemos a diferença.",
    animation: "finish",
    accent: "pink",
  },
  {
    slug: "remodelacoes",
    title: "Remodelações",
    short: "Espaços que mudam de função, de luz e de vida.",
    description:
      "Intervenções de remodelação que transformam divisões cansadas em espaços renovados, com preparação e acabamento cuidados.",
    animation: "remodel",
    accent: "purple",
  },
  {
    slug: "obras-novas",
    title: "Obras novas",
    short: "Do reboco ao acabamento final de uma construção nova.",
    description:
      "Pintura e acabamentos em construção nova, com planeamento e execução limpa. Damos o toque final a quem está a começar do zero.",
    animation: "newBuild",
    accent: "orange",
  },
  {
    slug: "manutencao-e-recuperacao",
    title: "Manutenção e recuperação",
    short: "Recuperar o que o tempo desgastou, sem refazer tudo.",
    description:
      "Retoques, reparações e manutenção periódica que mantêm o espaço protegido e com bom aspeto, evitando intervenções maiores no futuro.",
    animation: "maintenance",
    accent: "amber",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
