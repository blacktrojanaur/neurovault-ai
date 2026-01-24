"use client";

import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi";
import { ReactNode } from "react";

export default function Web3Provider({ children }: { children: ReactNode }) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
