'use client';
import { isUserAuthorized } from '@/config';
import { getLocale, i18nTranslation } from '@/i18n';
import { AuthService } from '@/services/auth.service';
import { LoaderService } from '@/services/loader.service';
import { SnackbarService, SnackbarSeverity } from '@/services/snackbar.service';
import styles from '@/shared/link-transparent-button/LinkTransparentButton.module.css';
import {
    modalContentNames,
    PENDING_REDIRECT_PATH_NAME,
} from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';
import {
    addQueryParamToUrl,
    setCookie,
    stripQueryParamFromUrl,
} from '@/utils/query-params';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, {
    ReactElement,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
    useTransition,
} from 'react';

interface LinkTransparentButtonProps {
    children: ReactElement | ReactElement[];
    to?: string;
    addQuerySearch?: { key: string; value: string };
    deleteQuerySearch?: string;
    isProtected?: boolean;
    prefetch?: boolean;
    utilityClasses?: string;
    active?: string;

    handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
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
    handleClick,
}: LinkTransparentButtonProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();
    const [userPayload, setUserPayload] = useState(authService.state.user);
    const isInitialMount = useRef(true);
    const instanceId = useId();
    const t = i18nTranslation(getLocale(), 'error');

    useEffect(() => {
        authService.addNotifier((options) => {
            options && setUserPayload(options.state.user);
        });
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
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
                pathWithSearch.includes(href) && active && styles.active
            )}
            onClick={(e) => {
                startTransition(() => {
                    e.preventDefault();
                    handleClick?.(e);
                    if (isProtected && !userPayload) {
                        if (
                            !document.cookie.includes(
                                `${PENDING_REDIRECT_PATH_NAME}=${href}`
                            )
                        ) {
                            setCookie(PENDING_REDIRECT_PATH_NAME, href, true);
                        }
                        return router.push(
                            addQueryParamToUrl(
                                pathWithSearch,
                                modalContentNames.QUERY_NAME,
                                ModalContentMapping.SIGN_IN
                            )
                        );
                    } else if (userPayload) {
                        if (isUserAuthorized(userPayload, href)) {
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
