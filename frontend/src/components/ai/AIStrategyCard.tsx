import GlassCard from "../ui/GlassCard";

export default function AIStrategyCard() {
  return (
    <GlassCard>
      <h3 className="text-lg font-bold text-purple-400">🧠 AI Strategy</h3>
      <ul className="mt-3 text-gray-400 text-sm space-y-1">
        <li>• Move 25% ETH → Lido staking</li>
        <li>• Allocate 15% → Curve LP</li>
        <li>• Reduce stablecoin exposure by 10%</li>
      </ul>
    </GlassCard>
  );
}
