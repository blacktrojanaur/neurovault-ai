"use client";

import { useState } from "react";

export default function AIAgent() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function runAI() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/ai/run");
      const data = await res.json();
      setResult(data.data);
    } catch (err) {
      setResult({ error: "Backend not reachable" });
    }

    setLoading(false);
  }

  return (
    <div className="card">
      <h2>🤖 NeuroVault AI Agent</h2>

      <button onClick={runAI}>Run AI Analysis</button>

      {loading && <p>Analyzing portfolio...</p>}

      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
