from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq
from app.config import settings
from app.services.vector_store import vector_store_service

class DigestService:
    def __init__(self):
        self.llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            api_key=settings.GROQ_API_KEY,
            temperature=0.2
        )
        self.parser = StrOutputParser()
        
        self.prompt = PromptTemplate(
            template="""You are an intelligence research analyst producing a digest for a watch topic.
Topic: {topic}

Here is a list of recent findings related to this topic:
{context}

Generate a concise, analytical digest summary of these findings. 
Follow these rules strictly:
1. Cite specific sources by embedding their URL (exactly as provided in the findings list) inline as markdown links.
2. Ground all statements in the provided findings. Never invent facts or extrapolate beyond what is stated in the findings.
3. Organize into clear logical paragraphs. Highlight the key facts and relevance.
4. Keep the summary professional, data-dense, and objective.
""",
            input_variables=["topic", "context"]
        )

        self.chain = self.prompt | self.llm | self.parser

    async def generate_digest(self, topic: str, watch_id: str, query_vector: list[float]) -> str:
        """
        Retrieves top-10 related findings from Qdrant and generates a cited digest.
        """
        # Retrieve top 10 points
        points = vector_store_service.query_similarity(watch_id, query_vector, limit=10)
        
        context_parts = []
        for p in points:
            payload = p.payload or {}
            title = payload.get("title", "Untitled")
            content = payload.get("content", "")
            url = payload.get("url", "")
            context_parts.append(f"- Title: {title}\n  URL: {url}\n  Content: {content}\n")
            
        context_str = "\n".join(context_parts)
        
        if not context_str:
            return "No findings retrieved to compile a digest."
            
        # 1. Try Groq (Llama 3.3 70b)
        try:
            return await self.chain.ainvoke({
                "topic": topic,
                "context": context_str
            })
        except Exception as groq_err:
            print(f"Groq digest generation failed, attempting Gemini fallback: {groq_err}")

        # 2. Try Gemini 3.5 Flash Fallback
        if settings.GEMINI_API_KEY:
            try:
                import httpx
                prompt_text = f"""You are an intelligence research analyst producing a digest for a watch topic.
Topic: {topic}

Here is a list of recent findings related to this topic:
{context_str}

Generate a concise, analytical digest summary of these findings. 
Follow these rules strictly:
1. Cite specific sources by embedding their URL (exactly as provided in the findings list) inline as markdown links.
2. Ground all statements in the provided findings. Never invent facts or extrapolate beyond what is stated in the findings.
3. Organize into clear logical paragraphs. Highlight the key facts and relevance.
4. Keep the summary professional, data-dense, and objective.
"""
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={settings.GEMINI_API_KEY}"
                payload = {
                    "contents": [{"parts": [{"text": prompt_text}]}]
                }
                async with httpx.AsyncClient() as client:
                    res = await client.post(url, json=payload, timeout=20.0)
                    res.raise_for_status()
                    data = res.json()
                    return data["candidates"][0]["content"]["parts"][0]["text"]
            except Exception as gemini_err:
                print(f"Gemini digest fallback failed, attempting Mistral: {gemini_err}")

        # 3. Try Mistral Fallback
        if settings.MISTRAL_API_KEY:
            try:
                import httpx
                prompt_text = f"""You are an intelligence research analyst producing a digest for a watch topic.
Topic: {topic}

Here is a list of recent findings related to this topic:
{context_str}

Generate a concise, analytical digest summary of these findings. 
Follow these rules strictly:
1. Cite specific sources by embedding their URL (exactly as provided in the findings list) inline as markdown links.
2. Ground all statements in the provided findings. Never invent facts or extrapolate beyond what is stated in the findings.
3. Organize into clear logical paragraphs. Highlight the key facts and relevance.
4. Keep the summary professional, data-dense, and objective.
"""
                url = "https://api.mistral.ai/v1/chat/completions"
                headers = {
                    "Authorization": f"Bearer {settings.MISTRAL_API_KEY}",
                    "Content-Type": "application/json"
                }
                payload = {
                    "model": "open-mixtral-8x22b",
                    "messages": [{"role": "user", "content": prompt_text}]
                }
                async with httpx.AsyncClient() as client:
                    res = await client.post(url, headers=headers, json=payload, timeout=20.0)
                    res.raise_for_status()
                    data = res.json()
                    return data["choices"][0]["message"]["content"]
            except Exception as mistral_err:
                print(f"Mistral digest fallback failed: {mistral_err}")

        # Static default fallback
        return f"Digest of recent findings for {topic}. Refer to details in individual findings."

digest_service = DigestService()
