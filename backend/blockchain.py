from web3 import Web3

INFURA_URL = "https://mainnet.infura.io/v3/19a7c6daed42473695621a3f9290138f"

w3 = Web3(Web3.HTTPProvider(INFURA_URL))

def get_wallet_balance(address):
    balance_wei = w3.eth.get_balance(address)
    balance_eth = w3.from_wei(balance_wei, "ether")
    return float(balance_eth)
