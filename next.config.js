/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Optimization settings
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // Trailing slashes for static export
  trailingSlash: true,
  // Disable unnecessary features for static export
  experimental: {
    // This disables server components as they're not needed for static export
    appDir: false,
  }
}

module.exports = nextConfig
