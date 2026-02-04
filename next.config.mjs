import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  // Image optimization requires a Next.js server at runtime. Static export (e.g. GitHub Pages)
  // has no server, so optimization would 404. Pre-optimize assets (e.g. WebP, resizing) before
  // adding them to the repo if you want smaller/faster images.
  images: { unoptimized: true },
};

export default withMDX(config);
