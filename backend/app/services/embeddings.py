import hashlib
import asyncio

class EmbeddingService:
    def get_embedding(self, text: str) -> list[float]:
        """
        Generates a deterministic 768-dimensional float vector based on SHA-256 hashes.
        This provides offline, fast vector representation for deduplication and testing
        without PyTorch or external API key restrictions.
        """
        vector = []
        # Generate 768 floats deterministically
        for i in range(768):
            h = hashlib.sha256(f"{text}_{i}".encode("utf-8")).hexdigest()
            # Convert first 8 hex characters to a float normalized between -1.0 and 1.0
            val = (int(h[:8], 16) / 4294967295.0) * 2.0 - 1.0
            vector.append(val)
        return vector

    async def get_embedding_async(self, text: str) -> list[float]:
        """Generates embedding vector asynchronously."""
        return await asyncio.to_thread(self.get_embedding, text)

# Global instance initialized on module load
embedding_service = EmbeddingService()
