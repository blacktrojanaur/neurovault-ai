export const api = {
  ai: {
    analyze: async (wallet: string) => {
      const res = await fetch(`/api/ai/analyze?wallet=${wallet}`);
      return res.json();
    },
  },

  portfolio: {
    loadDemo: async (wallet: string) => {
      const res = await fetch(`/api/portfolio?wallet=${wallet}`);
      return res.json();
    },

    refresh: async (wallet: string) => {
      const res = await fetch(`/api/portfolio/refresh?wallet=${wallet}`, {
        method: "POST",
      });
      return res.json();
    },
  },
};

export const fetcher = (url: string) =>
  fetch(url).then((res) => res.json());
