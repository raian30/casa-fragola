import {withAuth} from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';

const locales = ['hr', 'en', 'it', 'de', 'fr'];
const publicPages = ['/'];

const intlMiddleware = createIntlMiddleware({
    locales,
    localePrefix: 'as-needed',
    defaultLocale: 'hr'
});

const authMiddleware = withAuth(
    function onSuccess(req) {
        return intlMiddleware(req);
    },
    {
        callbacks: {
            authorized: ({token}) => token != null
        },
        pages: {
            signIn: '/cms/login'
        }
    }
);

export default function middleware(req: NextRequest) {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i'
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
    const isCmsPage = /^\/cms(\/.*)?$/.test(req.nextUrl.pathname);

    if (isPublicPage) {
        return intlMiddleware(req);
    } else if (isCmsPage) {
        return (authMiddleware as any)(req);
    } else {
        return intlMiddleware(req);
    }
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};