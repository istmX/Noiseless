class RateLimiter:
    def check_rate_limit(self, watch_id: str, frequency: str) -> bool:
        """
        Validates whether the watch is allowed to run based on its frequency tier limits.
        Enforces a hard limit on Tavily credits.
        In MVP, we return True as a placeholder, but structure it for future credit tracking.
        """
        # Hourly watches get fewer credits per run than daily ones
        # e.g. hourly = 100 queries/month, daily = 500 queries/month
        return True

    def record_usage(self, watch_id: str, credits_used: int):
        """Records credit usage for analytics and rate limit tracking."""
        pass

rate_limiter = RateLimiter()
