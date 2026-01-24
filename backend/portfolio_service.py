from web3 import Web3
import os

INFURA = os.getenv("INFURA_URL")
w3 = Web3(Web3.HTTPProvider(INFURA))

def get_portfolio(address: str):
    eth_balance = 0
    if w3.is_connected():
        bal = w3.eth.get_balance(address)
        eth_balance = float(w3.from_wei(bal, "ether"))

    total_value = eth_balance * 3000

    return {
        "address": address,
        "eth_balance": round(eth_balance, 4),
        "usd_value": round(total_value, 2),
        "eth_ratio": 0.7 if total_value > 0 else 0,
    }
