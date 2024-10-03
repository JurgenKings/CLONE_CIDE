/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '0fz9tp4g-1337.use2.devtunnels.ms',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig