import { SubMiddlewareReturnType } from '@/middleware';
import { httpMethods, modalContentNames } from '@/utils/constants';
import { NextRequest } from 'next/server';

export function modalMiddleware(req: NextRequest): SubMiddlewareReturnType {
    const search = req.nextUrl.searchParams;
    if (
        search.has(modalContentNames.QUERY_NAME) &&
        req.method.toLowerCase() === httpMethods.GET
    ) {
        req.headers.set(
            modalContentNames.HEADER_NAME,
            search.get(modalContentNames.QUERY_NAME)!
        );
    }

    return {
        request: req,
    };
}
