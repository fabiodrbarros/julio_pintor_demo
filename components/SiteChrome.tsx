"use client";

import { useState } from "react";
import FloatingMenuButton from "./FloatingMenuButton";
import SideMenu from "./SideMenu";
import FloatingCTA from "./FloatingCTA";
import CursorPaintTrail from "./CursorPaintTrail";

/**
 * Elementos globais do "chrome" do site (sem header tradicional):
 * botão flutuante à direita, menu lateral, CTA flutuante e rasto do cursor.
 */
export default function SiteChrome() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CursorPaintTrail />
      <FloatingMenuButton onOpen={() => setOpen(true)} hidden={open} />
      <SideMenu open={open} onClose={() => setOpen(false)} />
      <FloatingCTA menuOpen={open} />
    </>
  );
}
