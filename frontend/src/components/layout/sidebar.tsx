"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Vault, GitBranch, Globe2, Settings2 } from "lucide-react";

const menu = [
  { name: "Overview",    path: "/",            icon: LayoutDashboard },
  { name: "AI Vaults",   path: "/vaults",      icon: Vault },
  { name: "Strategies",  path: "/strategies",  icon: GitBranch },
  { name: "Protocols",   path: "/protocols",   icon: Globe2 },
  { name: "Settings",    path: "/settings",    icon: Settings2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen flex flex-col bg-[#07090f] border-r border-white/6">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
            <span className="text-white font-black text-xs">NV</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-none">NeuroVault</p>
            <p className="text-slate-500 text-[10px] mt-0.5">DeFi Intelligence</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {menu.map((item) => {
          const active = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-violet-400" : ""}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer badge */}
      <div className="px-4 py-4 border-t border-white/6">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="text-emerald-400 text-xs font-medium">Agent Online</span>
        </div>
      </div>
    </aside>
  );
}
