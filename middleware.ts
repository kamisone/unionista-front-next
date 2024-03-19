import { NextRequest } from 'next/server';
import { i18nMiddleware } from '@/middlewares/i18n.middleware';

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

export function middleware(req: NextRequest) {
    return i18nMiddleware(req);
}
