import time
from backend.main import agent

def autonomous_loop(address):
    while True:
        print("Running autonomous AI cycle...")
        result = agent(address)
        print(result)
        time.sleep(3600)  # every hour
