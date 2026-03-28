/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/OveClothes',
  assetPrefix: '/OveClothes/',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
