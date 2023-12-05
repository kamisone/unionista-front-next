import { NextRequest } from 'next/server';
import { i18nMiddleware } from '@/middlewares/i18n.middleware';

export function middleware(req: NextRequest) {
    return i18nMiddleware(req);
}
