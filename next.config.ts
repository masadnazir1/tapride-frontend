import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol:
          (process.env.NEXT_PUBLIC_IMAGE_PROTOCOL as "http" | "https") ||
          "http",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOST || "localhost",
        port: process.env.NEXT_PUBLIC_IMAGE_PORT || "3000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
