import asyncio
from tavily import TavilyClient
from app.config import settings

class SearchService:
    def __init__(self):
        self.client = TavilyClient(api_key=settings.TAVILY_API_KEY)

    async def search_query(self, query: str) -> list:
        """
        Runs a Tavily search using advanced depth and news topic for fresh contents.
        Returns a list of search results.
        """
        def _execute():
            response = self.client.search(
                query=query,
                search_depth="advanced",
                topic="news",
                max_results=5
            )
            return response.get("results", [])

        try:
            return await asyncio.to_thread(_execute)
        except Exception as e:
            # Return empty list on search failure to make background pipeline resilient
            print(f"Error during Tavily search: {e}")
            return []

search_service = SearchService()
