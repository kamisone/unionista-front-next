import styles from '@/components/header/desktop/DesktopHeader.module.css';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import BoSettingsIcon from '@/icons/bo-settings/BoSettingsIcon';
import CartIcon from '@/icons/cart/CartIcon';
import NotificationIcon from '@/icons/notification/NotificationIcon';
import SearchIcon from '@/icons/search-icon/SearchIcon';
import { ModalService } from '@/services/modal.service';
import AvatarSlot from '@/shared/avatar-slot/AvatarSlot';
import InputControl from '@/shared/input-control/InputControl';
import TextInput from '@/shared/text-input/TextInput';
import { ModalContentMapping } from '@/utils/modal';
import clsx from 'clsx';
import Link from 'next/link';
import Hamburger from '../../Hamburger/Hamburger';
import SwitchLanguage from '../../switch-language/SwitchLanguage';
import { i18nTranslation } from '@/i18n';

const modalService = ModalService.instance;

interface DesktopHeaderProps {
    lng: SupportedLanguages;
    isUserAuthenticated: boolean;
}

async function DesktopHeader({ lng, isUserAuthenticated }: DesktopHeaderProps) {
    const t = i18nTranslation(lng, 'header');

    return (
        <>
            <header className={clsx(styles.container, lng)}>
                <div className={styles.logo}>
                    <Link className={styles.logo_link} href="/">
                        <img
                            className={styles.logo_picture}
                            src="/assets/icons/unionista-logo2.png"
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className={clsx(styles.hamburger_search)}>
                    <div className={clsx(styles.hamburger, 'onhover_bg_grey')}>
                        <Hamburger />
                        <span className={styles.hamburger_label}>
                            {t('hamburger.label')}
                        </span>
                    </div>
                    <div className={clsx(styles.search_input)}>
                        <InputControl
                            lng={lng}
                            radius="pilled"
                            isFormChild={false}
                        >
                            <TextInput
                                lng={lng}
                                iconGap="large"
                                size="medium"
                                placeholder={t('search-input-placeholder')}
                                name="search"
                            >
                                <SearchIcon />
                            </TextInput>
                        </InputControl>
                    </div>
                </div>
                <ul
                    className={clsx(
                        styles.h_nav_bar,
                        lng === SupportedLanguagesEnum.AR
                            ? UthmanicFont.className
                            : Graphik.className
                    )}
                >
                    {!isUserAuthenticated && (
                        <Link
                            href={`/${lng}?modal_content=${ModalContentMapping.SIGN_IN}`}
                            className={clsx(
                                styles.h_nav_item_text,
                                'onhover_bg_grey'
                            )}
                            onClick={() => {
                                modalService.state = {
                                    isModalOpen: true,
                                    currentModalContent:
                                        ModalContentMapping.SIGN_IN,
                                };
                            }}
                        >
                            <button>{t('sign-in.title')}</button>
                        </Link>
                    )}
                    <li className={clsx(styles.switch_lng)}>
                        <SwitchLanguage lng={lng} />
                    </li>
                    <li
                        className={clsx(styles.h_nav_item)}
                        style={{
                            // @ts-ignore
                            '--nav-icon-title': `"${t('icons.hover.admin')}"`,
                        }}
                    >
                        <Link href={`/${lng}/admin`}>
                            <BoSettingsIcon />
                        </Link>
                    </li>
                    <li className={clsx(styles.h_nav_item)}>
                        <Link
                            href={`/${lng}/notifications`}
                            style={{
                                // @ts-ignore
                                '--nav-icon-title': `"${t(
                                    'icons.hover.notifications'
                                )}"`,
                            }}
                        >
                            <NotificationIcon />
                        </Link>
                    </li>
                    <li className={clsx(styles.h_nav_item)}>
                        <Link
                            href={`/${lng}/cart`}
                            style={{
                                // @ts-ignore
                                '--nav-icon-title': `"${t(
                                    'icons.hover.cart'
                                )}"`,
                            }}
                        >
                            <CartIcon />
                        </Link>
                    </li>
                    {isUserAuthenticated && (
                        <li>
                            <AvatarSlot
                                content={
                                    <img
                                        src="/assets/icons/unionista-logo2.png"
                                        alt="unionistashop logo"
                                    />
                                }
                            />
                        </li>
                    )}
                </ul>
            </header>
        </>
    );
}

export default DesktopHeader;
