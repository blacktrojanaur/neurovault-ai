const API_BASE = "http://127.0.0.1:8000";

export async function getPortfolio(address: string) {
  const res = await fetch(`${API_BASE}/portfolio/${address}`);
  if (!res.ok) throw new Error("Portfolio API failed");
  return res.json();
}

export async function runAI(address: string) {
  const res = await fetch(`${API_BASE}/agent/${address}`);
  if (!res.ok) throw new Error("AI API failed");
  return res.json();
}
