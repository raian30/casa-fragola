import createIntlMiddleware from 'next-intl/middleware';
import { withAuth } from 'next-auth/middleware';

// Create next-intl middleware
const intlMiddleware = createIntlMiddleware({
    locales: ['hr', 'en', 'it', 'fr'],
    defaultLocale: 'hr'
});

// Create next-auth middleware
const authMiddleware = withAuth({
    pages: {
        signIn: '/cms/login'
    }
});

export default async function middleware(req: any, ev: any) {
    const url = new URL(req.url);

    // Apply intlMiddleware to all internationalized paths
    if (url.pathname.startsWith('/hr') || url.pathname.startsWith('/en') || url.pathname === '/it' || url.pathname.startsWith('/fr') || url.pathname.startsWith('/')) {
        return intlMiddleware(req);
    }

    // Apply authMiddleware to CMS paths
    if (url.pathname.startsWith('/cms')) {
        return authMiddleware(req, ev);
    }

    // Default response if no path matches
    return new Response('Not Found', { status: 404 });
}


export const config = {
    matcher: [
        '/',
        '/(hr|en|it|fr)/:path*',
        '/cms/:path*'
    ]
};