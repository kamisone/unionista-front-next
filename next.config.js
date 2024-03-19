/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
    },
    // i18n: {
    //     // localeDetection: true,
    //     locales: ['en', 'fr', 'es'],
    //     defaultLocale: 'fr',
    // },
};

module.exports = nextConfig;
