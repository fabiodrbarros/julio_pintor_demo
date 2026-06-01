"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/jp-admin/logout", { method: "POST" });
    router.push("/jp-guest-admin");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-xs uppercase tracking-widest text-stone-500 transition hover:border-red-300 hover:text-red-500"
    >
      Sair
    </button>
  );
}
