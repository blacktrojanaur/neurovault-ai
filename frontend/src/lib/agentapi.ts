export type AIResult = {
  riskScore: number;
  recommendation: string;
};

export const api = {
  ai: {
    analyze: async (wallet: string): Promise<AIResult> => {
      // Example dummy AI response (replace with backend call)
      return {
        riskScore: 78,
        recommendation: "Reduce exposure to volatile assets",
      };
    },
  },

  portfolio: {
    loadDemo: async (wallet: string) => {
      // Example demo portfolio (replace with backend call)
      return {
        wallet,
        assets: [
          { name: "ETH", amount: 2.3 },
          { name: "BTC", amount: 0.5 },
        ],
      };
    },
  },
};
