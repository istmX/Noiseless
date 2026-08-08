import asyncio
import httpx
from app.config import settings

async def test_slack():
    webhook_url = settings.SLACK_WEBHOOK_URL
    if "dummy" in webhook_url:
        print("Error: The SLACK_WEBHOOK_URL in backend/.env is still a dummy placeholder.")
        return
        
    print(f"Sending test notification to: {webhook_url}")
    payload = {
        "text": "🚀 *Noiseless Intelligence Agent Test*\nYour Slack incoming webhook is successfully configured and connected to the Noiseless backend!"
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(webhook_url, json=payload, timeout=10.0)
            if response.status_code == 200:
                print("Success! Check your Slack channel for the test alert.")
            else:
                print(f"Failed to send notification: status {response.status_code}, response: {response.text}")
    except Exception as e:
        print(f"Connection error: {e}")

if __name__ == "__main__":
    asyncio.run(test_slack())
