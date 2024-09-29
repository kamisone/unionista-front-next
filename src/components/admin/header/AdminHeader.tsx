import LinkTransparentButton from '@/shared/link-transparent-button/LinkTransparentButton';
import clsx from 'clsx';
import React from 'react';

interface AdminHeaderProps {
    utilities?: string;
}

function AdminHeader({ utilities }: AdminHeaderProps) {
    return (
        <section className={clsx('bg-secondary p-2', utilities)}>
            <LinkTransparentButton to="/">
                <img
                    className={'max-w-20'}
                    src="/assets/icons/unionista-logo2.png"
                    alt="logo"
                />
            </LinkTransparentButton>
        </section>
    );
}

export default AdminHeader;
