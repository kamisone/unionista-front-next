'use client';
import { getProtectedPaths } from '@/config';
import { PENDING_REDIRECT_PATH_NAME } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import { Cookies } from 'react-cookie';

interface LinkTransparentButtonProps {
    to: string;
    isProtected?: boolean
    children: ReactNode;
}

export default function LinkTransparentButton(props: LinkTransparentButtonProps) {
    const router = useRouter();
    return (
        <button
            onClick={() => {
                router.push(props.to);
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
        </button>
    );
}
