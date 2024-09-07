'use client';
import { PENDING_REDIRECT_PATH_NAME } from '@/utils/constants';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './LinkTransparentButton.module.css';

interface LinkTransparentButtonProps {
    to: string;
    isProtected?: boolean;
    children: ReactNode;
    prefetch?: boolean;
}

export default function LinkTransparentButton(
    props: LinkTransparentButtonProps
) {
    return (
        <Link
            prefetch={props.prefetch}
            href={props.to}
            className={styles.container}
            onClick={() => {
                if (
                    props.isProtected &&
                    document.cookie.includes(PENDING_REDIRECT_PATH_NAME) &&
                    !document.cookie.includes(
                        `${PENDING_REDIRECT_PATH_NAME}=${props.to}`
                    )
                ) {
                    document.cookie = `${PENDING_REDIRECT_PATH_NAME}=${props.to}`;
                }
            }}
        >
            {props.children}
        </Link>
    );
}
