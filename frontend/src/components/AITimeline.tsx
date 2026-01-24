export default function AITimeline({ logs }: { logs: string[] }) {
  return (
    <div className="mt-8 bg-black/60 p-6 rounded-xl border border-purple-500/30">
      <h3 className="text-purple-400 text-lg mb-3">🤖 AI Decision Timeline</h3>

      {logs.length === 0 && <p className="text-gray-400">No AI output yet.</p>}

      {logs.map((item, i) => (
        <div key={i} className="text-sm text-gray-300 mb-2">
          • {item}
        </div>
      ))}
    </div>
  );
}
