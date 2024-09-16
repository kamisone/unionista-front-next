'use client';
import { getLocale } from '@/i18n';
import { AuthService } from '@/services/auth.service';
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
import { ReactNode, useEffect, useState, useTransition } from 'react';
import LoadingIndicator from '../loading-indicator/LoadingIndicator';
import styles from './LinkTransparentButton.module.css';

interface LinkTransparentButtonProps {
    children: ReactNode;
    to?: string;
    addQuerySearch?: { key: string; value: string };
    deleteQuerySearch?: string;
    isProtected?: boolean;
    prefetch?: boolean;
    utilityClasses?: string;
}

const authService = AuthService.instance;

export default function LinkTransparentButton(
    props: LinkTransparentButtonProps
) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(
        authService.state.user
    );

    useEffect(() => {
        authService.addNotifier((options) => {
            options && setIsUserAuthenticated(!!options.state.user);
        });
    }, []);

    const locale = getLocale();

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
            className={clsx(styles.container, props.utilityClasses)}
            onClick={(e) => {
                e.preventDefault();
                if (props.isProtected && !isUserAuthenticated) {
                    if (
                        !document.cookie.includes(
                            `${PENDING_REDIRECT_PATH_NAME}=${props.to}`
                        )
                    ) {
                        document.cookie = `${PENDING_REDIRECT_PATH_NAME}=${props.to}`;
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
            {isPending && (
                <div className={styles.transitioning}>
                    <LoadingIndicator />
                </div>
            )}
        </Link>
    );
}
