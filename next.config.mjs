import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Static export for GitHub Pages (set in deploy workflow)
  ...(process.env.OUTPUT_EXPORT === '1' && { output: 'export' }),
  async rewrites() {
    // Rewrites not supported with output: 'export'
    if (process.env.OUTPUT_EXPORT === '1') return [];
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*',
      },
    ];
  },
};

export default withMDX(config);
