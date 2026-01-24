def simulate_rebalance(portfolio, strategy):
    eth = portfolio["ETH"]

    allocation = strategy["allocation"]

    simulation = {}
    for asset, percent in allocation.items():
        simulation[asset] = round(eth * percent / 100, 4)

    return simulation
