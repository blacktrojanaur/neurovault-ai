// frontend/src/lib/agentapi.ts

export const api = {
  ai: {
    analyze: async (wallet: string) => {
      const res = await fetch(`/api/ai/analyze?wallet=${wallet}`);
      return res.json();
    },
  },

  portfolio: {
    // Load portfolio (main)
    loadDemo: async (wallet: string) => {
      const res = await fetch(`/api/portfolio?wallet=${wallet}`);
      return res.json();
    },

    // Refresh portfolio (same as load for now)
    refresh: async (wallet: string) => {
      const res = await fetch(`/api/portfolio?wallet=${wallet}`);
      return res.json();
    },

    // Demo portfolio (mock data fallback)
    demo: async () => {
      return {
        wallet: "demo-wallet",
        assets: [
          { name: "ETH", amount: 1.42 },
          { name: "USDC", amount: 520 },
          { name: "ARB", amount: 230 },
        ],
      };
    },
  },
};

// SWR fetcher
export const fetcher = (url: string) =>
  fetch(url).then((res) => res.json());
