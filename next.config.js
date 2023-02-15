/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-select', 'nouns-builder-components'],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.zora.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.filebase.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
