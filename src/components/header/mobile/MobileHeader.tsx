'use client';

import styles from '@/components/header/mobile/MobileHeader.module.css';
import BoSettingsIcon from '@/icons/bo-settings/BoSettingsIcon';
import CartIcon from '@/icons/cart/CartIcon';
import NotificationIcon from '@/icons/notification/NotificationIcon';
import React, { startTransition, useEffect, useState } from 'react';
import TextInput from '@/shared/text-input/TextInput';
import InputControl from '@/shared/input-control/InputControl';
import Hamburger from '@/components/Hamburger/Hamburger';
import SearchIcon from '@/icons/search-icon/SearchIcon';
import Link from 'next/link';
// import { useTranslation } from '@/i18n/client';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import clsx from 'clsx';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import SwitchLanguage from '../../switch-language/SwitchLanguage';
import { AuthService } from '@/services/auth.service';
import { ModalService } from '@/services/modal.service';
import { ModalContentMapping } from '@/utils/modal';
import { openModal } from '@/actions';

const modalService = ModalService.instance;
const authService = AuthService.instance;

interface HeaderProps {
    lng: SupportedLanguages;
    user: any;
}

const MobileHeader = ({ lng, user }: HeaderProps) => {
    // const { t } = useTranslation(lng, 'header');
    const t = (...args: any) => 'action';

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
                        <Link
                            href={`/${lng}?modal_content=${ModalContentMapping.SIGN_IN}`}
                            onClick={() => {
                                // modalService.state = {
                                //     isModalOpen: true,
                                //     currentModalContent:
                                //         ModalContentMapping.SIGN_IN,
                                // };
                            }}
                            className={clsx(
                                styles.nav_item,
                                styles.text,
                                styles.signin
                            )}
                        >
                            <button>{t('sign-in.title')}</button>
                        </Link>
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
                        <Link href={`${lng}/admin`}>
                            <BoSettingsIcon />
                        </Link>
                    </li>
                    <li
                        className={clsx(
                            styles.nav_item,
                            styles.icon,
                            styles.notif
                        )}
                    >
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
                    <li
                        className={clsx(
                            styles.nav_item,
                            styles.icon,
                            styles.cart_icon
                        )}
                    >
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
                </ul>
            </div>
            {/* sub part */}
            <div className={clsx(styles.sub_part)}>
                <Link
                    href={`/${lng}?modal_content=${ModalContentMapping.MENU_DRAWER}`}
                >
                    <button
                        title={t('hamburger.title')}
                        onClick={() => {
                            // startTransition(
                            //     async function() {
                            //         modalService.state = {
                            //             isModalOpen: true,
                            //             currentModalContent:
                            //                 ModalContentMapping.MENU_DRAWER,
                            //         };
                            //         console.log('called');
                            //         await openModal(ModalContentMapping.MENU_DRAWER);
                            //     }
                            // );
                        }}
                    >
                        <Hamburger />
                    </button>
                </Link>
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
