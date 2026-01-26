'use client';

import { useState, useRef } from 'react';
import { api } from '@/lib/agentapi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, Play, FileDown } from 'lucide-react';
import { toast } from 'sonner';

interface AnalysisTabProps {
  wallet: string;
}

export default function AnalysisTab({ wallet }: AnalysisTabProps) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // prevents double execution in React strict mode
  const runningRef = useRef(false);

  const handleAnalyze = async () => {
    if (runningRef.current) return;
    runningRef.current = true;

    setIsAnalyzing(true);
    setAnalysis(null);

    toast.info('🤖 AI is analyzing your portfolio...', { duration: 4000 });

    try {
      // timeout wrapper (VERY IMPORTANT)
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('AI timeout (30s)')), 30000)
      );

      const result = await Promise.race([
        api.ai.analyze(wallet),
        timeout,
      ]);

      console.log('✅ AI Result:', result);
      setAnalysis(result);

      toast.success('✅ AI analysis completed!');
    } catch (err: any) {
      console.error('❌ AI Error:', err);

      const msg =
        err?.message ||
        err?.detail ||
        'AI server not responding';

      toast.error(`❌ AI failed: ${msg}`);
    } finally {
      setIsAnalyzing(false);
      runningRef.current = false;
    }
  };

  const handleDownloadReport = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    window.open(`${apiUrl}/api/report/generate?wallet=${wallet}`, '_blank');
  };

  // normalize backend response safely
  const ai = analysis?.ai_result || analysis || {};
  const sim = analysis?.simulation || {};

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                AI Portfolio Analysis
              </CardTitle>
              <CardDescription className="text-blue-300">
                Powered by Groq LLaMA
              </CardDescription>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Play className={`w-4 h-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
                {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
              </Button>

              {analysis && (
                <Button
                  onClick={handleDownloadReport}
                  variant="outline"
                  className="border-purple-500/50 text-purple-300"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* LOADING STATE */}
      {isAnalyzing && (
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-10 text-center">
            <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-spin" />
            <h3 className="text-lg text-white">AI is thinking...</h3>
            <p className="text-blue-300 text-sm mt-2">This may take a few seconds</p>
          </CardContent>
        </Card>
      )}

      {/* RESULT */}
      {analysis && !isAnalyzing && (
        <Card className="bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-xl text-white">AI Recommendation</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">

              <div className="p-4 bg-green-500/20 rounded-lg">
                <div className="text-sm text-green-300">Expected Yield</div>
                <div className="text-xl text-white font-bold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {sim?.apy_increase
                    ? `+${sim.apy_increase.toFixed(2)}%`
                    : ai?.expected_yield_increase
                    ? `+${ai.expected_yield_increase}%`
                    : 'N/A'}
                </div>
              </div>

              <div className="p-4 bg-blue-500/20 rounded-lg">
                <div className="text-sm text-blue-300">Confidence</div>
                <div className="text-xl text-white font-bold">
                  {ai?.confidence
                    ? `${Math.round(ai.confidence * 100)}%`
                    : 'N/A'}
                </div>
              </div>

              <div className="p-4 bg-purple-500/20 rounded-lg">
                <div className="text-sm text-purple-300">Action</div>
                <div className="text-xl text-white font-bold capitalize">
                  {ai?.action || 'rebalance'}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-blue-300 mb-2">Explanation</div>
              <p className="text-white">
                {ai?.explanation || 'No explanation provided'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* EMPTY STATE */}
      {!analysis && !isAnalyzing && (
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-10 text-center">
            <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg text-white">No analysis yet</h3>
            <p className="text-blue-300 text-sm mb-4">
              Run AI to get portfolio insights
            </p>
            <Button onClick={handleAnalyze}>
              <Play className="w-4 h-4 mr-2" />
              Run AI Analysis
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
