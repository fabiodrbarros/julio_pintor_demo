# info.md — Contexto do projeto Júlio Pintor (handoff)

> Documento de continuidade. Resume tudo o que foi feito para retomar
> o trabalho noutro computador ou noutra sessão. Atualizar quando algo mudar.

---

## 1. O que é

Website **multipage premium** para **Júlio Pintor, Unipessoal, Lda** — empresa de
pintura, acabamentos e transformação de espaços em **Arcos de Valdevez / Viana do
Castelo**. Conceito: "atelier digital de pintura", extensão visual do logótipo
(pincelada circular colorida + tipografia fina e espaçada, fundo branco).

- **Repositório:** https://github.com/fabiodrbarros/julio_pintor_demo (branch `main`)
- **Pasta local (PC original):** `C:\Users\Fabio\OneDrive\Documentos\JPA`
- **Git user:** fabiodrbarros / fabiodrbarros@gmail.com

### Retomar noutro PC
```bash
git clone https://github.com/fabiodrbarros/julio_pintor_demo.git
cd julio_pintor_demo
npm install
npm run dev        # http://localhost:3000
```

---

## 2. Stack

- **Next.js 14.2.18** (App Router) + **TypeScript**
- **Tailwind CSS 3.4** (sistema de design alinhado ao logótipo)
- **Framer Motion 11** (animações de tinta, transições, microinterações)
- `next.config.mjs` com **`output: "standalone"`** (para Docker)
- Node 20+ (local foi Node 24; Docker usa node:20-alpine)

---

## 3. Identidade visual (REGRAS — não fugir disto)

- **Fundo branco** sempre como base; texto **quase preto** (`#141414`).
- **Acentos de tinta** (do logótipo): rosa `#FF2E93`, laranja `#FF6A2B`,
  amarelo `#FFB627`, roxo `#8B3DD6`, azul `#4F6BF0`.
- **Tipografia:** `--font-brand` = Josefin Sans · `--font-body` = Montserrat
- **Sem header tradicional.** Botão flutuante à direita → abre menu lateral.
- O **logótipo oficial** (`public/logo/logo.png`) está ligado em `components/Logo.tsx`.

---

## 4. Estrutura de páginas

```
app/
  page.tsx                  Início (hero logo, carrossel de serviços, CTA)
  servicos/                 Todos os serviços em grid
  obras/                    Galeria filtrável (obras estáticas + admin)
  obras/[slug]/             Detalhe de obra + slider antes/depois + partilha social
  sobre/                    Página sobre
  contactos/                Formulário de contacto
  jp-guest-admin/           Área admin (login + dashboard + adicionar obra)
  api/jp-admin/             API REST protegida (login, logout, obras CRUD, upload)
```

### Páginas removidas
- `app/transformacoes/` — **apagada**. Link "Transformações" também removido do menu.
  O componente `BeforeAfterSlider` foi **mantido** e usado na página de detalhe de obra.

---

## 5. Componentes relevantes

| Componente | Descrição |
|---|---|
| `Logo.tsx` | Usa `public/logo/logo.png` (logótipo oficial real) |
| `PaintStrokeHero.tsx` | Hero com logo grande + tagline + CTA. Indicador de scroll = gota de tinta animada |
| `FloatingMenuButton.tsx` | Botão do menu = `PaintRing` (o "C" colorido do logo) |
| `SideMenu.tsx` | Menu lateral — letras pequenas, sem números |
| `ServicesCarousel.tsx` | Carrossel de todos os serviços (9), drag/swipe, dots + setas |
| `ServiceAnimationCard.tsx` | Card de serviço — font-size adaptativo para títulos longos |
| `ShareButtons.tsx` | Facebook + WhatsApp + copiar link (nas páginas de obra) |
| `BeforeAfterSlider.tsx` | Slider antes/depois — usado nas obras |
| `PortfolioGrid.tsx` | Aceita `projects` como prop (server component passa obras estáticas + admin) |

---

## 6. Dados e conteúdo editável

| Ficheiro | O quê |
|---|---|
| `data/company.ts` | Contactos: tel/email/WhatsApp **preenchidos**; Instagram/Facebook por preencher |
| `data/services.ts` | 9 serviços (Pintura exterior e fachadas foram fundidos) |
| `data/projects.ts` | Obras estáticas (dados de estrutura, NÃO reais) |
| `data/projects-runtime.json` | Obras adicionadas pelo admin — **persistente, montar como volume Docker** |
| `public/logo/logo.png` | Logótipo oficial (PNG) — já colocado |
| `public/images/obras/` | Fotos das obras — adicionar por slug |

---

## 7. Área Admin (`/jp-guest-admin`)

### Acesso
- URL: `/jp-guest-admin`
- Utilizador padrão: `julio` · Palavra-passe padrão: `pintor2024`
- Configurável via env vars: `ADMIN_USER` e `ADMIN_PASS`
- Sessão: cookie HMAC assinado, 24h

### Funcionalidades
- **Login** protegido (middleware Next.js bloqueia sem sessão)
- **Dashboard** — lista todas as obras (estáticas + admin), badge de origem
- **Adicionar obra** — formulário completo com upload de imagens
  - Capa, galeria, antes, depois
  - Imagens guardadas em `public/images/obras/[slug]/`
- **Apagar obra** — só obras adicionadas pelo admin (estáticas são protegidas)

### API REST (todas protegidas por sessão)
```
POST   /api/jp-admin/login
POST   /api/jp-admin/logout
GET    /api/jp-admin/obras          → todas as obras
POST   /api/jp-admin/obras          → criar obra
DELETE /api/jp-admin/obras/[slug]   → apagar obra (só runtime)
POST   /api/jp-admin/upload         → upload de imagens (form-data: slug + files)
```

---

## 8. Docker

- **`Dockerfile`** — multi-stage, `node:20-alpine`, standalone output.
- **`docker-compose.yml`:**
  - `container_name: julio-pintor`
  - `ports: "5001:3000"` (host 5001 → container 3000)
  - rede externa **`web`** (partilhada com cloudflared)
  - `restart: unless-stopped` + healthcheck

> ⚠️ Para obras adicionadas pelo admin persistirem entre deploys, montar volume:
> ```yaml
> volumes:
>   - ./data/projects-runtime.json:/app/data/projects-runtime.json
> ```

```bash
# atualizar na VPS
cd ~/julio_pintor_demo
git pull
docker compose up -d --build
```

---

## 9. VPS — estado

- **Host:** `home-server`, user `fabiodrb`, projeto em `~/julio_pintor_demo`.
- **Container:** `julio-pintor`, porta `5001:3000`, rede `web`.
- **Cloudflare Tunnel:** cloudflared na rede `web`, URL interna `julio-pintor:3000`.
- **Outros containers na rede `web`:** nginx-proxy-manager, portainer, cloudflared,
  cv-online, mab-website, capiarcos-demo (8080), minho-ferragens (4173).

---

## 10. TODO / próximos passos

- [ ] Preencher **contactos reais** em `data/company.ts` (tel, email, WhatsApp, IG, FB).
- [ ] Adicionar **fotografias reais** das obras (`public/images/obras/...`).
- [ ] Substituir obras de estrutura em `data/projects.ts` por obras reais (ou adicionar pelo admin).
- [ ] Adicionar **Public Hostname** no Cloudflare → `julio-pintor:3000`.
- [ ] Confirmar/registar domínio (ex.: `juliopintor.pt`) e atualizar `metadataBase` em `app/layout.tsx`.
- [ ] Montar `data/projects-runtime.json` como volume Docker (ver secção 8).
- [ ] (Opcional) Remover `ports: 5001:3000` no Compose → acesso só via túnel.
- [ ] (Opcional) Definir `ADMIN_USER`, `ADMIN_PASS`, `ADMIN_SECRET` como env vars no servidor.

---

## 11. Notas / pegadinhas

- **Aviso `credential-manager-core`** no push (Windows): inofensivo.
- `data/projects.ts` tem **dados de estrutura, NÃO obras reais**.
- `data/projects-runtime.json` começa vazio (`[]`) — obras adicionadas pelo admin ficam aqui.
- Animações respeitam `prefers-reduced-motion`; rasto do cursor só desktop.
- Fonte Josefin Sans suporta "Ú" (JÚLIO).
- `PortfolioGrid` recebe `projects` como prop (não importa diretamente do store).
- `ServicesCarousel` mostra 3 cards/desktop, 2/tablet, 1/mobile — drag + dots + setas.

---

## 12. Atualizações recentes

### Admin: editar + apagar QUALQUER obra
- Store em modelo *overlay* (`lib/projects-store.ts`): `projects-runtime.json` é agora
  `{ "projects": [], "deleted": [] }`. Editar estática = override; apagar estática = tombstone.
- Formulário reutilizável `app/jp-guest-admin/ObraForm.tsx` (criar + editar).
- Página nova `app/jp-guest-admin/editar/[slug]/page.tsx`; API `PUT /api/jp-admin/obras/[slug]`.
- Dashboard: **Editar** + **Apagar** em todas as linhas; badge Estática / Editada / Admin.
- Ao editar, o slug/URL mantém-se; imagens só mudam se enviares novas.

### Categorias = Serviços
- `projectCategories` é derivado de `services` (`data/projects.ts`): as categorias de obras
  são exatamente os serviços de /servicos (filtros de /obras + select do admin).
- Helper `categoryVariant()` mapeia categoria → variante do placeholder gráfico.
- Removida a categoria "Antes/Depois".

### /obras — filtros laterais
- Filtros em coluna vertical à esquerda (sticky no desktop), obras ao lado.
- Estilo: texto por linha + linha divisória; selecionado a escuro + ponto de tinta.

### Contactos (PREENCHIDOS em `data/company.ts`)
- email `geral@juliopintor.pt` · tel `+351 963 171 265` (nota: "Chamada para rede móvel
  nacional", campo `phoneNote`) · whatsapp `351963171265` (mesmo número).
- Bloco "Contactos diretos" em /contactos; contactos também no footer.
- **Instagram/Facebook ainda por preencher.**

### Footer
- Link **Livro de Reclamações** (livroreclamacoes.pt/inicio) ao centro da barra inferior.
- Contactos (email + telefone c/ nota na mesma linha) por baixo do "Seguir".
- Larguras de coluna ajustadas (Navegação 3, Seguir/Contactos 4).

### Página de obra (detalhe)
- Removida a secção "Mais obras / Outras transformações".
- Partilha **só no topo**; `ShareButtons` = **Facebook + copiar link** (sem WhatsApp).
- Open Graph completo (og:title/description/url/type + og:image com fallback p/ logótipo).
  ⚠️ Preview do Facebook só funciona com o site **público** (o FB não lê localhost) e com
  `metadataBase` (em `app/layout.tsx`) no domínio real. Testar no Facebook Sharing Debugger.

### Outros
- Indicador de scroll do hero: gota de tinta **estável** (sem piscar), maior + "SCROLL".
- `/sobre`: botão "Ver transformações" corrigido → "Ver obras" (`/obras`).
