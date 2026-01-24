/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      // Ignore React Native dependencies that may be referenced by sub-dependencies
      '@react-native-async-storage/async-storage': false,
      'react-native': false,
      'react-native-randombytes': false,
      'react-native-get-random-values': false,
    };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },


}



module.exports = nextConfig;

