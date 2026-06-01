/**
 * Definições SVG partilhadas (montadas uma vez no layout):
 *  - filtro #brush-texture: dá textura de pincel às formas (turbulência + deslocamento)
 *  - gradientes de tinta reutilizáveis por id
 * Renderiza um SVG invisível (não ocupa espaço, aria oculto).
 */
export default function PaintDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute" }}
    >
      <defs>
        {/* Textura de pincel — bordas irregulares, sensação artesanal. */}
        <filter id="brush-texture" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.013 0.02"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={10}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Textura mais subtil para detalhes finos. */}
        <filter id="brush-texture-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.03"
            numOctaves={2}
            seed={3}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={4}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Gradiente de tinta principal (laranja → rosa → roxo → azul). */}
        <linearGradient id="paintGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6A2B" />
          <stop offset="22%" stopColor="#FFB627" />
          <stop offset="48%" stopColor="#FF2E93" />
          <stop offset="74%" stopColor="#8B3DD6" />
          <stop offset="100%" stopColor="#4F6BF0" />
        </linearGradient>

        {/* Versão para o anel/pincelada circular (ordem do logótipo). */}
        <linearGradient id="paintRing" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB627" />
          <stop offset="28%" stopColor="#FF6A2B" />
          <stop offset="52%" stopColor="#FF2E93" />
          <stop offset="78%" stopColor="#8B3DD6" />
          <stop offset="100%" stopColor="#4F6BF0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
