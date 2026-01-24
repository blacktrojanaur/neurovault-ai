import requests

def get_market_data():
    url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    r = requests.get(url).json()
    return {"eth_price": r["ethereum"]["usd"]}
