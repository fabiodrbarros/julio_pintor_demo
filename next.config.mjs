/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Gera um servidor mínimo e autossuficiente em .next/standalone (ideal para Docker).
  output: "standalone",
  images: {
    // Quando adicionares imagens reais externas, regista aqui os domínios.
    remotePatterns: [],
  },
};

export default nextConfig;
