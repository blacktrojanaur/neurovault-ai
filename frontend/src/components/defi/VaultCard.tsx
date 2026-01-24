"use client";

import { useState } from "react";
import GlassCard from "../ui/GlassCard";

export default function VaultCard({ name, apy }: { name: string; apy: string }) {
  const [status, setStatus] = useState("");

  function deposit() {
    setStatus(`Simulated deposit into ${name} ✅`);
  }

  return (
    <GlassCard>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-green-400 mt-2">APY: {apy}</p>

      <button
        onClick={deposit}
        className="mt-4 w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
      >
        Deposit
      </button>

      {status && <p className="mt-2 text-sm text-blue-400">{status}</p>}
    </GlassCard>
  );
}
