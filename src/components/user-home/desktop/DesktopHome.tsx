import { SupportedLanguages } from '@/i18n/settings';
import React from 'react';
import styles from '@/components/user-home/desktop/DesktopHome.module.css';
import clsx from 'clsx';
import Link from 'next/link';

interface DesktopHomeProps {
    lng: SupportedLanguages;
    isUserAuthenticated: boolean;
}

const DesktopHome = ({ lng, isUserAuthenticated }: DesktopHomeProps) => {
    return (
        <div className={clsx(styles.container)}>
            <nav className={styles.category_nav}>
                <ul>
                    <li>
                        <Link href={'home-favorites'} />
                        Home Favorites
                    </li>
                    <li>
                        <Link href={'fashion-favorites'} />
                        Fashion
                    </li>
                    <li>
                        <Link href={'gifts'} />
                        Gifts
                    </li>
                </ul>
            </nav>
            <span></span>
        </div>
    );
};

export default DesktopHome;
