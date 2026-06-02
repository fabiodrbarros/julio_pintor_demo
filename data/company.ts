/**
 * Configuração central da empresa.
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │  PREENCHER OS CONTACTOS REAIS AQUI.                          │
 * │  Os campos abaixo estão como placeholders ("").             │
 * │  Enquanto estiverem vazios, os botões/links de contacto     │
 * │  comportam-se de forma segura (ver helpers no fim).         │
 * └─────────────────────────────────────────────────────────────┘
 */
export const company = {
  name: "Júlio Pintor, Unipessoal, Lda",
  brandName: "JÚLIO PINTOR",
  tagline: "Pintura, acabamentos e transformação de espaços.",
  shortPitch: "Damos cor, proteção e vida a cada superfície.",
  location: "Arcos de Valdevez, Viana do Castelo",

  // --- Contactos ---------------------------------------------
  // Telefone para apresentar no site (formato livre).
  phoneDisplay: "+351 963 171 265",
  // Nota legal de tarifário (telemóvel nacional).
  phoneNote: "Chamada para rede móvel nacional",
  // Telefone para o link tel: (apenas dígitos e +).
  phone: "+351963171265",
  email: "geral@juliopintor.pt",
  // Número internacional para o WhatsApp, só dígitos.
  whatsapp: "351963171265",
  whatsappMessage: "Olá! Gostaria de pedir um orçamento de pintura.",

  // --- Redes sociais (PREENCHER com URLs completos) ----------
  social: {
    instagram: "", // ex.: "https://instagram.com/juliopintor"
    facebook: "", // ex.: "https://facebook.com/juliopintor"
  },
} as const;

/* ------------------------------------------------------------------
 * Helpers para construir links de forma segura.
 * Devolvem "#" quando o contacto ainda não está preenchido,
 * evitando links partidos enquanto aguardas os dados reais.
 * ------------------------------------------------------------------ */

export const telHref = company.phone ? `tel:${company.phone}` : "#";

export const mailHref = company.email ? `mailto:${company.email}` : "#";

export const whatsappHref = company.whatsapp
  ? `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
      company.whatsappMessage,
    )}`
  : "#";

export const hasPhone = Boolean(company.phone);
export const hasEmail = Boolean(company.email);
export const hasWhatsapp = Boolean(company.whatsapp);
export const hasInstagram = Boolean(company.social.instagram);
export const hasFacebook = Boolean(company.social.facebook);
