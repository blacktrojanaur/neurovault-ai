import requests

def get_prices():
    url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,tether&vs_currencies=usd"
    return requests.get(url).json()

def get_yields():
    url = "https://yields.llama.fi/pools"
    data = requests.get(url).json()
    return data["data"][:5]
