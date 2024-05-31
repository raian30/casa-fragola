import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    httpAgentOptions: {
        keepAlive: true
    }
};

export default withNextIntl(nextConfig);