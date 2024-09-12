import styles from '@/components/header/desktop/DesktopHeader.module.css';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import BoSettingsIcon from '@/icons/bo-settings/BoSettingsIcon';
import CartIcon from '@/icons/cart/CartIcon';
import NotificationIcon from '@/icons/notification/NotificationIcon';
import SearchIcon from '@/icons/search-icon/SearchIcon';
import AvatarSlot from '@/shared/avatar-slot/AvatarSlot';
import InputControl from '@/shared/input-control/InputControl';
import TextInput from '@/shared/text-input/TextInput';
import { ModalContentMapping } from '@/utils/modal';
import clsx from 'clsx';
import Link from 'next/link';
import Hamburger from '../../Hamburger/Hamburger';
import SwitchLanguage from '../../switch-language/SwitchLanguage';
import { i18nTranslation } from '@/i18n';
import LinkTransparentButton from '@/shared/link-transparent-button/LinkTransparentButton';
import ScaleBgWrapper from '@/shared/scale-bg-wrapper/ScaleBgWrapper';

interface DesktopHeaderProps {
    lng: SupportedLanguages;
    user: any;
}

async function DesktopHeader({ lng, user }: DesktopHeaderProps) {
    const t = i18nTranslation(lng, 'header');

    return (
        <>
            <header className={clsx(styles.container, styles[lng])}>
                <div className={styles.logo}>
                    <LinkTransparentButton to="/">
                        <div className={styles.logo_link}>
                            <img
                                className={styles.logo_picture}
                                src="/assets/icons/unionista-logo2.png"
                                alt="logo"
                            />
                        </div>
                    </LinkTransparentButton>
                </div>
                <div className={clsx(styles.hamburger_search)}>
                    <LinkTransparentButton
                        isProtected
                        to={`/${lng}?modal_content=${ModalContentMapping.MENU_DRAWER}`}
                    >
                        <div
                            className={clsx(
                                styles.hamburger,
                                'onhover_bg_grey'
                            )}
                        >
                            <Hamburger />
                            <span className={styles.hamburger_label}>
                                {t('hamburger.label')}
                            </span>
                        </div>
                    </LinkTransparentButton>
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
                                isIconBgActive
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
                    {!user && (
                        <LinkTransparentButton
                            to={`/${lng}?modal_content=${ModalContentMapping.SIGN_IN}`}
                        >
                            <div
                                className={clsx(
                                    styles.h_nav_item_text,
                                    'onhover_bg_grey'
                                )}
                            >
                                <button>{t('sign-in.title')}</button>
                            </div>
                        </LinkTransparentButton>
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
                        <LinkTransparentButton to={`/${lng}/admin`}>
                            <ScaleBgWrapper>
                                <BoSettingsIcon />
                            </ScaleBgWrapper>
                        </LinkTransparentButton>
                    </li>
                    <li className={clsx(styles.h_nav_item)}>
                        <LinkTransparentButton to={`/${lng}/notifications`}>
                            {/* <div
                                style={{
                                    // @ts-ignore
                                    '--nav-icon-title': `"${t(
                                        'icons.hover.notifications'
                                    )}"`,
                                }}
                            >
                                <NotificationIcon />
                            </div> */}
                            <ScaleBgWrapper>
                                <NotificationIcon />
                            </ScaleBgWrapper>
                        </LinkTransparentButton>
                    </li>
                    <li className={clsx(styles.h_nav_item)}>
                        <LinkTransparentButton to={`/${lng}/cart`}>
                            {/* <div
                                style={{
                                    // @ts-ignore
                                    '--nav-icon-title': `"${t(
                                        'icons.hover.cart'
                                    )}"`,
                                }}
                            >
                                <CartIcon />
                            </div> */}
                            <ScaleBgWrapper>
                                <CartIcon />
                            </ScaleBgWrapper>
                        </LinkTransparentButton>
                    </li>
                    {user && (
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
