def vault_strategy(ai_output):
    return {
        "vault_type": "balanced",
        "rebalance_interval": "6 hours",
        "actions": [
            "Stake ETH on Lido",
            "Supply USDT to Aave",
            "Provide liquidity on Curve"
        ]
    }
