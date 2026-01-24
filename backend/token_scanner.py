from web3 import Web3
import requests
import os
from dotenv import load_dotenv

load_dotenv()

INFURA_URL = os.getenv("INFURA_URL")
w3 = Web3(Web3.HTTPProvider(INFURA_URL))

ERC20_ABI = [
    {
        "constant": True,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "type": "function",
    },
]

TOKENS = {
    "USDT": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "USDC": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "DAI": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
}

def get_tokens(address):
    portfolio = {}

    for symbol, contract_address in TOKENS.items():
        contract = w3.eth.contract(address=contract_address, abi=ERC20_ABI)
        balance = contract.functions.balanceOf(address).call()
        decimals = contract.functions.decimals().call()
        portfolio[symbol] = round(balance / (10 ** decimals), 4)

    return portfolio
