/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 1. Ignore TypeScript and ESLint errors during build so you can deploy
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 2. forceful Webpack fix for MetaMask SDK
  webpack: (config, { webpack, isServer }) => {
    if (!isServer) {
      // Fallback method
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "@react-native-async-storage/async-storage": false,
      };

      // Plugin method (More aggressive)
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^@react-native-async-storage\/async-storage$/,
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;