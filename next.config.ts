/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    isrMemoryCacheSize: 0,
  },
  output: 'standalone',
};

export default nextConfig;
