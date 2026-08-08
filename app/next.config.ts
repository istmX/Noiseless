import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "sturdy-disco-7v4wrq6wvwr5fpjw9-3000.app.github.dev",
        "sturdy-disco-7v4wrq6wvwr5fpjw9-8000.app.github.dev",
        "localhost:3000"
      ],
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: "http://localhost:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
