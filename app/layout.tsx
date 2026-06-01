import type { Metadata } from "next";
import { Josefin_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import PaintDefs from "@/components/PaintDefs";
import SiteChrome from "@/components/SiteChrome";
import FooterMinimal from "@/components/FooterMinimal";
import { company } from "@/data/company";

/**
 * Tipografia próxima do logótipo:
 *  - Josefin Sans (geométrica, fina, espaçada) para wordmark e títulos
 *  - Montserrat (geométrica humanista, leve) para o corpo de texto
 */
const brand = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-brand",
  display: "swap",
});

const body = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  // TODO: atualizar para o domínio real quando existir.
  metadataBase: new URL("https://www.juliopintor.pt"),
  title: {
    default:
      "Júlio Pintor | Pintura, Acabamentos e Transformação de Espaços",
    template: "%s | Júlio Pintor",
  },
  description:
    "Serviços profissionais de pintura, acabamentos, fachadas, telhados, revestimentos e renovação de espaços em Arcos de Valdevez e Viana do Castelo.",
  keywords: [
    "pintor em Arcos de Valdevez",
    "pintura interior",
    "pintura exterior",
    "pintura de fachadas",
    "impermeabilização de telhados",
    "lavagem de telhados",
    "acabamentos",
    "revestimentos",
    "remodelações",
    "pintura profissional",
    "pintura em Viana do Castelo",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: company.name,
    title: "Júlio Pintor | Pintura, Acabamentos e Transformação de Espaços",
    description:
      "Damos cor, proteção e vida a cada superfície. Pintura interior e exterior, fachadas, telhados, revestimentos e acabamentos.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" className={`${brand.variable} ${body.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        <PaintDefs />
        {/* salta para o conteúdo (acessibilidade) */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Saltar para o conteúdo
        </a>

        <SiteChrome />

        <main id="conteudo">{children}</main>

        <FooterMinimal />
      </body>
    </html>
  );
}
