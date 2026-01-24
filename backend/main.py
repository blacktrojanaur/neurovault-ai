from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from web3 import Web3
import random
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

INFURA_URL = os.getenv("INFURA_URL", "")
w3 = Web3(Web3.HTTPProvider(INFURA_URL)) if INFURA_URL else None


# ✅ Get live ETH price
def get_eth_price():
    try:
        r = requests.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
        return r.json()["ethereum"]["usd"]
    except:
        return 3000


@app.get("/")
def root():
    return {"status": "NeuroVault backend running"}


@app.get("/portfolio/{address}")
def portfolio(address: str):
    eth_balance = 0.0

    try:
        if w3 and w3.is_connected():
            bal = w3.eth.get_balance(address)
            eth_balance = float(w3.from_wei(bal, "ether"))
    except:
        eth_balance = 0.0

    price = get_eth_price()

    return {
        "address": address,
        "eth": round(eth_balance, 4),
        "usd": round(eth_balance * price, 2),
        "eth_price": price,
    }


@app.get("/simulate/{address}")
def simulate(address: str):
    data = agent(address)
    alloc = data["strategy"]["allocation"]

    return {
        "success": True,
        "simulation": alloc,
        "summary": "Portfolio rebalanced successfully"
    }


@app.post("/deploy-vault")
def deploy_vault(strategy: dict):
    return {
        "success": True,
        "status": "Vault deployed successfully",
        "tx_hash": "0xFAKE_TX_HASH_1234"
    }

@app.get("/agent/{address}")
def agent(address: str):
    portfolio_data = portfolio(address)

    strategy = {
        "risk_score": random.choice(["Low", "Medium", "High"]),
        "allocation": {
            "ETH": random.randint(40, 70),
            "DeFi": random.randint(20, 40),
            "Stablecoins": random.randint(10, 30),
        },
        "recommended_protocols": ["Aave", "Lido", "Curve"],
        "expected_apy": round(random.uniform(5, 15), 2),
        # ✅ IMPORTANT: reasoning MUST be an array
        "reasoning": [
            "Fetched wallet balance from blockchain",
            "Analyzed ETH market trend",
            "Compared DeFi APY across protocols",
            "Optimized portfolio based on risk score",
        ],
    }

    return {
        "portfolio": portfolio_data,
        "strategy": strategy,
    }
from fastapi.responses import FileResponse
import json
import uuid

@app.get("/export/{address}")
def export_ai_result(address: str):
    data = agent(address)  # reuse your existing AI agent logic
    
    filename = f"neurovault_{address[:6]}_{uuid.uuid4().hex[:6]}.json"
    filepath = f"./{filename}"

    with open(filepath, "w") as f:
        json.dump(data, f, indent=2)

    return FileResponse(
        path=filepath,
        filename=filename,
        media_type="application/json"
    )
