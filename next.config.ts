/** @type {import('next').NextConfig} */
const nextConfig = {

    experimental: {
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
                hostname: '**',           // временно разрешаем ВСЕ https домены
            },

            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },

            {
                protocol: 'https',
                hostname: 'yfrqupwvvklyojymetod.supabase.co',
                pathname: '/storage/v1/object/public/**',
            },


            {
                protocol: 'https',
                hostname: '**.picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
            },
            {
                protocol: 'https',
                hostname: 'drive.google.com',
            },
            {
                protocol: 'https',
                hostname: '*.supabase.co',
            },

            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;