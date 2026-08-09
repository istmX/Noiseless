import asyncio
from app.services.notifications import notification_service

async def main():
    recipient = "aryanuchia54@gmail.com"
    topic = "AI Regulatory Compliance"
    
    # The sample text they pasted in their prompt
    digest_summary = """The European Union's Artificial Intelligence (AI) Act has been a focal point of regulatory compliance efforts, with recent developments shedding light on its implications and implementation. According to the [EU AI Act](https://www.snowflake.com/en/artificial-intelligence/ai-governance/eu-ai-act), the regulation classifies AI systems by risk level and sets obligations for their development, deployment, and governance. The [European Commission](https://www.techpolicy.press/global-digital-policy-roundup-july-2026) has published guidelines on transparency obligations under Article 50 of the AI Act, clarifying disclosure requirements for AI systems that interact with users, generate synthetic content, or perform emotion recognition and biometric categorization.

The guidelines also explain compliance measures, applicable exemptions, enforcement penalties, and transitional timelines for certain generative AI systems. Furthermore, the [EU AI Act](https://www.jdsupra.com/legalnews/eu-ai-act-update-digital-omnibus-4840169) has undergone updates, with the Digital Omnibus finalizing eight compliance changes, including the expansion of the AI Office's supervision and enforcement powers. The [EU Digital Omnibus](https://www.jdsupra.com/legalnews/eu-ai-act-update-digital-omnibus-4840169) has also introduced new prohibited AI categories, such as systems that generate or manipulate realistic non-consensual intimate imagery/material.

In the context of AI applications in healthcare, the [World Health Organization (WHO)](https://healthpolicy-watch.news/artificial-intelligence-health) has launched joint strategic guidelines with other UN agencies, providing a roadmap for health innovators to navigate complex intellectual property, data governance, and regulatory pathways. Meanwhile, [Intuit](https://www.intuit.com/blog/innovative-thinking/tech-innovation/ai-principles-openai-anthropic-partnerships) has emphasized the importance of trust, privacy, and security in its AI-powered experiences, ensuring that customer data remains secure. Additionally, [AWS](https://www.google.com/goto?url=CAEStQEB7keqTcMGDL2MxyKXu2MtVpKEh0o_M_CWX-QVZvhnhQMFsDmfnzUX_-RnIWQ_fSaczovgQO_mokudQf8OcUAqcI1cDM1lg3RN89s6XiKD8TlcIVVFU9vae6k13-d3MWrkh3o2bnnJGVbE9Y4ZHFeak0PGScaT_KMRZy-1In_tuhNUpInT897SfBPZEuUQfghP92ncdIN5yICZzMA1iV6st_yVjh4QD-f8XqO84ywFZjT80PQT) has partnered with [Anthropic](https://www.google.com/goto?url=CAEStQEB7keqTcMGDL2MxyKXu2MtVpKEh0o_M_CWX-QVZvhnhQMFsDmfnzUX_-RnIWQ_fSaczovgQO_mokudQf8OcUAqcI1cDM1lg3RN89s6XiKD8TlcIVVFU9vae6k13-d3MWrkh3o2bnnJGVbE9Y4ZHFeak0PGScaT_KMRZy-1In_tuhNUpInT897SfBPZEuUQfghP92ncdIN5yICZzMA1iV6st_yVjh4QD-f8XqO84ywFZjT80PQT) and [OpenAI](https://www.google.com/goto?url=CAEStQEB7keqTcMGDL2MxyKXu2MtVpKEh0o_M_CWX-QVZvhnhQMFsDmfnzUX_-RnIWQ_fSaczovgQO_mokudQf8OcUAqcI1cDM1lg3RN89s6XiKD8TlcIVVFU9vae6k13-d3MWrkh3o2bnnJGVbE9Y4ZHFeak0PGScaT_KMRZy-1In_tuhNUpInT897SfBPZEuUQfghP92ncdIN5yICZzMA1iV6st_yVjh4QD-f8XqO84ywFZjT80PQT) to bring AI-powered security tools to developers, highlighting the growing importance of AI in various industries.

The [EU AI Act](https://www.pymnts.com/news/artificial-intelligence/2026/eu-ai-act-transparency-rules-put-financial-institutions-on-compliance-front-line) also has significant implications for financial institutions, which will face broader governance obligations when deploying high-risk AI systems. These obligations include implementing human oversight mechanisms, maintaining system logs, and reporting serious incidents to regulators. As [OpenAI](https://www.wealthmanagement.com/artificial-intelligence/openai-anthropic-launch-separate-joint-venture-pe-partnerships) and [Anthropic](https://www.wealthmanagement.com/artificial-intelligence/openai-anthropic-launch-separate-joint-venture-pe-partnerships) continue to raise funds and form partnerships to expand their AI capabilities, the regulatory landscape will likely remain a key focus area for these companies and their stakeholders."""

    success = await notification_service.send_email_notification(
        recipient_email=recipient,
        topic=topic,
        digest_summary=digest_summary,
        watch_id="cmsl6olcu0000r167frcv664v"
    )
    print(f"Sample compliance email sent to {recipient}: {success}")

if __name__ == "__main__":
    asyncio.run(main())
