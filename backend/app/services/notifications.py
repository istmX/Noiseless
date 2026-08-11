import httpx
from datetime import datetime, timezone
from app.config import settings

# Production frontend URL used in all email links and Slack messages
FRONTEND_URL = "https://noiseless-gold.vercel.app"

# Theme palette matched to globals.css
THEME = {
    "canvas":        "#fff3e8",
    "surface":       "#fffaf4",
    "surface_inset": "#fbe0cc",
    "ink":           "#11100f",
    "ink_body":      "#4d3327",
    "ink_muted":     "#76594a",
    "ink_faint":     "#987566",
    "hairline":      "#e3b08e",
    "accent":        "#cb5e2c",
    "accent_soft":   "#fde0cc",
    "on_accent":     "#fff3e8",
    "success":       "#38724d",
    "success_soft":  "#e4f0e2",
    "danger":        "#b74436",
    "danger_soft":   "#f9ded8",
}

class NotificationService:
    async def send_slack_notification(self, webhook_url: str, topic: str, digest_summary: str, watch_id: str) -> bool:
        """Sends a notification to a Slack incoming webhook."""
        if not webhook_url:
            return False

        watch_url = f"{FRONTEND_URL}/watches/{watch_id}"
        payload = {
            "text": (
                f"*Noiseless Intelligence Alert* for *{topic}*\n\n"
                f"{digest_summary}\n\n"
                f"View findings: {watch_url}"
            )
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(webhook_url, json=payload, timeout=10.0)
                if response.status_code != 200:
                    print(f"[notifications] Slack send failed: status {response.status_code}, body: {response.text}")
                    return False
                return True
        except Exception as e:
            print(f"[notifications] Slack send error: {e}")
            return False

    async def send_email_notification(self, recipient_email: str, topic: str, digest_summary: str, watch_id: str = None) -> bool:
        """Sends an email notification via Brevo Transactional Email API with premium report formatting."""
        if not recipient_email or not settings.BREVO_API_KEY:
            return False

        
        import re
        
        # 1. Parse Links: [Text](URL) -> Styled Anchor
        link_style = (
            f"color: {THEME['accent']}; text-decoration: none; "
            f"font-weight: 600; border-bottom: 1.5px solid {THEME['accent_soft']};"
        )
        html_summary = re.sub(
            r'\[([^\]]+)\]\(([^)]+)\)',
            f'<a href="\\2" target="_blank" style="{link_style}">\\1</a>',
            digest_summary
        )
        
        # 2. Parse Bold: **Text** -> <strong>Text</strong>
        html_summary = re.sub(
            r'\*\*([^*]+)\*\*',
            f'<strong style="color: {THEME["ink"]}; font-weight: 700;">\\1</strong>',
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
                    f'<p style="margin-top: 0; margin-bottom: 18px; font-size: 15px; '
                    f'color: {THEME["ink_body"]}; line-height: 1.75;">{p_html}</p>'
                )
        
        parsed_content = "\n".join(formatted_paragraphs)
        current_date = datetime.now(timezone.utc).strftime("%B %d, %Y")

        # Action panel markup
        action_html = ""
        if watch_id:
            watch_url = f"{FRONTEND_URL}/watches/{watch_id}"
            action_html = f"""
            <div style="padding: 0 32px 32px 32px; text-align: center; border-bottom: 1px solid {THEME['hairline']};">
                <a href="{watch_url}" target="_blank"
                   style="display: inline-block; background-color: {THEME['accent']}; color: {THEME['on_accent']};
                          font-weight: 700; font-size: 14px; text-decoration: none;
                          padding: 13px 28px; border-radius: 6px; letter-spacing: 0.03em;">
                    Open Watch Workstation
                </a>
                <p style="margin: 16px 0 0 0; font-size: 12px; color: {THEME['ink_faint']};">
                    Want to pause or edit?
                    <a href="{watch_url}" target="_blank"
                       style="color: {THEME['accent']}; font-weight: 600; text-decoration: none;">
                        Manage this watch
                    </a>
                </p>
            </div>
            """

        html_content = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Noiseless] Intelligence Digest: {topic}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
             background-color: {THEME['canvas']}; padding: 32px 16px; margin: 0;
             color: {THEME['ink']}; -webkit-font-smoothing: antialiased;">
    <div style="background-color: {THEME['surface']}; border: 1px solid {THEME['hairline']};
                border-top: 4px solid {THEME['accent']}; border-radius: 12px;
                max-width: 650px; margin: 0 auto; overflow: hidden;">
        <!-- Header -->
        <div style="padding: 32px 32px 24px 32px; border-bottom: 1px solid {THEME['hairline']};">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                <span style="font-size: 10px; font-weight: 700; text-transform: uppercase;
                             letter-spacing: 0.12em; color: {THEME['accent']};
                             background-color: {THEME['accent_soft']}; padding: 4px 10px; border-radius: 9999px;">
                    Intelligence Brief
                </span>
                <span style="font-size: 12px; color: {THEME['ink_faint']}; font-weight: 500;">
                    {current_date}
                </span>
            </div>
            <h1 style="font-size: 24px; font-weight: 800; color: {THEME['ink']};
                       margin: 0 0 8px 0; letter-spacing: -0.02em; line-height: 1.2;">
                Noiseless Intelligence Digest
            </h1>
            <p style="margin: 0; font-size: 14px; color: {THEME['ink_muted']}; font-weight: 500;">
                Topic Focus: <span style="color: {THEME['ink']}; font-weight: 700;">{topic}</span>
            </p>
        </div>
        <!-- Digest content -->
        <div style="padding: 32px 32px 24px 32px; border-bottom: 1px solid {THEME['hairline']};">
            {parsed_content}
        </div>
        <!-- CTA -->
        {action_html}
        <!-- Footer -->
        <div style="padding: 24px 32px; background-color: {THEME['surface_inset']}; text-align: center;">
            <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700;
                      color: {THEME['ink_body']}; letter-spacing: 0.08em; text-transform: uppercase;">
                Noiseless Research Analyst
            </p>
            <p style="margin: 0; font-size: 11px; color: {THEME['ink_faint']}; line-height: 1.6;">
                This is an automated intelligence stream. To manage your watches or notification settings,
                visit your <a href="{FRONTEND_URL}/watches" style="color: {THEME['accent']}; text-decoration: none; font-weight: 600;">dashboard</a>.
            </p>
        </div>
    </div>
</body>
</html>"""

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
                    print(f"[notifications] Brevo email failed: status {response.status_code}, body: {response.text}")
                    return False
                return True
        except Exception as e:
            print(f"[notifications] Brevo email error: {e}")
            return False

    async def send_token_depletion_alert(self, recipient_email: str, webhook_url: str, topic: str, watch_id: str, required_tokens: int = 10) -> bool:
        """Sends an alert to email and Slack when a watch run is blocked due to depleted tokens."""
        email_sent = True
        slack_sent = True

        if webhook_url:
            billing_url = f"{FRONTEND_URL}/settings/billing"
            payload = {
                "text": (
                    f"*Noiseless Watch Blocked* for *{topic}*\n\n"
                    f"Token balance depleted (fewer than {required_tokens} tokens). "
                    f"Upgrade your plan to resume monitoring.\n\n"
                    f"Billing: {billing_url}"
                )
            }
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.post(webhook_url, json=payload, timeout=10.0)
                    if response.status_code != 200:
                        print(f"[notifications] Slack depletion alert failed: status {response.status_code}")
                        slack_sent = False
            except Exception as e:
                print(f"[notifications] Slack depletion alert error: {e}")
                slack_sent = False

        if recipient_email and settings.BREVO_API_KEY:
            url = "https://api.brevo.com/v3/smtp/email"
            headers = {
                "api-key": settings.BREVO_API_KEY,
                "content-type": "application/json"
            }
            billing_url = f"{FRONTEND_URL}/settings/billing"
            html_content = f"""<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
             background-color: {THEME['canvas']}; padding: 32px 16px; margin: 0; color: {THEME['ink']};">
    <div style="background-color: {THEME['surface']}; border: 1px solid {THEME['hairline']};
                border-top: 4px solid {THEME['danger']}; border-radius: 12px;
                max-width: 600px; margin: 0 auto; overflow: hidden;">
        <div style="padding: 32px 32px 24px 32px; border-bottom: 1px solid {THEME['hairline']};">
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;
                         color: {THEME['danger']}; background-color: {THEME['danger_soft']};
                         padding: 4px 10px; border-radius: 9999px;">Action Required</span>
            <h1 style="font-size: 20px; font-weight: 800; color: {THEME['ink']}; margin: 16px 0 8px 0;">
                Watch Blocked: Tokens Depleted
            </h1>
            <p style="margin: 0; font-size: 14px; color: {THEME['ink_muted']};">
                Topic: <strong style="color: {THEME['ink']};">{topic}</strong>
            </p>
        </div>
        <div style="padding: 28px 32px; border-bottom: 1px solid {THEME['hairline']};">
            <p style="margin: 0 0 16px 0; font-size: 15px; color: {THEME['ink_body']}; line-height: 1.7;">
                Your watch run was blocked because your token balance fell below the minimum
                ({required_tokens} tokens). Monitoring has been paused.
            </p>
        </div>
        <div style="padding: 24px 32px; text-align: center;">
            <a href="{billing_url}" target="_blank"
               style="display: inline-block; background-color: {THEME['accent']}; color: {THEME['on_accent']};
                      font-weight: 700; font-size: 14px; text-decoration: none;
                      padding: 13px 28px; border-radius: 6px; letter-spacing: 0.03em;">
                Upgrade Plan
            </a>
        </div>
    </div>
</body>
</html>"""
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
                        print(f"[notifications] Brevo depletion email failed: status {response.status_code}")
                        email_sent = False
            except Exception as e:
                print(f"[notifications] Brevo depletion email error: {e}")
                email_sent = False

        return email_sent or slack_sent

notification_service = NotificationService()

