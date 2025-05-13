import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // basePath: '/',
  assetPrefix: '/public',
  trailingSlash: true, // Optional but helps with static exports and routing
  reactStrictMode: true,
};

export default withMDX(config);
