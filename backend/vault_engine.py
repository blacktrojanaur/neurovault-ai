def generate_vault_strategy(ai_output):
    return {
        "vault_type": "balanced",
        "rebalance_interval": "6h",
        "actions": [
            "Stake ETH on Lido",
            "Supply stablecoins on Aave",
            "Provide liquidity on Curve"
        ]
    }
