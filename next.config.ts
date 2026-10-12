import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost:8000'],
  async redirects() {
    return [{
      source: "/ziq/api/:path*",
      destination: "/api/backend/:path*",
      permanent: false,
    }];
  },
  async rewrites() {
    const apiOrigin = process.env.DJANGO_API_ORIGIN ?? "http://127.0.0.1:8000";
    return [{
      source: "/api/backend/:path*",
      destination: `${apiOrigin}/api/v1/:path*/`,
    }];
  },
};

export default nextConfig;
