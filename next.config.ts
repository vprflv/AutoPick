/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',

    // Полностью отключаем статическую генерацию для всего проекта
    experimental: {
        esmExternals: true,
    },
};

export default nextConfig;