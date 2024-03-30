/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssnindia.com",
      },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lightweight-image-bucket.s3.us-east-2.amazonaws.com" },
    ],
  },
};

export default nextConfig;

