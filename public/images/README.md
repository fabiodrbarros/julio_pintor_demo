# Imagens

Estrutura sugerida para as fotografias reais:

```
/public/images/
  /obras/
    /pintura-exterior-moradia/
      01.jpg          ← capa (campo `image` em /data/projects.ts)
      02.jpg          ← galeria (`images`)
      03.jpg
      antes.jpg       ← comparador antes/depois (`before`)
      depois.jpg      ← comparador antes/depois (`after`)
    /renovacao-de-interiores/
      ...
```

## Como ligar as imagens ao site

1. Coloca os ficheiros na pasta do respetivo projeto.
2. Em `/data/projects.ts`, preenche os caminhos:

```ts
image: "/images/obras/pintura-exterior-moradia/01.jpg",
images: [
  "/images/obras/pintura-exterior-moradia/02.jpg",
  "/images/obras/pintura-exterior-moradia/03.jpg",
],
before: "/images/obras/pintura-exterior-moradia/antes.jpg",
after:  "/images/obras/pintura-exterior-moradia/depois.jpg",
```

Enquanto os caminhos estiverem vazios (`""`), o site mostra
**placeholders gráficos elegantes** (gradientes + linhas arquitetónicas),
nunca stock photos. O `next/image` faz *lazy loading* automático.

> Recomendado: imagens otimizadas (JPG/WebP), proporção 4:3 ou 16:9,
> largura mínima ~1600px para boa nitidez.
