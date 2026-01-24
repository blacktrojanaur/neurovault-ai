export type AIAnalysis = {
  riskScore: number;
  strategy: {
    allocation: Record<string, number>;
  };
};

export const api = {
  analyzePortfolio: async (): Promise<AIAnalysis> => {
    // TEMP MOCK DATA (later we connect real AI)
    return {
      riskScore: 42,
      strategy: {
        allocation: {
          ETH: 40,
          BTC: 30,
          DeFi: 20,
          Stable: 10,
        },
      },
    };
  },
};

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};
