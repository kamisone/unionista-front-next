import styles from '@/components/admin/side-panel/SidePanel.module.css';
import { SupportedLanguages } from '@/i18n/settings';
import CartIcon from '@/icons/cart/CartIcon';
import HomeIcon from '@/icons/home/HomeIcon';
import ItemsIcon from '@/icons/items/ItemsIcon';
import SearchIcon from '@/icons/search-icon/SearchIcon';
import SettingsIcon from '@/icons/settings/SettingsIcon';
import LinkTransparentButton from '@/shared/link-transparent-button/LinkTransparentButton';
import { isMobile } from '@/utils/is-browser';
import clsx from 'clsx';
import { headers } from 'next/headers';
import ToggleTitlesArrow from './toggle-titles-arrow/ToggleTitlesArrow';

interface SidePanelProps {
    lng: SupportedLanguages;
    utilities?: string;
}

export default function SidePanel({ lng, utilities }: SidePanelProps) {
    const routes = [
        { label: 'search', Icon: SearchIcon },
        { label: 'dashboard', Icon: HomeIcon },
        { label: 'listings', Icon: ItemsIcon },
        { label: 'settings', Icon: SettingsIcon },
        { label: 'users', Icon: SettingsIcon },
        { label: 'statistics', Icon: SettingsIcon },
        { label: 'orders', Icon: CartIcon },
    ];

    const isMobileDevice = isMobile(headers().get('user-agent'));

    return (
        <section
            role="navigation"
            className={clsx(
                styles.container,
                isMobileDevice
                    ? styles['minimal-menu']
                    : `${styles.desktop} pt-10`,
                'grid gap-y-2 w-fit relative bg-white px-4 py-2 border-0 border-r border-solid border-light-sage',
                'grid-cols-[auto_auto] content-start items-center justify-start overflow-x-hidden',
                utilities
            )}
        >
            {!isMobileDevice && (
                <ToggleTitlesArrow
                    utilities="absolute top-0 rotate-12 mt-2 mx-auto"
                    toggleClass={styles['minimal-menu']}
                />
            )}
            {/* <LinkTransparentButton utilityClasses="contents">
                <div title="dashboard">
                    <HomeIcon />
                </div>
                <span className="text-lg font-semibold text-nowrap">
                    Shop Manager
                </span>
            </LinkTransparentButton> */}

            {routes.map((route) => (
                <LinkTransparentButton
                    key={route.label}
                    to={`/${lng}/admin/${route.label}`}
                    utilityClasses="contents"
                    active="bg-primary"
                >
                    <div
                        className="text-secondary h-8 w-8 p-1 flex items-center justify-center"
                        title={route.label}
                    >
                        <route.Icon />
                    </div>
                    <div className="h-8 flex items-center text-nowrap rounded-[0_5px_5px_0] capitalize">
                        <span className="px-2">{route.label}</span>
                    </div>
                </LinkTransparentButton>
            ))}
        </section>
    );
}
