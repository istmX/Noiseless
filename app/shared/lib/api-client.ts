import { auth } from "@/shared/lib/auth";

const API_BASE_URL = process.env.BACKEND_API_URL || "http://localhost:8000";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  meta?: Record<string, unknown>;
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const session = await auth();
  
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  
  if (session?.user?.id) {
    // In a real implementation, we'd pass a proper token.
    // For now, pass user ID to let FastAPI know who is acting.
    headers.set("X-User-Id", session.user.id);
  }

  const baseUrl = API_BASE_URL.replace(/\/$/, "");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  try {
    const res = await fetch(`${baseUrl}${cleanEndpoint}`, {
      ...options,
      headers,
    });
    
    if (!res.ok) {
      // If the backend returns a structured error, use it.
      const errBody = await res.json().catch(() => ({}));
      return { error: errBody.detail || errBody.error || `Error ${res.status}: ${res.statusText}` };
    }
    
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message || "Unknown error occurred" };
    }
    return { error: "Unknown error occurred" };
  }
}
