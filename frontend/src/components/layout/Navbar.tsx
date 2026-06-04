"use client";

import { useWallet } from "@/context/WalletContext";
import { Bell, Copy, LogOut } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { address, connectWallet, disconnectWallet } = useWallet();
  const [copied, setCopied] = useState(false);

  function copyAddress() {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-white/6 bg-[#07090f]/80 backdrop-blur-xl">
      {/* Left — breadcrumb placeholder */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="text-slate-600">/</span>
        <span className="text-slate-300 font-medium">Dashboard</span>
      </div>

      {/* Right — wallet + notification */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
        </button>

        {!address ? (
          <button
            onClick={connectWallet}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-150 hover:shadow-lg hover:shadow-violet-500/25"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm text-white font-mono">
                {address.slice(0, 6)}…{address.slice(-4)}
              </span>
              <button onClick={copyAddress} className="text-slate-500 hover:text-white transition-colors ml-1">
                <Copy className="w-3 h-3" />
              </button>
              {copied && <span className="text-[10px] text-emerald-400">Copied!</span>}
            </div>
            <button
              onClick={disconnectWallet}
              className="p-2 rounded-xl hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"
              title="Disconnect"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
