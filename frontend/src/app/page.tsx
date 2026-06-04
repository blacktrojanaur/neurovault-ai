"use client";

import { useWallet } from "@/context/WalletContext";
import { runAI, simulate, deployVault, exportAI } from "@/services/api";
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/Navbar";
import {
  TrendingUp, TrendingDown, Zap, BarChart3, Vault, FileDown,
  Activity, Wallet, RefreshCw, ChevronRight, Circle,
  DollarSign, Percent, ShieldCheck, ArrowUpRight, ArrowDownRight
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PriceData {
  id: string; symbol: string; name: string;
  current_price: number; price_change_percentage_24h: number;
}

interface LogEntry {
  id: number; msg: string; type: "info" | "success" | "error"; ts: Date;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  title, value, sub, icon: Icon, trend, color,
}: {
  title: string; value: string; sub?: string;
  icon: any; trend?: number; color: string;
}) {
  const up = trend !== undefined && trend >= 0;
  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-black/40 backdrop-blur-xl p-5 ${color}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl bg-white/5`}>
          <Icon className="w-5 h-5 text-white/70" />
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${up ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
            {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(trend).toFixed(2)}%
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
      <p className="text-sm text-slate-400 mt-1">{title}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
      {/* decorative orb */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/3 blur-2xl" />
    </div>
  );
}

// ─── Action Card ──────────────────────────────────────────────────────────────
function ActionCard({
  label, desc, icon: Icon, color, onClick, loading, disabled,
}: {
  label: string; desc: string; icon: any; color: string;
  onClick: () => void; loading?: boolean; disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`group relative w-full text-left rounded-2xl border p-5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${color}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-xl bg-white/10">
          <Icon className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
        </div>
        <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all" />
      </div>
      <p className="font-semibold text-white text-sm">{label}</p>
      <p className="text-xs text-white/50 mt-0.5">{desc}</p>
    </button>
  );
}

// ─── Price Ticker ─────────────────────────────────────────────────────────────
function PriceTicker({ prices }: { prices: PriceData[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
      {prices.map((p) => (
        <div key={p.id} className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <span className="text-xs font-bold text-white uppercase">{p.symbol}</span>
          <span className="text-sm font-semibold text-white">${p.current_price.toLocaleString("en-US", { maximumFractionDigits: 2 })}</span>
          <span className={`text-xs font-medium flex items-center gap-0.5 ${p.price_change_percentage_24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            {p.price_change_percentage_24h >= 0 ? "▲" : "▼"}
            {Math.abs(p.price_change_percentage_24h).toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Activity Feed ────────────────────────────────────────────────────────────
function ActivityFeed({ logs }: { logs: LogEntry[] }) {
  const icon = (type: string) =>
    type === "success" ? "✓" : type === "error" ? "✕" : "·";
  const cls = (type: string) =>
    type === "success"
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      : type === "error"
      ? "bg-red-500/20 text-red-400 border-red-500/30"
      : "bg-blue-500/20 text-blue-400 border-blue-500/30";

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
      {logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-slate-500">
          <Activity className="w-8 h-8 mb-2 opacity-40" />
          <p className="text-sm">No activity yet. Run an agent action.</p>
        </div>
      ) : (
        [...logs].reverse().map((l) => (
          <div key={l.id} className={`flex items-start gap-3 px-3 py-2.5 rounded-xl border text-sm ${cls(l.type)}`}>
            <span className="font-bold mt-0.5">{icon(l.type)}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white/90 text-sm leading-snug">{l.msg}</p>
              <p className="text-xs opacity-50 mt-0.5">{l.ts.toLocaleTimeString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ─── Allocation Bar ───────────────────────────────────────────────────────────
const ALLOC_COLORS = ["bg-violet-500", "bg-blue-500", "bg-cyan-500", "bg-emerald-500", "bg-amber-500"];

function AllocationBars({ allocation }: { allocation: Record<string, number> }) {
  const entries = Object.entries(allocation);
  return (
    <div className="space-y-3 mt-2">
      {entries.map(([k, v], i) => (
        <div key={k}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-300 font-medium capitalize">{k}</span>
            <span className="text-white font-semibold">{v}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full ${ALLOC_COLORS[i % ALLOC_COLORS.length]} transition-all duration-700`}
              style={{ width: `${v}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { address } = useWallet();
  const [data, setData] = useState<any>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [logId, setLogId] = useState(0);

  function addLog(msg: string, type: LogEntry["type"] = "info") {
    setLogId((id) => {
      const newId = id + 1;
      setLogs((prev) => [...prev, { id: newId, msg, type, ts: new Date() }]);
      return newId;
    });
  }

  // Fetch live prices from CoinGecko (free, no key)
  useEffect(() => {
    const ids = "ethereum,bitcoin,usd-coin,chainlink,uniswap";
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&price_change_percentage=24h`)
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setPrices(d))
      .catch(() => {});
    const iv = setInterval(() => {
      fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&price_change_percentage=24h`)
        .then((r) => r.json())
        .then((d) => Array.isArray(d) && setPrices(d))
        .catch(() => {});
    }, 30000);
    return () => clearInterval(iv);
  }, []);

  async function handleRunAI() {
    if (!address) return alert("Connect wallet first");
    setLoading("ai");
    addLog("Scanning on-chain portfolio…");
    try {
      const res = await runAI(address);
      setData(res);
      addLog("Portfolio analysis complete", "success");
      addLog(`Strategy: ${JSON.stringify(res?.strategy?.allocation ?? {})}`, "success");
    } catch {
      addLog("Analysis failed — backend unreachable", "error");
    }
    setLoading(null);
  }

  async function handleSimulate() {
    if (!address) return alert("Connect wallet first");
    setLoading("sim");
    addLog("Running yield simulation…");
    try {
      const res = await simulate(address);
      addLog(`Simulation APY: ${res?.simulation?.expected_apy ?? "N/A"}%`, "success");
      addLog(res?.summary ?? "Simulation complete", "success");
    } catch {
      addLog("Simulation failed", "error");
    }
    setLoading(null);
  }

  async function handleDeploy() {
    if (!data?.strategy) return alert("Run analysis first to generate a strategy");
    setLoading("deploy");
    addLog("Deploying vault contract…");
    try {
      const res = await deployVault(data.strategy);
      addLog(res?.status ?? "Vault deployed", "success");
      if (res?.tx_hash) addLog(`Tx: ${res.tx_hash}`, "success");
    } catch {
      addLog("Deployment failed", "error");
    }
    setLoading(null);
  }

  async function handleExport() {
    if (!address) return alert("Connect wallet first");
    setLoading("export");
    addLog("Generating report…");
    try {
      const blob = await exportAI(address);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "neurovault_report.json";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      addLog("Report downloaded", "success");
    } catch {
      addLog("Export failed", "error");
    }
    setLoading(null);
  }

  const ethBalance = data?.portfolio?.ETH ?? null;
  const riskScore = data?.strategy?.risk_score ?? null;
  const expectedApy = data?.strategy?.expected_apy ?? null;
  const allocation = data?.strategy?.allocation ?? null;

  return (
    <div className="flex h-screen bg-[#080b14]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {/* Price Ticker */}
          {prices.length > 0 && (
            <div className="mb-6">
              <PriceTicker prices={prices} />
            </div>
          )}

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Portfolio Dashboard</h1>
            <p className="text-slate-400 text-sm mt-0.5">
              {address
                ? `${address.slice(0, 6)}…${address.slice(-4)} · Ethereum Mainnet`
                : "Connect your wallet to begin"}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="ETH Balance"
              value={ethBalance !== null ? `${ethBalance} ETH` : "—"}
              sub="Ethereum Mainnet"
              icon={Wallet}
              color="border-violet-500/20"
            />
            <StatCard
              title="Expected APY"
              value={expectedApy !== null ? `${expectedApy}%` : "—"}
              sub="Annualised yield"
              icon={Percent}
              trend={expectedApy}
              color="border-emerald-500/20"
            />
            <StatCard
              title="Risk Score"
              value={riskScore !== null ? `${riskScore}/10` : "—"}
              sub="Portfolio risk level"
              icon={ShieldCheck}
              color="border-blue-500/20"
            />
            <StatCard
              title="Protocols"
              value={allocation ? `${Object.keys(allocation).length}` : "—"}
              sub="Active allocations"
              icon={BarChart3}
              color="border-amber-500/20"
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Left col — Agent Actions */}
            <div className="lg:col-span-1 space-y-4">
              <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4 text-violet-400" />
                  <h2 className="text-sm font-semibold text-white">Agent Actions</h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <ActionCard
                    label="Analyse Portfolio"
                    desc="Scan on-chain positions & generate strategy"
                    icon={loading === "ai" ? RefreshCw : BarChart3}
                    color="bg-violet-500/10 border-violet-500/25 hover:bg-violet-500/20"
                    onClick={handleRunAI}
                    loading={loading === "ai"}
                    disabled={!!loading}
                  />
                  <ActionCard
                    label="Run Simulation"
                    desc="Forecast yield across DeFi protocols"
                    icon={loading === "sim" ? RefreshCw : TrendingUp}
                    color="bg-blue-500/10 border-blue-500/25 hover:bg-blue-500/20"
                    onClick={handleSimulate}
                    loading={loading === "sim"}
                    disabled={!!loading}
                  />
                  <ActionCard
                    label="Deploy Vault"
                    desc="Execute strategy on-chain"
                    icon={loading === "deploy" ? RefreshCw : Vault}
                    color="bg-emerald-500/10 border-emerald-500/25 hover:bg-emerald-500/20"
                    onClick={handleDeploy}
                    loading={loading === "deploy"}
                    disabled={!!loading || !data?.strategy}
                  />
                  <ActionCard
                    label="Export Report"
                    desc="Download full JSON analysis report"
                    icon={loading === "export" ? RefreshCw : FileDown}
                    color="bg-rose-500/10 border-rose-500/25 hover:bg-rose-500/20"
                    onClick={handleExport}
                    loading={loading === "export"}
                    disabled={!!loading}
                  />
                </div>
              </div>

              {/* Allocation */}
              {allocation && (
                <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                    <h2 className="text-sm font-semibold text-white">Strategy Allocation</h2>
                  </div>
                  <AllocationBars allocation={allocation} />
                </div>
              )}
            </div>

            {/* Right col — Activity Feed */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-xl p-5 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <h2 className="text-sm font-semibold text-white">Activity Log</h2>
                  </div>
                  {logs.length > 0 && (
                    <button
                      onClick={() => setLogs([])}
                      className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <ActivityFeed logs={logs} />

                {/* Analysis Results */}
                {data?.strategy && (
                  <div className="mt-5 pt-4 border-t border-white/8">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Last Analysis Result</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "APY", value: `${data.strategy.expected_apy ?? "N/A"}%`, color: "text-emerald-400" },
                        { label: "Risk", value: `${data.strategy.risk_score ?? "N/A"}/10`, color: "text-amber-400" },
                        { label: "Action", value: data.strategy.action ?? "Rebalance", color: "text-violet-400" },
                      ].map((s) => (
                        <div key={s.label} className="p-3 rounded-xl bg-white/5 border border-white/8 text-center">
                          <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    {data.strategy.explanation && (
                      <p className="mt-3 text-sm text-slate-300 leading-relaxed bg-white/5 rounded-xl p-3 border border-white/8">
                        {data.strategy.explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}