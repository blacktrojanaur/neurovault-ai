const BASE = process.env.NEXT_PUBLIC_API_URL || "https://neurovault-api-hiny.onrender.com";

export async function runAI(address: string) {
  const res = await fetch(`${BASE}/agent/${address}`);
  return res.json();
}

export async function simulate(address: string) {
  const res = await fetch(`${BASE}/simulate/${address}`);
  return res.json();
}

export async function deployVault(strategy: any) {
  const res = await fetch(`${BASE}/deploy-vault`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(strategy),
  });
  return res.json();
}

export async function exportAI(address: string) {
  const res = await fetch(`${BASE}/agent/${address}`);
  const data = await res.json();

  return new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
}

export async function getETHPrice() {
  const res = await fetch(`${BASE}/price/eth`);
  return res.json();
}
