"use client";

import { useWallet } from "@/context/WalletContext";

export default function Navbar() {
  const { address, connectWallet, disconnectWallet } = useWallet();

  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-purple-500/20 bg-black/60">
      <h2 className="text-xl font-semibold text-purple-400">
        NeuroVault AI Dashboard
      </h2>

      {!address ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-green-400 text-sm">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button
            onClick={disconnectWallet}
            className="px-3 py-1 bg-red-600 rounded-md text-sm"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
