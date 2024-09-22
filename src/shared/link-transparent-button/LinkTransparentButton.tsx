'use client';
import { isUserAuthorized } from '@/config';
import { getLocale, i18nTranslation } from '@/i18n';
import { AuthService } from '@/services/auth.service';
import { LoaderService } from '@/services/loader.service';
import { SnackbarService, SnackbarSeverity } from '@/services/snackbar.service';
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
    useMemo,
    useRef,
    useState,
    useTransition,
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
const snackbarService = SnackbarService.instance;

export default function LinkTransparentButton({
    children,
    to,
    addQuerySearch,
    deleteQuerySearch,
    isProtected,
    prefetch,
    utilityClasses,
    active,
}: LinkTransparentButtonProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();
    const [user, setUser] = useState(authService.state.user);
    const isInitialMount = useRef(true);
    const instanceId = useId();
    const t = i18nTranslation(getLocale(), 'error');

    useEffect(() => {
        authService.addNotifier((options) => {
            options && setUser(options.state.user);
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
    }, [isPending]);

    useEffect(() => {
        return () => {
            console.log('is unmounting: ', loaderService.state.isLoadingIds);
            if (loaderService.state.isLoadingIds.includes(instanceId)) {
                loaderService.state = {
                    isLoadingIds: loaderService.state.isLoadingIds.filter(
                        (id) => id !== instanceId
                    ),
                };
            }
        };
    }, []);

    const pathWithSearch = `${pathname}?${searchParams.toString()}`;
    const href = useMemo(
        () =>
            to ??
            (addQuerySearch
                ? addQueryParamToUrl(
                      pathWithSearch,
                      addQuerySearch.key,
                      addQuerySearch.value
                  )
                : deleteQuerySearch
                  ? stripQueryParamFromUrl(pathWithSearch, deleteQuerySearch)
                  : ''),
        [to, addQuerySearch, deleteQuerySearch, pathWithSearch]
    );

    return (
        <Link
            prefetch={prefetch}
            href={href}
            className={clsx(
                'relative no-underline text-inherit',
                utilityClasses,
                pathWithSearch.includes(href) && active
            )}
            onClick={(e) => {
                startTransition(() => {
                    e.preventDefault();
                    if (isProtected && !user) {
                        if (
                            !document.cookie.includes(
                                `${PENDING_REDIRECT_PATH_NAME}=${href}`
                            )
                        ) {
                            document.cookie = `${PENDING_REDIRECT_PATH_NAME}=${href}`;
                        }
                        return router.push(
                            addQueryParamToUrl(
                                pathWithSearch,
                                modalContentNames.QUERY_NAME,
                                ModalContentMapping.SIGN_IN
                            )
                        );
                    } else if (user) {
                        if (isUserAuthorized(user, href)) {
                            return router.push(href);
                        } else {
                            snackbarService.state = {
                                toast: {
                                    message: t('unauthorized.role'),
                                    severity: SnackbarSeverity.ERROR,
                                },
                            };
                        }
                    } else {
                        return router.push(href);
                    }
                });
            }}
        >
            {children}
        </Link>
    );
}
