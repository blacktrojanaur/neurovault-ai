/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',

  // Set basePath to your repo name for GitHub Pages
  // e.g.  https://blacktrojanaur.github.io/neurovault-ai/
  basePath: isProd ? '/neurovault-ai' : '',
  assetPrefix: isProd ? '/neurovault-ai/' : '',

  trailingSlash: true,
  reactStrictMode: true,

  // Suppress TS / ESLint errors during build
  eslint:     { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // Disable image optimisation (not supported in static export)
  images: { unoptimized: true },

  // Webpack fix for MetaMask / React-Native async-storage
  webpack: (config, { webpack, isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@react-native-async-storage/async-storage': false,
      };
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