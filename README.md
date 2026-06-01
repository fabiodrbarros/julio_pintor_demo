# Júlio Pintor — website

Website multipage, premium e artístico para **Júlio Pintor, Unipessoal, Lda** —
pintura, acabamentos e transformação de espaços em Arcos de Valdevez / Viana do Castelo.

Construído como uma extensão natural do logótipo: fundo branco, tipografia fina
e espaçada, e os acentos de tinta (rosa, laranja, amarelo, roxo, azul) da
pincelada circular.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (sistema de design alinhado ao logótipo)
- **Framer Motion** (animações de tinta, transições, microinterações)

## Como correr

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm start        # servir o build
```

## Onde editar (sem mexer no código visual)

| O quê | Ficheiro |
| --- | --- |
| **Contactos** (telefone, email, WhatsApp, Instagram, Facebook) | [`data/company.ts`](data/company.ts) |
| **Serviços** (títulos, textos) | [`data/services.ts`](data/services.ts) |
| **Obras / portfólio** | [`data/projects.ts`](data/projects.ts) |
| Links de navegação | [`lib/utils.ts`](lib/utils.ts) |

### Contactos

Em `data/company.ts`, preenche os campos que estão como `""`. Enquanto
estiverem vazios, os botões/links de contacto comportam-se de forma segura
(não geram links partidos). Assim que preencheres, ativam-se automaticamente.

### Imagens reais

- **Logótipo:** ver [`public/logo/README.md`](public/logo/README.md)
  (por defeito é usada uma recriação vetorial fiel; podes trocar pelo ficheiro oficial).
- **Fotografias de obras:** ver [`public/images/README.md`](public/images/README.md).
  Enquanto não houver fotos, são mostrados **placeholders gráficos elegantes**
  (gradientes + linhas), nunca stock photos. Procura os comentários `🔁` no código.

## Estrutura

```
app/                  Páginas (Início, Transformações, Serviços, Obras,
                      Obras/[slug], Sobre, Contactos) + layout + transições
components/           Componentes reutilizáveis (menu lateral, hero, reveals,
                      cards de serviço animados, slider antes/depois, etc.)
data/                 Conteúdo configurável (empresa, serviços, obras)
lib/                  Utilitários e variantes de animação
public/               Imagens e logótipo
```

## Notas de design

- **Sem header tradicional.** Navegação por botão flutuante (gota de tinta) à
  direita, que abre um **menu lateral** com pincelada subtil.
- Cada serviço tem a **sua própria microanimação** de tinta.
- Animações respeitam `prefers-reduced-motion` e o rasto do cursor é
  **desativado em mobile**.
- Acessibilidade: navegação por teclado, foco visível, labels no formulário,
  `alt` nas imagens, salto para o conteúdo.

---

© Júlio Pintor, Unipessoal, Lda
