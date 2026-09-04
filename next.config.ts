import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  distDir: "dist",
  output: "export",
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  // Type safety is enforced by `tsc --noEmit`; Node 26 currently breaks Next's
  // internal parsing of that command's config output during production builds.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
