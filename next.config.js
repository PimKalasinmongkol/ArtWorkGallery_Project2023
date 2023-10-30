/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.pexels.com',
            port: '',
            pathname: '/photos/**',
          },
          {
            protocol: 'https',
            hostname: 'cdn.pic.in.th',
            port: '',
            pathname: '/file/picinth/**',
          }
        ],
    },
}

module.exports = nextConfig
