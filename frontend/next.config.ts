import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@minerva/core"],
  images: { unoptimized: true },
};

export default nextConfig;
