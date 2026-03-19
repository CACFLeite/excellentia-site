/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['excellentia-edu.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'excellentia-edu.com',
        pathname: '/wp-content/**',
      },
    ],
  },
}

module.exports = nextConfig
