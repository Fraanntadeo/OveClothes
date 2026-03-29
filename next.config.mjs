/** @type {import('next').NextConfig} */

// Configuración condicional según el entorno
const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";

const nextConfig = {
  output: "export",
  ...(isGitHubPages && {
    basePath: "/OveClothes",
    assetPrefix: "/OveClothes/",
  }),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
