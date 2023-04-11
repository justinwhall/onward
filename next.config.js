/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**dummyimage.com',
            },
            {
                protocol: 'https',
                hostname: '**cdn.shopify.com',
            }
        ]
    }
}

module.exports = nextConfig
