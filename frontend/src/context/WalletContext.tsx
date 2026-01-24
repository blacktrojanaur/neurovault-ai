"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

type WalletContextType = {
  address: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType>({
  address: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);

  async function connectWallet() {
    if (!(window as any).ethereum) {
      alert("MetaMask not found. Install MetaMask.");
      return;
    }

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAddress(accounts[0]);
    localStorage.setItem("wallet", accounts[0]);
  }

  function disconnectWallet() {
    setAddress(null);
    localStorage.removeItem("wallet");
  }

  useEffect(() => {
    const saved = localStorage.getItem("wallet");
    if (saved) setAddress(saved);
  }, []);

  return (
    <WalletContext.Provider value={{ address, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
