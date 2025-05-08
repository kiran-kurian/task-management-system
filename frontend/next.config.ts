import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enforce HTTPS in production
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
        ],
      },
    ];
  },
  
  // Redirect HTTP to HTTPS in production for the frontend application
  async redirects() {
    // Only add this if you need to redirect HTTP to HTTPS for your frontend
    // This is usually handled by your hosting platform (like Vercel)
    return [];
  },
};

export default nextConfig;
