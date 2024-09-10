'use client';
import { PENDING_REDIRECT_PATH_NAME } from '@/utils/constants';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import styles from './LinkTransparentButton.module.css';
import { AuthService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { ModalContentMapping } from '@/utils/modal';
import { getLocale } from '@/i18n';
import clsx from 'clsx';

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
                if (props.isProtected && !isUserAuthenticated) {
                    if (
                        !document.cookie.includes(
                            `${PENDING_REDIRECT_PATH_NAME}=${props.to}`
                        )
                    ) {
                        document.cookie = `${PENDING_REDIRECT_PATH_NAME}=${props.to}`;
                    }

                    e.preventDefault();
                    router.push(
                        `/${locale}?modal_content=${ModalContentMapping.SIGN_IN}`
                    );
                }
            }}
        >
            {props.children}
        </Link>
    );
}
