'use client';
import { AuthService } from '@/services/auth.service';
import { LoaderService } from '@/services/loader.service';
import {
    modalContentNames,
    PENDING_REDIRECT_PATH_NAME,
} from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';
import {
    addQueryParamToUrl,
    stripQueryParamFromUrl,
} from '@/utils/query-params';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
    ReactNode,
    useEffect,
    useId,
    useRef,
    useState,
    useTransition
} from 'react';

interface LinkTransparentButtonProps {
    children: ReactNode;
    to?: string;
    addQuerySearch?: { key: string; value: string };
    deleteQuerySearch?: string;
    isProtected?: boolean;
    prefetch?: boolean;
    utilityClasses?: string;
    active?: string;
}

const authService = AuthService.instance;
const loaderService = LoaderService.instance;

export default function LinkTransparentButton(props: LinkTransparentButtonProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(
        authService.state.user
    );
    const isInitialMount = useRef(true);
    const instanceId = useId();

    useEffect(() => {
        authService.addNotifier((options) => {
            options && setIsUserAuthenticated(!!options.state.user);
        });
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            console.log('isPending: ', isPending);
            if (
                isPending &&
                !loaderService.state.isLoadingIds.includes(instanceId)
            ) {
                loaderService.state = {
                    isLoadingIds: [
                        ...loaderService.state.isLoadingIds,
                        instanceId,
                    ],
                };
            } else if (loaderService.state.isLoadingIds.includes(instanceId)) {
                loaderService.state = {
                    isLoadingIds: loaderService.state.isLoadingIds.filter(
                        (id) => id !== instanceId
                    ),
                };
            }
        }
        return () => {
            if (loaderService.state.isLoadingIds.includes(instanceId)) {
                console.log('is unmounting');
                loaderService.state = {
                    isLoadingIds: loaderService.state.isLoadingIds.filter(
                        (id) => id !== instanceId
                    ),
                };
            }
        };
    }, [isPending]);

    const pathWithSearch = `${pathname}?${searchParams.toString()}`;
    const href =
        props.to ??
        (props.addQuerySearch
            ? addQueryParamToUrl(
                  pathWithSearch,
                  props.addQuerySearch.key,
                  props.addQuerySearch.value
              )
            : props.deleteQuerySearch
              ? stripQueryParamFromUrl(pathWithSearch, props.deleteQuerySearch)
              : '');

    return (
        <Link
            prefetch={props.prefetch}
            href={href}
            className={clsx(
                'relative no-underline text-inherit',
                props.utilityClasses,
                pathWithSearch.includes(href) && props.active
            )}
            onClick={(e) => {
                e.preventDefault();
                if (props.isProtected && !isUserAuthenticated) {
                    if (
                        !document.cookie.includes(
                            `${PENDING_REDIRECT_PATH_NAME}=${href}`
                        )
                    ) {
                        document.cookie = `${PENDING_REDIRECT_PATH_NAME}=${href}`;
                    }
                    startTransition(() => {
                        return router.push(
                            addQueryParamToUrl(
                                pathWithSearch,
                                modalContentNames.QUERY_NAME,
                                ModalContentMapping.SIGN_IN
                            )
                        );
                    });
                } else {
                    startTransition(() => {
                        return router.push(href);
                    });
                }
            }}
        >
            {props.children}
        </Link>
    );
}
