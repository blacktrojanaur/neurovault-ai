"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "AI Vaults", path: "/vaults" },
  { name: "Strategies", path: "/strategies" },
  { name: "Protocols", path: "/protocols" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-black border-r border-purple-800/40 p-6">
      <h1 className="text-2xl font-bold text-purple-400 mb-10">
        NeuroVault.AI
      </h1>

      <nav className="flex flex-col gap-4">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`text-lg px-3 py-2 rounded-lg transition ${
              pathname === item.path
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-purple-900/40"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
