import asyncio
import httpx
from app.config import settings

async def main():
    url = "https://api.brevo.com/v3/senders"
    headers = {
        "api-key": settings.BREVO_API_KEY,
        "content-type": "application/json"
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        print(f"Status Code: {response.status_code}")
        print("Response Body:")
        print(response.json())

if __name__ == "__main__":
    asyncio.run(main())
