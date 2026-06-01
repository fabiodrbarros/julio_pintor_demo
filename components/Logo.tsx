import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

export default function Logo({
  className = "",
  href = "/",
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
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/logo/logo.png"
        alt={company.brandName}
        width={160}
        height={54}
        priority
        className="h-auto w-auto max-h-[54px]"
      />
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
