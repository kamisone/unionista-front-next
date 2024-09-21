import styles from '@/components/user-home/desktop/DesktopHome.module.css';
import { SupportedLanguages } from '@/i18n/settings';
import clsx from 'clsx';
import Link from 'next/link';

interface DesktopHomeProps {
    lng: SupportedLanguages;
}

const DesktopHome = ({ lng }: DesktopHomeProps) => {
    return (
        <div className={clsx(styles.container)}>
            <nav className={styles.category_nav}>
                <ul>
                    {/* <li>
                        <Link href={`/${lng}/home-favorites`} />
                        Home Favorites
                    </li>
                    <li>
                        <Link href={`/${lng}/fashion-favorites`} />
                        Fashion
                    </li>
                    <li>
                        <Link href={`/${lng}/gifts`} />
                        Gifts
                    </li> */}
                    
                </ul>
            </nav>
            <span></span>
        </div>
    );
};

export default DesktopHome;
