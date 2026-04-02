/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: '**.picsum.photos',   // на всякий случай (для поддоменов)
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',   // на всякий случай (для поддоменов)
            },
            {
                protocol: 'https',
                hostname: 'drive.google.com',   // на всякий случай (для поддоменов)
            },
            {
                protocol: 'https',
                hostname: '*.supabase.co',   // важно!
            },
        ],
    },
};

module.exports = nextConfig;