/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "composite-portal.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "variety.com",
      },
    ],
  },
};

export default nextConfig;
