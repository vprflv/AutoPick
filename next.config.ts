/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    experimental: {

        serverActions: {
            bodySizeLimit: '2mb',
        },
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
                hostname: 'yfrqupwvvklyojymetod.supabase.co',
                pathname: '/storage/v1/object/public/**',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                pathname: '/**',
            },

            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },



            {
                protocol: 'https',
                hostname: '**.picsum.photos',
            },

            {
                protocol: 'https',
                hostname: 'drive.google.com',
            },
            {
                protocol: 'https',
                hostname: '*.supabase.co',
            },

        ],
        unoptimized: true,
    },
};

module.exports = nextConfig;