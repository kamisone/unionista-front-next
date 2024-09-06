'use client';
import { PENDING_REDIRECT_PATH_NAME } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState, useTransition } from 'react';
import LoadingIndicator from '../loading-indicator/LoadingIndicator';
import styles from './LinkTransparentButton.module.css';
import Link from 'next/link';

interface LinkTransparentButtonProps {
    to: string;
    isProtected?: boolean;
    children: ReactNode;
}

export default function LinkTransparentButton(
    props: LinkTransparentButtonProps
) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        console.log('ispending: ', isPending)
        if(!isPending) {
            setIsLoading(false);
        }
    }, [isPending])
    return (
        <Link
            href={props.to}
            className={styles.container}
            onClick={() => {
                setIsLoading(true);
                startTransition(() => {
                    router.push(props.to);
                });
                
                if (
                    props.isProtected &&
                    document.cookie.includes(PENDING_REDIRECT_PATH_NAME) &&
                    !document.cookie.includes(
                        `${PENDING_REDIRECT_PATH_NAME}=${props.to}`
                    )
                ) {
                    console.log('yess');
                    document.cookie = `${PENDING_REDIRECT_PATH_NAME}=${props.to}`;
                }
            }}
        >
            {props.children}

            {isLoading && (
                <div className={styles.spinner}>
                    <LoadingIndicator />
                </div>
            )}
        </Link>
    );
}
