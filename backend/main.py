from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
from web3 import Web3
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
INFURA_URL = os.getenv("INFURA_URL")


client = Groq(api_key=GROQ_API_KEY)
w3 = Web3(Web3.HTTPProvider(INFURA_URL))

# =========================
# FASTAPI APP
# =========================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend access
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# MODELS
# =========================

class WalletRequest(BaseModel):
    wallet: str

class Asset(BaseModel):
    name: str
    value: float

class Portfolio(BaseModel):
    assets: list[Asset]

# =========================
# BLOCKCHAIN FUNCTIONS
# =========================

def get_wallet_balance(address: str):
    try:
        balance_wei = w3.eth.get_balance(address)
        balance_eth = w3.from_wei(balance_wei, "ether")
        return float(balance_eth)
    except Exception as e:
        return 0.0

# =========================
# DEFI DATA FUNCTIONS
# =========================

def get_prices():
    url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,tether&vs_currencies=usd"
    return requests.get(url).json()

def get_defi_yields():
    url = "https://yields.llama.fi/pools"
    data = requests.get(url).json()
    return data["data"][:5]

# =========================
# AI RISK SCORING
# =========================

def risk_score(portfolio):
    eth = portfolio.get("ETH", 0)

    if eth > 2:
        return "High Risk"
    elif eth > 0.5:
        return "Medium Risk"
    else:
        return "Low Risk"

# =========================
# AI AGENT (GROQ LLM)
# =========================

def defi_agent(portfolio, market_data):
    prompt = f"""
    You are an autonomous DeFi investment agent.

    Portfolio: {portfolio}
    Market Data: {market_data}

    Tasks:
    1. Analyze portfolio risk.
    2. Suggest optimal allocation.
    3. Recommend DeFi protocols (Aave, Lido, Curve, Compound).
    4. Provide rebalancing strategy.

    Respond in JSON format.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content

# =========================
# VAULT STRATEGY ENGINE
# =========================

def vault_strategy():
    return {
        "vault_type": "balanced",
        "rebalance_interval": "6 hours",
        "actions": [
            "Stake ETH on Lido",
            "Supply USDT to Aave",
            "Provide liquidity on Curve"
        ]
    }

# =========================
# API ROUTES
# =========================

@app.get("/")
def home():
    return {"project": "NeuroVault.AI", "agent": "active"}

# ---- AI AGENT WITH WALLET ----

@app.post("/agent/analyze")
def agent_analyze(req: WalletRequest):
    eth_balance = get_wallet_balance(req.wallet)

    portfolio = {
        "ETH": eth_balance,
        "USD_estimate": eth_balance * 2000  # approx ETH price
    }

    prices = get_prices()
    yields = get_defi_yields()

    market_data = {
        "prices": prices,
        "yields": yields
    }

    strategy = defi_agent(portfolio, market_data)
    risk = risk_score(portfolio)

    return {
        "wallet": req.wallet,
        "portfolio": portfolio,
        "risk_level": risk,
        "ai_strategy": strategy,
        "market_data": market_data
    }

# ---- MANUAL PORTFOLIO ANALYSIS ----

@app.post("/portfolio/analyze")
def analyze_portfolio(portfolio: Portfolio):
    total_value = sum(asset.value for asset in portfolio.assets)

    return {
        "total_value": total_value,
        "recommendation": "Rebalance towards stable yield protocols",
        "risk_score": "Medium",
        "optimized_allocation": {
            "ETH": "40%",
            "BTC": "30%",
            "Stablecoins": "30%"
        }
    }

# ---- AI VAULT ENGINE ----

@app.post("/agent/vault")
def agent_vault(req: WalletRequest):
    eth_balance = get_wallet_balance(req.wallet)

    portfolio = {
        "ETH": eth_balance
    }

    strategy = defi_agent(portfolio, {})
    vault = vault_strategy()

    return {
        "wallet": req.wallet,
        "ai_strategy": strategy,
        "vault_plan": vault
    }

# ---- MARKET DATA API ----

@app.get("/market-data")
def market_data():
    return {
        "prices": get_prices(),
        "yields": get_defi_yields()
    }
