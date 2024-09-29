import { SupportedLanguages } from '@/i18n/settings';
import LinkTransparentButton from '@/shared/link-transparent-button/LinkTransparentButton';
import clsx from 'clsx';
import React from 'react';

interface AdminHeaderProps {
    lng: SupportedLanguages;
    utilities?: string;
}

function AdminHeader({ utilities, lng }: AdminHeaderProps) {
    return (
        <section className={clsx('bg-secondary p-2', utilities)}>
            <LinkTransparentButton to={`/${lng}`}>
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
