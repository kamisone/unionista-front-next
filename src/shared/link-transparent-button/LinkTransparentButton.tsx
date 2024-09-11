'use client';
import { getLocale } from '@/i18n';
import { AuthService } from '@/services/auth.service';
import { SnackbarService } from '@/services/snackbar.service';
import { PENDING_REDIRECT_PATH_NAME } from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState, useTransition } from 'react';
import LoadingIndicator from '../loading-indicator/LoadingIndicator';
import styles from './LinkTransparentButton.module.css';

interface LinkTransparentButtonProps {
    to: string;
    isProtected?: boolean;
    children: ReactNode;
    prefetch?: boolean;
    utilityClasses?: string;
}

const authService = AuthService.instance;

export default function LinkTransparentButton(
    props: LinkTransparentButtonProps
) {
    const router = useRouter();
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

    return (
        <Link
            prefetch={props.prefetch}
            href={props.to}
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
                            `/${locale}?modal_content=${ModalContentMapping.SIGN_IN}`
                        );
                    });
                } else {
                    startTransition(() => {
                        return router.push(props.to);
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
