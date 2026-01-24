from web3 import Web3
import os

w3 = Web3(Web3.HTTPProvider(os.getenv("INFURA_URL")))

def get_eth_balance(address):
    balance = w3.eth.get_balance(address)
    return float(w3.from_wei(balance, "ether"))
