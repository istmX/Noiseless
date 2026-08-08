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
        try:
            result = await self.chain.ainvoke({
                "topic": topic,
                "title": title,
                "content": content
            })
            # Ensure correct keys or default values if parser outputs something else
            return {
                "score": int(result.get("score", 1)),
                "category": str(result.get("category", "General News")),
                "keyFact": str(result.get("key_fact", ""))
            }
        except Exception as e:
            print(f"Error during LLM scoring: {e}")
            # Resilient fallback to avoid stopping pipeline
            return {
                "score": 1,
                "category": "General News",
                "keyFact": title
            }

llm_scoring_service = LLMScoringService()
