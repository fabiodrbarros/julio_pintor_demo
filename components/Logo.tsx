import Link from "next/link";
import PaintRing from "./PaintRing";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * Logótipo Júlio Pintor: pincelada circular + wordmark fino e espaçado.
 *
 * NOTA: esta é uma recriação vetorial fiel ao logótipo (mesmas cores,
 * mesmo anel aberto, tipografia fina em maiúsculas e espaçada).
 * Para usar o ficheiro oficial em PNG/SVG, coloca-o em
 *   /public/logo/logo.png
 * e substitui o <PaintRing/> + wordmark por:
 *   <Image src="/logo/logo.png" alt="Júlio Pintor" width={...} height={...} priority />
 */
export default function Logo({
  variant = "full",
  ringSize = 34,
  className = "",
  href = "/",
  textClassName = "",
  onClick,
}: {
  variant?: "full" | "mark";
  ringSize?: number;
  className?: string;
  href?: string | null;
  textClassName?: string;
  onClick?: () => void;
}) {
  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <PaintRing size={ringSize} strokeWidth={26} className="shrink-0" />
      {variant === "full" && (
        <span
          className={cn(
            "wordmark text-ink leading-none",
            "text-sm sm:text-base",
            textClassName,
          )}
        >
          {company.brandName}
        </span>
      )}
    </span>
  );

  if (href === null) return content;

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={`${company.brandName} — início`}
    >
      {content}
    </Link>
  );
}
