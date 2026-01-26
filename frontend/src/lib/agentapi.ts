const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request(path: string, body?: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method: body ? "POST" : "GET",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }

  return res.json();
}

export const api = {
  ai: {
    analyze: (wallet: string) =>
      request("/api/ai/analyze", { wallet }),
  },
  portfolio: {
    load: (wallet: string) =>
      request(`/api/portfolio/${wallet}`),
  },
};
