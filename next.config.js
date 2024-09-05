/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE_URL_BROWSER: process.env.API_BASE_URL_BROWSER,
    },
    // i18n: {
    //     // localeDetection: true,
    //     locales: ['en', 'fr', 'es'],
    //     defaultLocale: 'fr',
    // },
    // async headers() {
    //     return [
    //         {
    //             source: '/fr',
    //             has: [
    //                 {
    //                     type: 'query',
    //                     key:'modal_content',
    //                     value: 'signin'
    //                 }
    //             ],
    //             headers: [
    //                 {
    //                     key: 'Set-Cookie',
    //                     value: 'Authorization=mine;'
    //                 }
    //             ]
    //         }
    //     ]
    // }
    async headers() {
        return [
            {
                source: '/:path*{/}?',
                headers: [
                    {
                        key: 'X-Accel-Buffering',
                        value: 'no',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
