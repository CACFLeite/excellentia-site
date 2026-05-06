/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
