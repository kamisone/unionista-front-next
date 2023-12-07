'use client';

import '@/app/components/header/Header.css';
import BoSettingsIcon from '@/app/icons/bo-settings/BoSettingsIcon';
import CartIcon from '@/app/icons/cart/CartIcon';
import NotificationIcon from '@/app/icons/notification/NotificationIcon';
import React from 'react';
import TextInput from '@/app/shared/text-input/TextInput';
import InputControl from '@/app/shared/input-control/InputControl';
import { toggleBottomModal } from '@/app/lib/features/header/headerSlice';
import { useDispatch, useSelector } from 'react-redux';
import Hamburger from '@/app/components/Hamburger/Hamburger';
import SearchIcon from '@/app/icons/search-icon/SearchIcon';
import { ModalContentMapping } from '@/app/utils/bottom-modal';
import Link from 'next/link';
import { useAppSelector } from '@/app/lib/store';
import { useTranslation } from '@/app/i18n/client';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '@/app/i18n/settings';
import clsx from 'clsx';
import { Graphik, UthmanicFont } from '@/app/fonts/fonts';
import SwitchLanguage from '../switch-language/SwitchLanguage';

interface HeaderProps {
    lng: SupportedLanguages;
}

const Header = ({ lng }: HeaderProps) => {
    const { t } = useTranslation(lng);
    const dispatch = useDispatch();
    const isBottomModalOpen = useAppSelector(
        (state) => state.header.isBottomModalOpen
    );

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
                    <li
                        onClick={() =>
                            dispatch(
                                toggleBottomModal({
                                    isBottomModalOpen: !isBottomModalOpen,
                                    currentContent: ModalContentMapping.SIGN_IN,
                                })
                            )
                        }
                        className="h_nav_item h_text h_signin"
                    >
                        <button>{t('sign-in.title')}</button>
                    </li>
                    <li className={clsx('h_nav_item h_country_icon')}>
                        <SwitchLanguage lng={lng} />
                    </li>
                    <li className="h_nav_item h_icon h_bo_icon">
                        <Link
                            href="/admin"
                            // @ts-ignore
                            style={{ '--nav-icon-title': '"admin"' }}
                        >
                            <BoSettingsIcon />
                        </Link>
                    </li>
                    <li className="h_nav_item h_icon h_notif">
                        <Link
                            href="/notifications"
                            // @ts-ignore
                            style={{ '--nav-icon-title': '"notifications"' }}
                        >
                            <NotificationIcon />
                        </Link>
                    </li>
                    <li className="h_nav_item h_icon h_cart_icon">
                        <Link
                            href="/cart"
                            // @ts-ignore
                            style={{ '--nav-icon-title': '"Cart"' }}
                        >
                            <CartIcon />
                        </Link>
                    </li>
                </ul>
            </div>
            {/* sub part */}
            <div className="h_sub_part">
                <button
                    onClick={() => {
                        dispatch(
                            toggleBottomModal({
                                isBottomModalOpen: !isBottomModalOpen,
                                currentContent: ModalContentMapping.MENU_DRAWER,
                            })
                        );
                    }}
                >
                    <Hamburger />
                </button>
                <InputControl lng={lng} radius="pilled">
                    <TextInput
                        lng={lng}
                        iconGap="large"
                        size="medium"
                        placeholder={t('header.search-input-placeholder')}
                    >
                        <SearchIcon />
                    </TextInput>
                </InputControl>
            </div>
        </div>
    );
};

export default Header;
