"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function PortfolioPanel() {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("0");

  async function loadPortfolio() {
    if (!(window as any).ethereum) return;

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    setAddress(accounts[0]);

    const bal = await provider.getBalance(accounts[0]);
    setBalance(parseFloat(ethers.formatEther(bal)).toFixed(4));
  }

  useEffect(() => {
    loadPortfolio();
  }, []);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-bold text-blue-400">💰 Live Portfolio</h3>
      <p className="text-gray-400 text-sm mt-2">Wallet: {address.slice(0, 8)}...</p>
      <h2 className="text-2xl font-bold text-green-400 mt-2">{balance} ETH</h2>
    </div>
  );
}
