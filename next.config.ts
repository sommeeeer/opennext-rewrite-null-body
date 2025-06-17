import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [{ source: '/src', destination: `http://localhost:4000` }],
    };
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
