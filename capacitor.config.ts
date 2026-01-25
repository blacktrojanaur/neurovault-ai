import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.neurovault.app',
  appName: 'NeuroVault AI',
  webDir: 'public',
  server: {
    // REPLACE with your IPv4 address from Step 1
    // Keep the :3000 at the end
    url: 'http://172.22.187.107:3000', 
    cleartext: true
  }
};

export default config;