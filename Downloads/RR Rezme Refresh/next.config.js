/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable caching in development mode
      config.cache = false;
    }
    return config;
  }
};

module.exports = nextConfig;