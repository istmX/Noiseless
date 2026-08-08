import uuid
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from app.config import settings

class VectorStoreService:
    def __init__(self):
        self.client = QdrantClient(
            url=settings.QDRANT_URL,
            api_key=settings.QDRANT_API_KEY
        )

    def _get_collection_name(self, watch_id: str) -> str:
        # standard collection namespacing
        return f"watch_{watch_id.replace('-', '_')}"

    def ensure_collection(self, watch_id: str):
        """Creates the collection if it does not already exist."""
        collection_name = self._get_collection_name(watch_id)
        if not self.client.collection_exists(collection_name):
            self.client.create_collection(
                collection_name=collection_name,
                vectors_config=VectorParams(size=768, distance=Distance.COSINE)
            )

    def query_similarity(self, watch_id: str, query_vector: list[float], limit: int = 5) -> list:
        """Queries the watch collection for the nearest neighbors to a query vector."""
        collection_name = self._get_collection_name(watch_id)
        self.ensure_collection(watch_id)
        
        response = self.client.query_points(
            collection_name=collection_name,
            query=query_vector,
            limit=limit
        )
        return response.points

    def upsert_finding(self, watch_id: str, finding_id: str, vector: list[float], payload: dict):
        """Upserts a finding embedding and payload to the watch collection."""
        collection_name = self._get_collection_name(watch_id)
        self.ensure_collection(watch_id)

        self.client.upsert(
            collection_name=collection_name,
            points=[
                PointStruct(
                    id=finding_id,
                    vector=vector,
                    payload=payload
                )
            ]
        )

    def delete_collection(self, watch_id: str):
        """Deletes the watch collection."""
        collection_name = self._get_collection_name(watch_id)
        if self.client.collection_exists(collection_name):
            self.client.delete_collection(collection_name)

vector_store_service = VectorStoreService()
