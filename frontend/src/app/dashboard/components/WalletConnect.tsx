'use client';

import { useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { shortenAddress } from '@/lib/utils';

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const {
    mode,
    walletAddress,
    setWalletAddress,
    clearWallet,
    setMode,
  } = useStore();

  // Sync wagmi → zustand
  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
      setMode('wallet');
    }
  }, [isConnected, address]);

  const handleConnect = () => {
    const injected = connectors.find(c => c.id === 'injected');
    if (!injected) {
      toast.error('MetaMask not found');
      return;
    }
    connect({ connector: injected });
  };

  const handleDisconnect = async () => {
    await disconnectAsync();
    clearWallet();
    setMode('demo');
    toast.info('Disconnected → Demo Mode');
  };

  const handleDemoMode = () => {
    clearWallet();
    setMode('demo');
    toast.success('Demo Mode activated');
  };

  const activeWallet = walletAddress;
  const isDemo = mode === 'demo';

  if (activeWallet) {
    return (
      <div className="flex items-center gap-3">
        {isDemo && (
          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded text-xs">
            Demo
          </span>
        )}

        <div className="px-3 py-1 bg-white/10 rounded border border-white/20">
          <Wallet className="w-4 h-4 inline mr-1" />
          {shortenAddress(activeWallet)}
        </div>

        <Button
          onClick={handleDisconnect}
          size="sm"
          variant="outline"
          className="border-red-500 text-red-400"
        >
          <LogOut className="w-4 h-4 mr-1" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button onClick={handleConnect} disabled={isPending}>
        <Wallet className="w-4 h-4 mr-2" />
        Connect MetaMask
      </Button>

      <Button onClick={handleDemoMode} variant="outline">
        <Sparkles className="w-4 h-4 mr-2" />
        Demo Mode
      </Button>
    </div>
  );
}
