interface PortfolioChartProps {
  data: any;
}

export default function PortfolioChart({ data }: PortfolioChartProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h3 className="text-lg font-bold text-blue-400">📊 Portfolio Chart</h3>
      <p className="text-gray-500 mt-4">
        ETH Balance: {data?.portfolio?.ETH || 0}
      </p>
    </div>
  );
}
