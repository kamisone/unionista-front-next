import { useEffect, useRef, useState } from 'react';
import {
    ReadonlyURLSearchParams,
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation';
import { FrontQueryParams } from '@/app/utils/query-params';
import { BottomModalService } from '@/app/services/bottom-modal.service';

const bottomModalService = BottomModalService.getInstance();

const useUpdateQuery = () => {
    const [bottomModalContent, setBottomModalContent] = useState(
        bottomModalService.state.currentBottomModalContent
    );
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        console.log('contentHeader updatequery: ', bottomModalContent);
        if (bottomModalContent) {
            router.replace(
                `${pathname}?${addQueryParamToUrl(
                    searchParams,
                    FrontQueryParams.MODAL_CONTENT,
                    bottomModalContent
                )}`
            );
        } else {
            router.replace(
                `${pathname}?${stripQueryParamFromUrl(
                    searchParams,
                    FrontQueryParams.MODAL_CONTENT
                )}`
            );
        }
    }, [bottomModalContent]);

    // set notifiers
    useEffect(() => {
        console.log('contentHeader  upd added notfier');
        bottomModalService.addNotifier(
            (options) =>
                options &&
                setBottomModalContent(options.state.currentBottomModalContent)
        );
    }, []);

    function stripQueryParamFromUrl(
        searchParams: ReadonlyURLSearchParams,
        paramKey: FrontQueryParams
    ) {
        const nativeUrlSearchParams = new URLSearchParams(
            Array.from(searchParams.entries())
        );
        nativeUrlSearchParams.delete(paramKey);
        return nativeUrlSearchParams;
    }

    function addQueryParamToUrl(
        searchParams: ReadonlyURLSearchParams,
        paramKey: FrontQueryParams,
        paramValue: string
    ) {
        const nativeUrlSearchParams = new URLSearchParams(
            Array.from(searchParams.entries())
        );
        if (nativeUrlSearchParams.has(paramKey)) {
            nativeUrlSearchParams.set(paramKey, paramValue);
        } else {
            nativeUrlSearchParams.append(paramKey, paramValue);
        }

        return nativeUrlSearchParams;
    }
};

export { useUpdateQuery };
