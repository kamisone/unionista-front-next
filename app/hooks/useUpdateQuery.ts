import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/app/lib/store';
import {
    ReadonlyURLSearchParams,
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation';
import { ModalContentMapping } from '@/app/utils/bottom-modal';
import { useSelector } from 'react-redux';
import { FrontQueryParams } from '../utils/query-params';

const useUpdateQuery = () => {
    const modalContent = useAppSelector((state) => state.header.currentContent);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        console.log('contentHeader updatequery: ', modalContent);
        if (modalContent) {
            router.replace(
                `${pathname}?${addQueryParamToUrl(
                    searchParams,
                    FrontQueryParams.MODAL_CONTENT,
                    modalContent
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
    }, [modalContent]);

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
