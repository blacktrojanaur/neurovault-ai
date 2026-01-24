def simulate_vault(strategy):
    return {
        "projected_return": round(strategy["expected_apy"] * 1.2, 2),
        "risk_level": strategy["risk_score"],
        "status": "Simulation complete"
    }
