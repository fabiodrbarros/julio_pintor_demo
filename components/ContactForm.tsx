"use client";

import { useState, type FormEvent } from "react";
import {
  company,
  whatsappHref,
  telHref,
  mailHref,
  hasWhatsapp,
  hasPhone,
  hasEmail,
} from "@/data/company";

const tiposDeTrabalho = [
  "Pintura interior",
  "Pintura exterior",
  "Fachada",
  "Telhado",
  "Impermeabilização",
  "Revestimento",
  "Remodelação",
  "Outro",
];

const estadosDoEspaco = [
  "Precisa de pintura",
  "Precisa de reparação",
  "Tem humidade",
  "Está desgastado",
  "É obra nova",
  "Não sei / quero avaliação",
];

const labelCls =
  "mb-2 block font-sans text-[11px] uppercase tracking-[0.22em] text-ink-faint";
const fieldCls =
  "w-full border-0 border-b border-line bg-transparent py-2.5 font-sans text-sm font-light text-ink outline-none transition-colors placeholder:text-ink-faint/70 focus:border-ink";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => (data.get(k) as string) || "";

    const msg = [
      "Pedido de orçamento — Júlio Pintor",
      "",
      `Nome: ${get("nome")}`,
      `Telefone: ${get("telefone")}`,
      `Email: ${get("email")}`,
      `Localidade: ${get("localidade")}`,
      `Tipo de trabalho: ${get("tipo")}`,
      `Estado do espaço: ${get("estado")}`,
      "",
      "Mensagem:",
      get("mensagem"),
    ].join("\n");

    // Encaminha pelo canal disponível; se nenhum estiver configurado,
    // mostra apenas a confirmação (preencher contactos em /data/company.ts).
    if (hasWhatsapp) {
      window.open(
        `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(msg)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else if (hasEmail) {
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
        "Pedido de orçamento",
      )}&body=${encodeURIComponent(msg)}`;
    }
    setSent(true);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className={labelCls}>
            Nome *
          </label>
          <input id="nome" name="nome" required autoComplete="name" className={fieldCls} placeholder="O seu nome" />
        </div>

        <div>
          <label htmlFor="telefone" className={labelCls}>
            Telefone *
          </label>
          <input id="telefone" name="telefone" type="tel" required autoComplete="tel" className={fieldCls} placeholder="Para contacto direto" />
        </div>

        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={fieldCls} placeholder="opcional" />
        </div>

        <div>
          <label htmlFor="localidade" className={labelCls}>
            Localidade
          </label>
          <input id="localidade" name="localidade" className={fieldCls} placeholder="Onde fica o espaço" />
        </div>

        <div>
          <label htmlFor="tipo" className={labelCls}>
            Tipo de trabalho
          </label>
          <select id="tipo" name="tipo" defaultValue="" className={fieldCls}>
            <option value="" disabled>
              Selecione…
            </option>
            {tiposDeTrabalho.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="estado" className={labelCls}>
            Estado atual do espaço
          </label>
          <select id="estado" name="estado" defaultValue="" className={fieldCls}>
            <option value="" disabled>
              Selecione…
            </option>
            {estadosDoEspaco.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="mensagem" className={labelCls}>
            Mensagem
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows={4}
            className={`${fieldCls} resize-none`}
            placeholder="Conte-nos sobre o espaço e o que pretende"
          />
        </div>

        {/* Anexar imagens — disponível numa fase futura. */}
        <div className="sm:col-span-2">
          <p className="rounded-xl border border-dashed border-line px-4 py-3 font-sans text-[12px] font-light text-ink-faint">
            Em breve poderá anexar fotografias do espaço. Por agora, descreva-o
            na mensagem ou envie imagens por WhatsApp.
          </p>
        </div>

        <div className="sm:col-span-2">
          <button type="submit" className="btn-primary w-full sm:w-auto">
            <span>Enviar pedido</span>
          </button>

          {sent && (
            <p
              role="status"
              className="mt-4 font-sans text-sm font-light text-ink-soft"
            >
              {hasWhatsapp || hasEmail
                ? "Obrigado! Vamos abrir o seu pedido — caso não aconteça, use os botões abaixo."
                : "Obrigado pelo seu pedido. Assim que os contactos estiverem ativos, responderemos com uma proposta ajustada."}
            </p>
          )}
        </div>
      </form>

      {/* Ações rápidas */}
      <div className="mt-12 flex flex-wrap gap-3">
        <a
          href={whatsappHref}
          target={hasWhatsapp ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-disabled={!hasWhatsapp}
          className="btn-ghost"
          onClick={(e) => !hasWhatsapp && e.preventDefault()}
        >
          <span>WhatsApp</span>
        </a>
        <a
          href={telHref}
          aria-disabled={!hasPhone}
          className="btn-ghost"
          onClick={(e) => !hasPhone && e.preventDefault()}
        >
          <span>Ligar</span>
        </a>
        <a
          href={mailHref}
          aria-disabled={!hasEmail}
          className="btn-ghost"
          onClick={(e) => !hasEmail && e.preventDefault()}
        >
          <span>Email</span>
        </a>
      </div>
      {!hasWhatsapp && !hasPhone && !hasEmail && (
        <p className="mt-4 font-sans text-[12px] font-light text-ink-faint">
          {/* Preencher os contactos em /data/company.ts para ativar estes botões. */}
          Contactos a anunciar em breve.
        </p>
      )}
    </div>
  );
}
