/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Descomenta y cambia 'ove-clothes' por el nombre de tu repositorio en GitHub
  // basePath: '/ove-clothes',
  // assetPrefix: '/ove-clothes/',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
