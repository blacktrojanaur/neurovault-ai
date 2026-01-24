"use client";

import { useState } from "react";
import { BrowserProvider } from "ethers";

type Props = {
  onConnect?: (addr: string) => void;
};

export default function WalletConnect({ onConnect }: Props) {
  const [address, setAddress] = useState<string | null>(null);

  async function connectWallet() {
    if (!(window as any).ethereum) {
      alert("MetaMask not installed");
      return;
    }

    const provider = new BrowserProvider((window as any).ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    const addr = accounts[0];
    setAddress(addr);

    if (onConnect) onConnect(addr);
  }

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
    >
      {address ? shortenAddress(address) : "Connect Wallet"}
    </button>
  );
}

function shortenAddress(addr: string) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}
