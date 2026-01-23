"use client";

import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function connectWallet() {
    if (!(window as any).ethereum) {
      alert("MetaMask not installed");
      return;
    }

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setWallet(accounts[0]);
  }

  async function runAgent() {
    if (!wallet) {
      alert("Connect wallet first");
      return;
    }

    setLoading(true);

    const res = await fetch("http://127.0.0.1:8000/agent/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wallet: wallet,
      }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-purple-500">NeuroVault.AI Agent</h1>
      <p className="text-gray-400 mt-2">Autonomous AI DeFi Portfolio Strategist</p>

      {!wallet ? (
        <button
          onClick={connectWallet}
          className="mt-6 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Connect MetaMask
        </button>
      ) : (
        <p className="mt-4 text-green-400">Wallet Connected: {wallet}</p>
      )}

      <button
        onClick={runAgent}
        className="mt-6 px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700"
      >
        {loading ? "AI Agent Running..." : "Run AI DeFi Agent"}
      </button>

      {result && (
        <div className="mt-6 bg-gray-900 p-4 rounded-lg text-sm overflow-auto">
          <h3 className="text-lg font-semibold">AI Agent Output:</h3>
          <pre className="mt-2 text-green-400">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
