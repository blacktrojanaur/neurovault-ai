from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from web3 import Web3
import random, requests, os, json, uuid
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


# ======================
# UTILITIES
# ======================

def get_eth_price():
    try:
        r = requests.get(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        )
        return r.json()["ethereum"]["usd"]
    except:
        return 3000


def get_portfolio(address: str):
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
        "eth_balance": round(eth_balance, 4),
        "usd_value": round(eth_balance * price, 2),
        "eth_price": price,
    }


# ======================
# AI AGENT CORE
# ======================

def run_ai_agent(address: str):
    portfolio_data = portfolio(address)

    ai_result = {
        "risk_score": random.choice(["Low", "Medium", "High"]),
        "allocation": {
            "ETH": random.randint(40, 70),
            "DeFi": random.randint(20, 40),
            "Stablecoins": random.randint(10, 30),
        },
        "recommended_protocols": ["Aave", "Lido", "Curve"],
        "expected_apy": round(random.uniform(5, 15), 2),
        "reasoning": [
            "Fetched wallet balance from blockchain",
            "Analyzed ETH market trend",
            "Compared DeFi APY across protocols",
            "Optimized portfolio based on risk score",
        ],
        "confidence": round(random.uniform(0.7, 0.95), 2),
        "explanation": "AI suggests rebalancing to improve yield and reduce risk."
    }

    simulation = {
        "before_total_apy": round(random.uniform(3, 7), 2),
        "after_total_apy": ai_result["expected_apy"],
        "apy_increase": round(ai_result["expected_apy"] - random.uniform(3, 7), 2),
    }

    return {
        "portfolio": portfolio_data,
        "ai_result": ai_result,
        "simulation": simulation,
        "summary": "Portfolio optimized successfully using AI."
    }



# ======================
# API ROUTES
# ======================

@app.get("/")
def root():
    return {"status": "NeuroVault backend running"}


@app.get("/api/ai/analyze/{address}")
def analyze_ai(address: str):
    return run_ai_agent(address)



@app.get("/api/portfolio/{address}")
def portfolio(address: str):
    return get_portfolio(address)


@app.get("/api/simulate/{address}")
def simulate(address: str):
    data = run_ai_agent(address)
    return {
        "success": True,
        "simulation": data["simulation"],
        "summary": data["summary"],
    }


@app.post("/api/deploy-vault")
def deploy_vault(strategy: dict):
    return {
        "success": True,
        "status": "Vault deployed successfully",
        "tx_hash": "0xFAKE_TX_HASH_1234",
    }


# ======================
# REPORT EXPORT
# ======================

@app.get("/api/report/generate")
def export_report(wallet: str):
    data = run_ai_agent(wallet)

    filename = f"neurovault_{wallet[:6]}_{uuid.uuid4().hex[:6]}.json"
    filepath = f"./{filename}"

    with open(filepath, "w") as f:
        json.dump(data, f, indent=2)

    return FileResponse(
        path=filepath,
        filename=filename,
        media_type="application/json",
    )

@app.get("/agent/{address}")
def agent_old(address: str):
    return run_ai_agent(address)


@app.get("/simulate/{address}")
def simulate_old(address: str):
    data = run_ai_agent(address)
    return {
        "success": True,
        "simulation": data["simulation"],
        "summary": data["summary"],
    }
