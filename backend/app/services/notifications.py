import httpx
from app.config import settings

class NotificationService:
    async def send_slack_notification(self, webhook_url: str, topic: str, digest_summary: str, watch_id: str) -> bool:
        """Sends a notification to a Slack incoming webhook."""
        if not webhook_url:
            return False

        payload = {
            "text": f"🔔 *Noiseless Intelligence Alert* for topic *{topic}*\n\n{digest_summary}\n\n🔗 _View findings on the dashboard: /watches/{watch_id}_"
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(webhook_url, json=payload, timeout=10.0)
                if response.status_code != 200:
                    print(f"Failed to send Slack notification: status {response.status_code}, response: {response.text}")
                    return False
                return True
        except Exception as e:
            print(f"Error sending Slack notification: {e}")
            return False

    async def send_email_notification(self, recipient_email: str, topic: str, digest_summary: str) -> bool:
        """Sends an email notification via Brevo Transactional Email API."""
        if not recipient_email or not settings.BREVO_API_KEY:
            return False

        url = "https://api.brevo.com/v3/smtp/email"
        headers = {
            "api-key": settings.BREVO_API_KEY,
            "content-type": "application/json"
        }
        
        # Simple HTML styling matching our design palette
        html_content = f"""
        <html>
        <body style="font-family: sans-serif; background-color: #F4F4F5; padding: 24px; color: #18181B;">
            <div style="background-color: #FFFFFF; border: 1px solid #E4E4E7; border-radius: 6px; padding: 24px; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4F46E5; margin-top: 0;">Noiseless Intelligence Digest</h2>
                <p><strong>Topic:</strong> {topic}</p>
                <div style="border-top: 1px solid #E4E4E7; padding-top: 16px; margin-top: 16px; line-height: 1.6;">
                    {digest_summary.replace('\n', '<br>')}
                </div>
                <div style="margin-top: 24px; font-size: 12px; color: #71717A;">
                    This is an automated intelligence stream from your Noiseless Research Analyst.
                </div>
            </div>
        </body>
        </html>
        """

        payload = {
            "sender": {"name": "Noiseless Agent", "email": "agent@noiseless.ai"},
            "to": [{"email": recipient_email}],
            "subject": f"[Noiseless] Intelligence Digest: {topic}",
            "htmlContent": html_content
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(url, json=payload, headers=headers, timeout=10.0)
                if response.status_code not in (200, 201, 202):
                    print(f"Failed to send Brevo email: status {response.status_code}, response: {response.text}")
                    return False
                return True
        except Exception as e:
            print(f"Error sending Brevo email: {e}")
            return False

notification_service = NotificationService()
