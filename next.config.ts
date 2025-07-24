/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable ISR
    isrMemoryCacheSize: 0, // Disable default in-memory caching
  },
  // Enable static exports untuk ISR
  output: 'standalone',
};

export default nextConfig;
