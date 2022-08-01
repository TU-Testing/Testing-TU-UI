/*eslint-env es6*/
const {
  NODE_ENV
} = process.env;
const isProdMode = NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  swcMinify: true,
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'route.ts'],
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  experimental: {
    externalDir: true,
  },
  eslint: {
    ignoreDuringBuilds: isProdMode,
  },
}

module.exports = nextConfig
