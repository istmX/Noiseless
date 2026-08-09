from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_groq import ChatGroq
from pydantic import BaseModel, Field
from app.config import settings

class SignificanceResult(BaseModel):
    score: int = Field(description="Significance score from 1 to 10")
    category: str = Field(description="Categorization of the finding, e.g. Competitor Launch, Earnings, Personnel Change, Product Update, General News")
    key_fact: str = Field(description="One concrete new fact extracted from the text")

class LLMScoringService:
    def __init__(self):
        self.llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            api_key=settings.GROQ_API_KEY,
            temperature=0.1
        )
        self.parser = JsonOutputParser(pydantic_object=SignificanceResult)
        
        self.prompt = PromptTemplate(
            template="""You are an expert research analyst. Evaluate the significance of the following web search finding for a watch topic.
Topic: {topic}
Title: {title}
Content Snippet: {content}

{format_instructions}

Provide a significance score (1 to 10):
- 1-3: Low significance, noise, generic blog posts, non-material updates.
- 4-6: Medium significance, incremental product updates, general industry shifts, minor competitor activities.
- 7-10: High significance, major news, earnings announcements, landmark product launches, key personnel changes, critical market events.
""",
            input_variables=["topic", "title", "content"],
            partial_variables={"format_instructions": self.parser.get_format_instructions()}
        )

        self.chain = self.prompt | self.llm | self.parser

    async def score_finding(self, topic: str, title: str, content: str) -> dict:
        """Scores a finding based on the watch topic."""
        import httpx
        import json

        format_instructions = self.parser.get_format_instructions()
        prompt_text = f"""You are an expert research analyst. Evaluate the significance of the following web search finding for a watch topic.
Topic: {topic}
Title: {title}
Content Snippet: {content}

{format_instructions}

Provide a significance score (1 to 10):
- 1-3: Low significance, noise, generic blog posts, non-material updates.
- 4-6: Medium significance, incremental product updates, general industry shifts, minor competitor activities.
- 7-10: High significance, major news, earnings announcements, landmark product launches, key personnel changes, critical market events.
"""

        # 1. Try Groq (Llama 3.3 70b)
        try:
            result = await self.chain.ainvoke({
                "topic": topic,
                "title": title,
                "content": content
            })
            return {
                "score": int(result.get("score", 1)),
                "category": str(result.get("category", "General News")),
                "keyFact": str(result.get("key_fact", ""))
            }
        except Exception as groq_err:
            print(f"Groq scoring failed, attempting Gemini fallback: {groq_err}")

        # 2. Try Gemini 1.5 Flash Fallback
        if settings.GEMINI_API_KEY:
            try:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={settings.GEMINI_API_KEY}"
                payload = {
                    "contents": [{"parts": [{"text": prompt_text}]}],
                    "generationConfig": {
                        "responseMimeType": "application/json"
                    }
                }
                async with httpx.AsyncClient() as client:
                    res = await client.post(url, json=payload, timeout=15.0)
                    res.raise_for_status()
                    data = res.json()
                    text_content = data["candidates"][0]["content"]["parts"][0]["text"]
                    parsed = json.loads(text_content)
                    return {
                        "score": int(parsed.get("score", 1)),
                        "category": str(parsed.get("category", "General News")),
                        "keyFact": str(parsed.get("key_fact", parsed.get("keyFact", "")))
                    }
            except Exception as gemini_err:
                print(f"Gemini scoring fallback failed, attempting Mistral: {gemini_err}")

        # 3. Try Mistral Fallback
        if settings.MISTRAL_API_KEY:
            try:
                url = "https://api.mistral.ai/v1/chat/completions"
                headers = {
                    "Authorization": f"Bearer {settings.MISTRAL_API_KEY}",
                    "Content-Type": "application/json"
                }
                payload = {
                    "model": "open-mixtral-8x22b",
                    "messages": [{"role": "user", "content": prompt_text}],
                    "response_format": {"type": "json_object"}
                }
                async with httpx.AsyncClient() as client:
                    res = await client.post(url, headers=headers, json=payload, timeout=15.0)
                    res.raise_for_status()
                    data = res.json()
                    text_content = data["choices"][0]["message"]["content"]
                    parsed = json.loads(text_content)
                    return {
                        "score": int(parsed.get("score", 1)),
                        "category": str(parsed.get("category", "General News")),
                        "keyFact": str(parsed.get("key_fact", parsed.get("keyFact", "")))
                    }
            except Exception as mistral_err:
                print(f"Mistral scoring fallback failed: {mistral_err}")

        # Static default fallback
        return {
            "score": 1,
            "category": "General News",
            "keyFact": title
        }

llm_scoring_service = LLMScoringService()
