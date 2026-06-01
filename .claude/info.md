# info.md — Contexto do projeto Júlio Pintor (handoff)

> Documento de continuidade. Resume tudo o que foi feito nesta conversa para
> retomar o trabalho noutro computador. Atualizar quando algo mudar.

---

## 1. O que é

Website **multipage premium** para **Júlio Pintor, Unipessoal, Lda** — empresa de
pintura, acabamentos e transformação de espaços em **Arcos de Valdevez / Viana do
Castelo**. Conceito: "atelier digital de pintura", extensão visual do logótipo
(pincelada circular colorida + tipografia fina e espaçada, fundo branco).

- **Repositório:** https://github.com/fabiodrbarros/julio_pintor_demo (branch `main`)
- **Pasta local (PC original):** `C:\Users\Fabio\OneDrive\Documentos\JPA`
- **Git user:** fabiodrbarros / fabiodrbarros@gmail.com
- Repo **isolado** (tem o seu próprio `.git`; não faz parte do repo pessoal em `C:\Users\Fabio`).

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
  amarelo `#FFB627`, roxo `#8B3DD6`, azul `#4F6BF0`. Aparecem como
  pinceladas/gradientes, nunca como ruído.
- **Tipografia:** geométrica, fina, espaçada, MAIÚSCULAS no wordmark.
  - `--font-brand` = **Josefin Sans** (wordmark/títulos)
  - `--font-body` = **Montserrat** (corpo)
- **Sem header tradicional.** Botão flutuante (gota de tinta) à direita →
  abre **menu lateral** (vidro fosco + pincelada).
- O **logótipo é recriado em SVG** (`components/PaintRing.tsx`) para permitir as
  animações. Para usar o ficheiro oficial: por em `public/logo/logo.png` e trocar
  em `components/Logo.tsx` (ver `public/logo/README.md`).

---

## 4. Estrutura

```
app/            Páginas + layout + template (transição de página) + globals.css
  page.tsx                Início (hero pincelada, surface selector, 3 frentes)
  transformacoes/         Antes/depois, paint reveals, slider
  servicos/               10 serviços, cada um com microanimação própria
  obras/                  Galeria filtrável
  obras/[slug]/           Detalhe de obra (SSG) — desafio/solução/resultado
  sobre/                  "Rigor de obra. Olho de detalhe. Acabamento de artista."
  contactos/              Formulário de conversão
components/     ~25 componentes (SideMenu, PaintStrokeHero, PaintReveal,
                ServiceAnimationCard, AnimatedServiceIcon, BeforeAfterSlider,
                PortfolioGrid, ProjectCard, ContactForm, FloatingCTA, etc.)
data/           company.ts · services.ts · projects.ts   ← CONTEÚDO EDITÁVEL
lib/            utils.ts (cores, nav, cn) · animations.ts (variants Framer)
public/         images/ e logo/ (com READMEs de instruções)
```

### O que editar (sem mexer no visual)
- **Contactos / redes sociais:** `data/company.ts` (telefone, email, WhatsApp,
  Instagram, Facebook). **Estão como placeholders `""`** — enquanto vazios, os
  botões não geram links partidos; ao preencher ativam-se sozinhos.
- **Serviços / Obras:** `data/services.ts`, `data/projects.ts`.
- **Fotos reais:** `public/images/obras/<slug>/...` e ligar em `data/projects.ts`
  (ver `public/images/README.md`). Sem fotos → mostra placeholders gráficos
  elegantes (nunca stock photos). Procurar comentários `🔁` no código.

---

## 5. Docker

- **`Dockerfile`** — multi-stage (`deps` → `builder` → `runner`), `node:20-alpine`,
  utilizador sem privilégios, usa o output `standalone`. Container ouve na **3000**.
- **`docker-compose.yml`:**
  - `container_name: julio-pintor`
  - **`ports: "5001:3000"`** (host **5001** → container **3000**)
  - rede externa **`web`** (alias `proxy`) — partilhada com o cloudflared
  - `restart: unless-stopped` + healthcheck
- **`.dockerignore`** exclui node_modules, .next, .git, .claude, *.md.

```bash
# local
docker compose up -d --build
docker compose logs -f
```

> ⚠️ Em comunicação container-a-container usa-se a porta **3000** (interna),
> NÃO a 5001 (essa é só o mapeamento no host).

---

## 6. VPS — estado atual

- **Host:** `home-server`, user `fabiodrb`, projeto em `~/julio_pintor_demo`.
- **Já deployado e `healthy`.** Imagem `julio-pintor:latest`, `5001:3000`.
- **Outros containers no servidor:** nginx-proxy-manager (80/81/443),
  portainer (9000/9443), **cloudflared** (Cloudflare Tunnel com token),
  cv-online, mab-website, capiarcos-demo (8080:3000), minho-ferragens (4173).
- **Rede partilhada `web`** contém: `cloudflared`, `cv-online`, `mab-website`,
  `capiarcos-demo`, `minho-ferragens` e agora **`julio-pintor`**.
- **Portas do host ocupadas:** 80, 81, 443, 3000(*livre p/ futuro*), 4173,
  5001 (julio-pintor), 8080, 9000, 9443. **Sem conflitos.**

### Atualizar na VPS
```bash
cd ~/julio_pintor_demo
git pull
docker compose up -d        # recria já ligado à rede "web"
```

---

## 7. Cloudflare Tunnel (Zero Trust)

O `cloudflared` é **token-based / gerido pelo dashboard** (Public Hostnames no
painel, não em ficheiro). Como o `julio-pintor` agora está na rede `web`, o
cloudflared alcança-o pelo nome.

**Configuração (one.dash.cloudflare.com → Networks → Tunnels → o teu túnel →
Public Hostnames → Add):**
- Subdomain + Domain: ex. `juliopintor.teudominio.xxx`
- Type: **HTTP**
- URL: **`julio-pintor:3000`**  ← interna, não 5001

DNS + HTTPS tratados pelo Cloudflare. Para ficar **só** acessível pelo túnel,
comentar o bloco `ports:` no `docker-compose.yml`.

**Teste de conectividade (na VPS):**
```bash
docker run --rm --network web busybox wget -qO- http://julio-pintor:3000 >/dev/null && echo OK
```

---

## 8. TODO / próximos passos

- [ ] Preencher **contactos reais** em `data/company.ts` (tel, email, WhatsApp, IG, FB).
- [ ] Adicionar **fotografias reais** das obras (`public/images/obras/...`).
- [ ] (Opcional) Pôr o **logótipo oficial** em `public/logo/logo.png`.
- [ ] Adicionar o **Public Hostname** no Cloudflare (passo 7) e confirmar o domínio.
- [ ] (Opcional, segurança) Remover/comentar `ports: 5001:3000` → acesso só via túnel.
- [ ] (Opcional) Se usar muitas imagens raster com otimização `next/image`,
      instalar `sharp` no estágio runner do Dockerfile.

---

## 9. Notas / pegadinhas

- **Aviso `credential-manager-core is not a git command`** no push: inofensivo —
  o Git for Windows renomeou o helper para `manager`. O push funciona na mesma
  (credenciais em cache). Para silenciar: `git config --global credential.helper manager`.
- **Avisos LF→CRLF** no `git add` (Windows): inofensivos.
- Fonte **Josefin Sans** suporta o acento de "JÚLIO" (Ú).
- `data/projects.ts` tem **dados de estrutura, NÃO obras reais** — substituir.
- Animações respeitam `prefers-reduced-motion`; rasto do cursor **só desktop**.
