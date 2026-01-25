/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* Uncomment the line below if you specifically need a static export.
     Otherwise, standard Vercel deployments work better without it. */
  // output: 'export', 
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "@react-native-async-storage/async-storage": false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;