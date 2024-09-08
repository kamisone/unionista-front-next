import Hamburger from '@/components/Hamburger/Hamburger';
import styles from '@/components/header/mobile/MobileHeader.module.css';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { i18nTranslation } from '@/i18n';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import BoSettingsIcon from '@/icons/bo-settings/BoSettingsIcon';
import CartIcon from '@/icons/cart/CartIcon';
import NotificationIcon from '@/icons/notification/NotificationIcon';
import SearchIcon from '@/icons/search-icon/SearchIcon';
import InputControl from '@/shared/input-control/InputControl';
import LinkTransparentButton from '@/shared/link-transparent-button/LinkTransparentButton';
import TextInput from '@/shared/text-input/TextInput';
import { ModalContentMapping } from '@/utils/modal';
import clsx from 'clsx';
import SwitchLanguage from '../../switch-language/SwitchLanguage';

interface HeaderProps {
    lng: SupportedLanguages;
    user: any;
}

const MobileHeader = ({ lng, user }: HeaderProps) => {
    const t = i18nTranslation(lng, 'header');

    return (
        <div className={clsx(styles.container, lng)}>
            <div className={styles.top_part}>
                <figure className={styles.logo}>
                    <img src="/assets/icons/unionista-logo2.png" alt="logo" />
                </figure>
                <ul
                    className={clsx(
                        styles.nav_bar,
                        lng === SupportedLanguagesEnum.AR
                            ? UthmanicFont.className
                            : Graphik.className
                    )}
                >
                    {!user && (
                        <LinkTransparentButton
                            to={`/${lng}?modal_content=${ModalContentMapping.SIGN_IN}`}
                        >
                            <span
                                className={clsx(
                                    styles.nav_item,
                                    styles.text,
                                    styles.signin
                                )}
                            >
                                {t('sign-in.title')}
                            </span>
                        </LinkTransparentButton>
                    )}
                    <li className={clsx(styles.nav_item, styles.country_icon)}>
                        <SwitchLanguage lng={lng} />
                    </li>
                    <li
                        style={{
                            // @ts-ignore
                            '--nav-icon-title': `"${t('icons.hover.admin')}"`,
                        }}
                        className={clsx(
                            styles.nav_item,
                            styles.icon,
                            styles.bo_icon
                        )}
                    >
                        <LinkTransparentButton isProtected to={`/${lng}/admin`}>
                            <BoSettingsIcon />
                        </LinkTransparentButton>
                    </li>
                    <li
                        className={clsx(
                            styles.nav_item,
                            styles.icon,
                            styles.notif
                        )}
                    >
                        {/* <Link
                            href={`/${lng}/notifications`}
                            style={{
                                // @ts-ignore
                                '--nav-icon-title': `"${t(
                                    'icons.hover.notifications'
                                )}"`,
                            }}
                        >
                            <NotificationIcon />
                        </Link> */}
                        <LinkTransparentButton to={`/${lng}/notifications`}>
                            <NotificationIcon />
                        </LinkTransparentButton>
                    </li>
                    <li
                        className={clsx(
                            styles.nav_item,
                            styles.icon,
                            styles.cart_icon
                        )}
                    >
                        {/* <Link
                            href={`/${lng}/cart`}
                            style={{
                                // @ts-ignore
                                '--nav-icon-title': `"${t(
                                    'icons.hover.cart'
                                )}"`,
                            }}
                        >
                            <CartIcon />
                        </Link> */}
                        <LinkTransparentButton to={`/${lng}/cart`}>
                            <CartIcon />
                        </LinkTransparentButton>
                    </li>
                </ul>
            </div>
            {/* sub part */}
            <div className={clsx(styles.sub_part)}>
                <LinkTransparentButton
                    isProtected
                    to={`/${lng}?modal_content=${ModalContentMapping.MENU_DRAWER}`}
                >
                    <Hamburger />
                </LinkTransparentButton>

                <InputControl lng={lng} radius="pilled" isFormChild={false}>
                    <TextInput
                        lng={lng}
                        iconGap="large"
                        size="medium"
                        placeholder={t('search-input-placeholder')}
                        name=""
                    >
                        <SearchIcon />
                    </TextInput>
                </InputControl>
            </div>
        </div>
    );
};

export default MobileHeader;
