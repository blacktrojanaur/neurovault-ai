from groq import Groq
import os

GROQ_API_KEY = "YOUR_GROQ_API_KEY"
client = Groq(api_key=GROQ_API_KEY)

def defi_agent(portfolio, market_data):
    prompt = f"""
    You are an autonomous DeFi investment agent.

    Portfolio: {portfolio}
    Market Data: {market_data}

    Tasks:
    1. Analyze risk level.
    2. Suggest optimal allocation.
    3. Suggest DeFi protocols (Aave, Lido, Curve, Compound).
    4. Output strategy in JSON.

    Respond only in JSON format.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content
