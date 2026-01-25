/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
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
=======
  eslint: {
    ignoreDuringBuilds: true,
  },


}



module.exports = nextConfig;
>>>>>>> 5e828144b31b7ade8aa69a50d1a857aac78ba1ea

module.exports = nextConfig;