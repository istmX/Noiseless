import asyncio
from app.services.notifications import notification_service
from app.config import settings

async def main():
    print(f"Brevo API Key: {settings.BREVO_API_KEY[:10]}...")
    recipient = "aryanuchia54@gmail.com"
    success = await notification_service.send_email_notification(
        recipient_email=recipient,
        topic="Test Topic",
        digest_summary="This is a test notification from Noiseless."
    )
    print(f"Email sent status to {recipient}: {success}")

if __name__ == "__main__":
    asyncio.run(main())
