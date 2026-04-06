/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    output: 'standalone',
    experimental: {
        // Если нужно — можно добавить, но пока не трогаем
    },
    // allowedDevOrigins: [
    //     '192.168.0.102',     // твой текущий IP
    //     'localhost',
    //     '127.0.0.1'
    // ],

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