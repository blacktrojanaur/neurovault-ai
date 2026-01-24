import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // optional
    }),
  ],
  transports: {
    [mainnet.id]: http(),
  },
});
