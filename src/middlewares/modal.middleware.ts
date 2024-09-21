import { SubMiddlewareReturnType } from '@/middleware';
import { modalContentNames } from '@/utils/constants';
import { NextRequest } from 'next/server';

export function modalMiddleware(req: NextRequest): SubMiddlewareReturnType {
    const search = req.nextUrl.searchParams;
    if (search.has(modalContentNames.QUERY_NAME)) {
        req.headers.set(
            modalContentNames.HEADER_NAME,
            search.get(modalContentNames.QUERY_NAME)!
        );
    } else {
        // delete this header is useful when there is multiple redirects (redirect: next only re-calls middleware with the previous req)
        req.headers.delete(modalContentNames.HEADER_NAME);
    }

    return {
        request: req,
    };
}
