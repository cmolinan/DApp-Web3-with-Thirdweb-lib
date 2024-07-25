/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.coingecko.com',
                port: '',
                pathname: '**/*',
            },
        ],
    },
    env: {
        NODE_TLS_REJECT_UNAUTHORIZED: '0',
    },
};

export default nextConfig;
