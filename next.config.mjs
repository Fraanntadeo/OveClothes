/** @type {import('next').NextConfig} */

const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";

const nextConfig = {
  output: "export",
  ...(isGitHubPages && {
    basePath: "/OveClothes",
    assetPrefix: "/OveClothes/",
    env: {
      NEXT_PUBLIC_BASE_PATH: "/OveClothes",
    },
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