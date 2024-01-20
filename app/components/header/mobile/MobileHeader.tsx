'use client';

import '@/app/components/header/mobile/MobileHeader.css';
import BoSettingsIcon from '@/app/icons/bo-settings/BoSettingsIcon';
import CartIcon from '@/app/icons/cart/CartIcon';
import NotificationIcon from '@/app/icons/notification/NotificationIcon';
import React, { useEffect, useState } from 'react';
import TextInput from '@/app/shared/text-input/TextInput';
import InputControl from '@/app/shared/input-control/InputControl';
import Hamburger from '@/app/components/Hamburger/Hamburger';
import SearchIcon from '@/app/icons/search-icon/SearchIcon';
import { ModalContentMapping } from '@/app/utils/bottom-modal';
import Link from 'next/link';
import { useTranslation } from '@/app/i18n/client';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '@/app/i18n/settings';
import clsx from 'clsx';
import { Graphik, UthmanicFont } from '@/app/fonts/fonts';
import SwitchLanguage from '../../switch-language/SwitchLanguage';
import LoadingIndicator from '@/app/shared/loading-indicator/LoadingIndicator';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useUserAuth } from '@/app/hooks/useUserAuth';
import { useUpdatePathQuery } from '@/app/hooks/useUpdatePathQuery';
import { FrontQueryParams } from '@/app/utils/query-params';
import { BottomModalService } from '@/app/services/bottom-modal.service';
import { AuthService } from '@/app/services/auth.service';

const bottomModalService = BottomModalService.getInstance();
const authService = AuthService.getInstance();

interface HeaderProps {
    lng: SupportedLanguages;
    isUserAuthenticated: boolean;
}

const MobileHeader = ({ lng, isUserAuthenticated }: HeaderProps) => {
    const { t } = useTranslation(lng, 'header');

    return (
        <div className={clsx('h_container', lng)}>
            <div className="h_top_part">
                <figure className="h_logo">
                    <img src="/assets/icons/unionista-logo2.png" alt="logo" />
                </figure>
                <ul
                    className={clsx(
                        'h_nav_bar',
                        lng === SupportedLanguagesEnum.AR
                            ? UthmanicFont.className
                            : Graphik.className
                    )}
                >
                    {!isUserAuthenticated && (
                        <li
                            onClick={() => {
                                bottomModalService.state = {
                                    isBottomModalOpen: true,
                                    currentBottomModalContent:
                                        ModalContentMapping.SIGN_IN,
                                };
                            }}
                            className="h_nav_item h_text h_signin"
                        >
                            <button>{t('sign-in.title')}</button>
                        </li>
                    )}
                    <li className={clsx('h_nav_item h_country_icon')}>
                        <SwitchLanguage lng={lng} />
                    </li>
                    <li
                        style={{
                            // @ts-ignore
                            '--nav-icon-title': `"${t('icons.hover.admin')}"`,
                        }}
                        className="h_nav_item h_icon h_bo_icon"
                    >
                        <Link href="/admin">
                            <BoSettingsIcon />
                        </Link>
                    </li>
                    <li className="h_nav_item h_icon h_notif">
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
                    <li className="h_nav_item h_icon h_cart_icon">
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
            <div className="h_sub_part">
                <button
                    title={t('hamburger.title')}
                    onClick={() => {
                        bottomModalService.state = {
                            isBottomModalOpen: true,
                            currentBottomModalContent:
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
