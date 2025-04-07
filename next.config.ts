import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  // Note: Using the Rust compiler means we cannot use
  // rehype or remark plugins. For my app, this is fine.
  // It might speed up compile time.
  experimental: {
    mdxRs: true,
    viewTransition: true
  }
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
