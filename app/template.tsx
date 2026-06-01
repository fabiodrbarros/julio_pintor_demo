import PageTransition from "@/components/PageTransition";

/**
 * O template remonta a cada navegação, pelo que a transição de
 * entrada (pincelada) corre sempre que se muda de página.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
