import { useEffect, useRef, useState } from 'react';
import {
    ReadonlyURLSearchParams,
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation';
import { FrontQueryParams } from '@/utils/query-params';
import { ModalService } from '@/services/modal.service';

const modalService = ModalService.getInstance();

const useUpdatePathQuery = () => {
    const [bottomModalContent, setBottomModalContent] = useState(
        modalService.state.currentModalContent
    );
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
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
        modalService.addNotifier(
            (options) =>
                options &&
                setBottomModalContent(options.state.currentModalContent)
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

export { useUpdatePathQuery };
