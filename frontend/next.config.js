/** @type {import('next').NextConfig} */
const nextConfig = {
  /* If you have existing config options like 'reactStrictMode', keep them here */
  reactStrictMode: true,
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // This tells Webpack to ignore the React Native module on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "@react-native-async-storage/async-storage": false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;