# Logótipo

Coloca aqui o ficheiro oficial do logótipo, por exemplo:

- `logo.png` (ou `logo.svg`) — versão principal
- `logo-mark.png` — apenas o símbolo (pincelada circular)

## Como usar o logótipo oficial no site

Por defeito, o componente `components/Logo.tsx` mostra uma **recriação
vetorial fiel** do logótipo (mesmo anel aberto, mesmas cores, tipografia
fina e espaçada). Isto garante animações de tinta e nitidez perfeita.

Para usar antes o ficheiro de imagem oficial, edita `components/Logo.tsx`
e substitui o `<PaintRing/>` + wordmark por:

```tsx
import Image from "next/image";

<Image src="/logo/logo.png" alt="Júlio Pintor" width={180} height={60} priority />
```

> A recriação vetorial respeita a identidade do logótipo; usa o ficheiro
> oficial apenas se preferires a imagem exata.
