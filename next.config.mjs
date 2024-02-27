/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ssnindia.com',
            },
        ]
    }
};

export default nextConfig;
