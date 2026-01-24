"use client";

import GlassCard from "../ui/GlassCard";
import { motion } from "framer-motion";

export default function StatsGrid() {
  const stats = [
    { title: "Total Value", value: "$32,840", color: "text-green-400" },
    { title: "AI Risk Score", value: "LOW", color: "text-blue-400" },
    { title: "Projected APY", value: "14.2%", color: "text-purple-400" },
    { title: "Active Vaults", value: "5", color: "text-yellow-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <GlassCard>
            <p className="text-gray-400 text-sm">{s.title}</p>
            <p className={`text-3xl font-bold mt-2 ${s.color}`}>{s.value}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
