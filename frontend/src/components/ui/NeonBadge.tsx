export default function NeonBadge({ text }: { text: string }) {
  return (
    <span className="px-3 py-1 text-xs rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.6)]">
      {text}
    </span>
  );
}
