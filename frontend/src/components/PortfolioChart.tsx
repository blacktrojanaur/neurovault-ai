"use client";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

export default function PortfolioChart({ portfolio }: any) {
  if (!portfolio) return null;

  const data = [
    { name: "ETH", value: portfolio.ETH },
    { name: "USD", value: portfolio.USD_estimate },
  ];

  const colors = ["#a855f7", "#22c55e"];

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
        {data.map((_, i) => (
          <Cell key={i} fill={colors[i]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
