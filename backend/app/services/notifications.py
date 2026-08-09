import httpx
from datetime import datetime, timezone
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

    async def send_email_notification(self, recipient_email: str, topic: str, digest_summary: str, watch_id: str = None) -> bool:
        """Sends an email notification via Brevo Transactional Email API with premium report formatting."""
        if not recipient_email or not settings.BREVO_API_KEY:
            return False

        # Clean up markdown syntax to styled HTML
        import re
        
        # 1. Parse Links: [Text](URL) -> Styled Anchor
        link_style = "color: #166534; text-decoration: none; font-weight: 600; border-bottom: 1.5px solid #bbf7d0;"
        html_summary = re.sub(
            r'\[([^\]]+)\]\(([^)]+)\)',
            f'<a href="\\2" target="_blank" style="{link_style}">\\1</a>',
            digest_summary
        )
        
        # 2. Parse Bold: **Text** -> <strong>Text</strong>
        html_summary = re.sub(
            r'\*\*([^*]+)\*\*',
            r'<strong style="color: #0f172a; font-weight: 700;">\1</strong>',
            html_summary
        )
        
        # 3. Format Paragraphs: Split double newlines and wrap in styled paragraphs
        paragraphs = html_summary.split('\n\n')
        formatted_paragraphs = []
        for p in paragraphs:
            p = p.strip()
            if p:
                p_html = p.replace('\n', '<br>')
                formatted_paragraphs.append(
                    f'<p style="margin-top: 0; margin-bottom: 18px; font-size: 15px; color: #334155; line-height: 1.7; text-align: justify;">{p_html}</p>'
                )
        
        parsed_content = "\n".join(formatted_paragraphs)
        current_date = datetime.now(timezone.utc).strftime("%B %d, %Y")

        # Action panel markup
        action_html = ""
        if watch_id:
            action_html = f"""
            <!-- CTA / Action Section -->
            <div style="padding: 0 32px 32px 32px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                <a href="{settings.FRONTEND_URL}/watches/{watch_id}" target="_blank" style="display: inline-block; background-color: #16a34a; color: #ffffff; font-weight: 600; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 6px; box-shadow: 0 2px 4px 0 rgba(22, 163, 74, 0.2);">
                    Open Watch Workstation
                </a>
                <p style="margin: 16px 0 0 0; font-size: 12px; color: #64748b;">
                    Want to edit settings or stop alerts? <a href="{settings.FRONTEND_URL}/watches/{watch_id}" target="_blank" style="color: #16a34a; font-weight: 600; text-decoration: none;">Pause monitoring</a> or update configuration.
                </p>
            </div>
            """

        # Premium HTML report layout matching Forest Green branding
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>[Noiseless] Intelligence Digest: {topic}</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; padding: 32px 16px; margin: 0; color: #0f172a; -webkit-font-smoothing: antialiased;">
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-top: 5px solid #16a34a; border-radius: 12px; max-width: 650px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);">
                
                <!-- Header Section -->
                <div style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #f1f5f9;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #16a34a; background-color: #f0fdf4; padding: 4px 10px; border-radius: 9999px;">
                            Intelligence Brief
                        </span>
                        <span style="font-size: 12px; color: #64748b; font-weight: 500;">
                            {current_date}
                        </span>
                    </div>
                    <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; letter-spacing: -0.02em; line-height: 1.2;">
                        Noiseless Intelligence Digest
                    </h1>
                    <p style="margin: 0; font-size: 14px; color: #64748b; font-weight: 500;">
                        Topic Focus: <span style="color: #0f172a; font-weight: 600;">{topic}</span>
                    </p>
                </div>

                <!-- Report Content -->
                <div style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #f1f5f9;">
                    {parsed_content}
                </div>

                <!-- Action Button Block -->
                {action_html}

                <!-- Footer Section -->
                <div style="padding: 24px 32px; background-color: #f8fafc; text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #475569; letter-spacing: 0.05em; text-transform: uppercase;">
                        Noiseless Research Analyst
                    </p>
                    <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.5;">
                        This is an automated intelligence stream. To manage your watches, configuration parameters, or notification settings, please visit your dashboard.
                    </p>
                </div>
            </div>
        </body>
        </html>
        """

        url = "https://api.brevo.com/v3/smtp/email"
        headers = {
            "api-key": settings.BREVO_API_KEY,
            "content-type": "application/json"
        }
        
        payload = {
            "sender": {"name": "Noiseless Agent", "email": settings.BREVO_SENDER_EMAIL},
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

    async def send_token_depletion_alert(self, recipient_email: str, webhook_url: str, topic: str, watch_id: str) -> bool:
        """Sends an alert to email and Slack when a watch run is blocked due to depleted tokens."""
        email_sent = True
        slack_sent = True

        if webhook_url:
            payload = {
                "text": f"⚠️ *Noiseless Watch Blocked* for topic *{topic}*\n\nYour watch run was blocked because your token balance is depleted (less than 10 tokens remaining). Please upgrade your plan or top up your tokens on the settings page.\n\n🔗 _Update billing: /settings_"
            }
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.post(webhook_url, json=payload, timeout=10.0)
                    if response.status_code != 200:
                        print(f"Failed to send Slack depletion alert: status {response.status_code}")
                        slack_sent = False
            except Exception as e:
                print(f"Error sending Slack depletion alert: {e}")
                slack_sent = False

        if recipient_email and settings.BREVO_API_KEY:
            url = "https://api.brevo.com/v3/smtp/email"
            headers = {
                "api-key": settings.BREVO_API_KEY,
                "content-type": "application/json"
            }
            html_content = f"""
            <html>
            <body style="font-family: sans-serif; background-color: #F4F4F5; padding: 24px; color: #18181B;">
                <div style="background-color: #FFFFFF; border: 1px solid #E4E4E7; border-radius: 6px; padding: 24px; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #DC2626; margin-top: 0;">Noiseless Watch Blocked: Depleted Tokens</h2>
                    <p><strong>Topic:</strong> {topic}</p>
                    <div style="border-top: 1px solid #E4E4E7; padding-top: 16px; margin-top: 16px; line-height: 1.6;">
                        Your watch run has been blocked because your token balance is depleted. You must have at least 10 tokens to execute a watch run.
                    </div>
                    <div style="margin-top: 24px; font-size: 12px; color: #71717A;">
                        Please visit the settings page on your Noiseless dashboard to purchase additional tokens or upgrade your subscription.
                    </div>
                </div>
            </body>
            </html>
            """
            payload = {
                "sender": {"name": "Noiseless Agent", "email": settings.BREVO_SENDER_EMAIL},
                "to": [{"email": recipient_email}],
                "subject": f"[Noiseless] Action Required: Watch Blocked for {topic}",
                "htmlContent": html_content
            }
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.post(url, json=payload, headers=headers, timeout=10.0)
                    if response.status_code not in (200, 201, 202):
                        print(f"Failed to send Brevo depletion email: status {response.status_code}")
                        email_sent = False
            except Exception as e:
                print(f"Error sending Brevo depletion email: {e}")
                email_sent = False

        return email_sent or slack_sent

notification_service = NotificationService()

