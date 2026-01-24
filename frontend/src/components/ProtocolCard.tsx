const protocols = [
  { name: "Aave", apy: "5.4%" },
  { name: "Lido", apy: "4.2%" },
  { name: "Curve", apy: "8.1%" },
  { name: "Compound", apy: "3.9%" },
];

export default function ProtocolGrid() {
  return (
    <div className="grid grid-cols-4 gap-6 mt-6">
      {protocols.map((p) => (
        <div
          key={p.name}
          className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-purple-500 transition"
        >
          <h3 className="text-lg font-bold">{p.name}</h3>
          <p className="text-gray-400 mt-2">APY: <span className="text-green-400">{p.apy}</span></p>
          <button className="mt-4 px-4 py-2 bg-purple-600 rounded-lg text-sm hover:bg-purple-700">
            View Strategy
          </button>
        </div>
      ))}
    </div>
  );
}
