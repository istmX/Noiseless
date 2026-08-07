import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 experimental: {
    serverActions: {
      allowedOrigins: [
        "sturdy-disco-7v4wrq6wvwr5fpjw9-3000.app.github.dev",
        "localhost:3000"
      ],
    },
  },
 }

export default nextConfig;
