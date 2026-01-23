from apscheduler.schedulers.background import BackgroundScheduler
from ai_agent import defi_agent

scheduler = BackgroundScheduler()

def run_agent():
    print("NeuroVault Agent Running...")

scheduler.add_job(run_agent, "interval", hours=6)
scheduler.start()
