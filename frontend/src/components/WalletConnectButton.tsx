"use client";
import { useWallet } from "@/context/WalletContext";

export default function WalletButton() {
  const { address, connectWallet } = useWallet();

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-purple-600 rounded-lg"
    >
      {address ? address.slice(0, 6) + "..." : "Connect Wallet"}
    </button>
  );
}
