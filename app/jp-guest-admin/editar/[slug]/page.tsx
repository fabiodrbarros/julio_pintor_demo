import { redirect, notFound } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import { getProjectFromStore } from "@/lib/projects-store";
import ObraForm from "../../ObraForm";

export const dynamic = "force-dynamic";

export default function EditarObraPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!isAuthenticated()) redirect("/jp-guest-admin");

  const obra = getProjectFromStore(params.slug);
  if (!obra) notFound();

  return <ObraForm mode="edit" initial={obra} />;
}
