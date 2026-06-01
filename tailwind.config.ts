import type { Config } from "tailwindcss";

/**
 * Sistema de design derivado do logótipo "JÚLIO PINTOR":
 * fundo branco, texto quase preto e os acentos de tinta vibrante
 * (rosa, laranja, amarelo, roxo e azul) da pincelada circular.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        ink: "#141414",
        "ink-soft": "#3A3A3A",
        "ink-faint": "#8A8A8A",
        line: "#ECECEC",
        // Acentos de tinta — extraídos do logótipo.
        paint: {
          pink: "#FF2E93",
          orange: "#FF6A2B",
          amber: "#FFB627",
          purple: "#8B3DD6",
          blue: "#4F6BF0",
        },
      },
      fontFamily: {
        // Wordmark / títulos: geométrica, fina e espaçada (próxima do logo).
        brand: ["var(--font-brand)", "system-ui", "sans-serif"],
        // Corpo de texto: geométrica humanista, leve.
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.32em",
        wide2: "0.18em",
        wide3: "0.24em",
      },
      maxWidth: {
        content: "1180px",
      },
      backgroundImage: {
        // Sweep de tinta de referência (laranja → rosa → roxo → azul).
        "paint-sweep":
          "linear-gradient(120deg, #FF6A2B 0%, #FF2E93 32%, #8B3DD6 66%, #4F6BF0 100%)",
        "paint-sweep-soft":
          "linear-gradient(120deg, rgba(255,106,43,0.14) 0%, rgba(255,46,147,0.14) 34%, rgba(139,61,214,0.14) 68%, rgba(79,107,240,0.14) 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "paint-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "paint-flow": "paint-flow 6s linear infinite",
        float: "float 5s ease-in-out infinite",
      },
      transitionTimingFunction: {
        paint: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
