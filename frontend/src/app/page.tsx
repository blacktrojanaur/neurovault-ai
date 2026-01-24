"use client";

import Sidebar from "@/components/layout/sidebar";
import WalletButton from "@/components/WalletConnectButton";
import AITimeline from "@/components/AITimeline";
import { useWallet } from "@/context/WalletContext";
import { runAI, simulate, deployVault } from "@/services/api";
import { exportAI } from "@/services/api";

import { useState } from "react";
import { getETHPrice } from "@/services/api";



export default function Page() {
  const { address } = useWallet();
  const [data, setData] = useState<any>(null);
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  

  function addLog(msg: string) {
    setLog((prev) => [...prev, msg]);
  }

  async function handleRunAI() {
    if (!address) return alert("Connect wallet first");
    setLoading(true);
    addLog("🤖 Running AI agent...");
    const res = await runAI(address);
    setData(res);
    addLog("✅ AI analysis completed");
    setLoading(false);
  }

  async function handleSimulate() {
  if (!address) return alert("Connect wallet first");
  addLog("📊 Running simulation...");

  const res = await simulate(address);

  addLog("✅ Simulation result: " + JSON.stringify(res.simulation));
  addLog("📈 Summary: " + res.summary);
}


  async function handleDeploy() {
  if (!data?.strategy) return alert("Run AI first");

  addLog("🏦 Deploying vault...");

  const res = await deployVault(data.strategy);

  addLog("✅ " + res.status);
  addLog("🔗 Tx Hash: " + res.tx_hash);
}

  async function handleExport() {
  if (!address) return alert("Connect wallet first");

  const blob = await exportAI(address);
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "neurovault_result.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  addLog("📁 AI result exported to file");
}


  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-10 bg-gradient-to-br from-black via-purple-900/20 to-black text-white">
        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-bold text-purple-400">
            NeuroVault AI Dashboard
          </h2>
          <WalletButton />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-6 flex-wrap">
  <button onClick={handleRunAI} className="px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-700">
    Run AI Agent
  </button>

  <button onClick={handleSimulate} className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700">
    Simulate
  </button>

  <button onClick={handleDeploy} className="px-6 py-3 bg-green-600 rounded-xl hover:bg-green-700">
    Deploy Vault
  </button>

  {/* ✅ NEW BUTTON */}
  <button onClick={handleExport} className="px-6 py-3 bg-pink-600 rounded-xl hover:bg-pink-700">
    Generate Report
  </button>
</div>


        {loading && <p className="text-purple-400 animate-pulse">AI analyzing...</p>}

        {/* Stats */}
<div className="grid grid-cols-3 gap-6 mt-6">
  <div className="bg-black/60 p-6 rounded-xl">
    ETH Balance: {data?.portfolio?.ETH ?? "-"}
  </div>
  <div className="bg-black/60 p-6 rounded-xl">
    Risk Score: {data?.strategy?.risk_score ?? "-"}
  </div>
  <div className="bg-black/60 p-6 rounded-xl">
    APY: {data?.strategy?.expected_apy ?? "-"}
  </div>
</div>

{/* ✅ PASTE HERE */}
{data?.strategy && (
  <div className="mt-6 bg-black/50 p-6 rounded-xl border border-purple-500/30">
    <h3 className="text-purple-400 font-bold mb-3">AI Strategy Allocation</h3>
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(data.strategy.allocation).map(([k, v]: any) => (
        <div key={k} className="bg-black/60 p-3 rounded-lg text-center">
          <p className="text-gray-400">{k}</p>
          <p className="text-lg font-bold text-purple-300">{v}%</p>
        </div>
      ))}
    </div>
  </div>
)}

{/* AI Timeline */}
<AITimeline logs={log} />


        
      </main>
    </div>
  );
}
