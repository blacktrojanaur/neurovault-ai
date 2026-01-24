// frontend/src/lib/agentapi.ts

export type PortfolioAsset = {
  name: string;
  amount: number;
};

export type Portfolio = {
  wallet: string;
  assets: PortfolioAsset[];
};

export type Strategy = {
  risk_score: string;
  allocation: Record<string, number>;
  expected_apy: string;
};

export type AIAnalysis = {
  portfolio: {
    ETH: number;
    USD: number;
  };
  strategy: Strategy;
  timeline: string[];
};

export type Simulation = {
  simulation: Record<string, string>;
  summary: string;
};

// simple fetcher (used by SWR sometimes)
export const fetcher = (url: string) =>
  fetch(url).then((res) => res.json());

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export const api = {
  ai: {
    analyze: async (wallet: string): Promise<AIAnalysis> => {
      const res = await fetch(`${API_BASE}/agent/${wallet}`);
      return res.json();
    },
  },

  portfolio: {
    loadDemo: async (wallet: string): Promise<Portfolio> => {
      return {
        wallet,
        assets: [
          { name: "ETH", amount: 1.2 },
          { name: "USDC", amount: 540 },
          { name: "DeFi Tokens", amount: 300 },
        ],
      };
    },

    refresh: async (wallet: string): Promise<Portfolio> => {
      const res = await fetch(`${API_BASE}/portfolio/${wallet}`);
      const data = await res.json();
      return {
        wallet,
        assets: [
          { name: "ETH", amount: data.ETH },
          { name: "USD Value", amount: data.USD },
        ],
      };
    },

    demo: async (): Promise<boolean> => {
      return true;
    },
  },

  simulation: {
    run: async (wallet: string): Promise<Simulation> => {
      const res = await fetch(`${API_BASE}/simulate/${wallet}`);
      return res.json();
    },
  },
};
