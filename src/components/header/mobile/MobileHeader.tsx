'use client';

import styles from '@/components/header/mobile/MobileHeader.module.css';
import BoSettingsIcon from '@/icons/bo-settings/BoSettingsIcon';
import CartIcon from '@/icons/cart/CartIcon';
import NotificationIcon from '@/icons/notification/NotificationIcon';
import React, { useEffect, useState } from 'react';
import TextInput from '@/shared/text-input/TextInput';
import InputControl from '@/shared/input-control/InputControl';
import Hamburger from '@/components/Hamburger/Hamburger';
import SearchIcon from '@/icons/search-icon/SearchIcon';
import Link from 'next/link';
import { useTranslation } from '@/i18n/client';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import clsx from 'clsx';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import SwitchLanguage from '../../switch-language/SwitchLanguage';
import { AuthService } from '@/services/auth.service';
import { ModalService } from '@/services/modal.service';
import { ModalContentMapping } from '@/utils/modal';

const modalService = ModalService.instance;
const authService = AuthService.instance;

interface HeaderProps {
    lng: SupportedLanguages;
    isUserAuthenticated: boolean;
}

const MobileHeader = ({ lng, isUserAuthenticated }: HeaderProps) => {
    const { t } = useTranslation(lng, 'header');

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
                    {!isUserAuthenticated && (
                        <li
                            onClick={() => {
                                modalService.state = {
                                    isModalOpen: true,
                                    currentModalContent:
                                        ModalContentMapping.SIGN_IN,
                                };
                            }}
                            className={clsx(
                                styles.nav_item,
                                styles.text,
                                styles.signin
                            )}
                        >
                            <button>{t('sign-in.title')}</button>
                        </li>
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
                        <Link href="/admin">
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
                            href="/notifications"
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
                            href="/cart"
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
                <button
                    title={t('hamburger.title')}
                    onClick={() => {
                        modalService.state = {
                            isModalOpen: true,
                            currentModalContent:
                                ModalContentMapping.MENU_DRAWER,
                        };
                    }}
                >
                    <Hamburger />
                </button>
                <InputControl lng={lng} radius="pilled" isFormChild={false}>
                    <TextInput
                        lng={lng}
                        iconGap="large"
                        size="medium"
                        placeholder={t('search-input-placeholder')}
                    >
                        <SearchIcon />
                    </TextInput>
                </InputControl>
            </div>
        </div>
    );
};

export default MobileHeader;
