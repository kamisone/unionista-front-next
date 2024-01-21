'use client';
import React, { useEffect } from 'react';
import styles from '@/app/components/header/desktop/DesktopHeader.module.css';
import Hamburger from '../../Hamburger/Hamburger';
import { useTranslation } from '@/app/i18n/client';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '@/app/i18n/settings';
import InputControl from '@/app/shared/input-control/InputControl';
import TextInput from '@/app/shared/text-input/TextInput';
import SearchIcon from '@/app/icons/search-icon/SearchIcon';
import CartIcon from '@/app/icons/cart/CartIcon';
import Link from 'next/link';
import NotificationIcon from '@/app/icons/notification/NotificationIcon';
import BoSettingsIcon from '@/app/icons/bo-settings/BoSettingsIcon';
import SwitchLanguage from '../../switch-language/SwitchLanguage';
import clsx from 'clsx';
import { Graphik, UthmanicFont } from '@/app/fonts/fonts';
import { useUserAuth } from '@/app/hooks/useUserAuth';
import { useSelectedLayoutSegment } from 'next/navigation';
import Image from 'next/image';
import AvatarSlot from '@/app/shared/avatar-slot/AvatarSlot';
import { ModalService } from '@/app/services/modal.service';
import { ModalContentMapping } from '@/app/utils/modal';

const modalService = ModalService.getInstance();

interface DesktopHeaderProps {
    lng: SupportedLanguages;
    isUserAuthenticated: boolean;
}

const DesktopHeader = ({ lng, isUserAuthenticated }: DesktopHeaderProps) => {
    const { t } = useTranslation(lng, 'header');

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
                        <Hamburger hoverAnimated={false} />
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
                        <li
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
                        </li>
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
                        <Link href="/admin">
                            <BoSettingsIcon />
                        </Link>
                    </li>
                    <li className={clsx(styles.h_nav_item)}>
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
                    <li className={clsx(styles.h_nav_item)}>
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
                    {isUserAuthenticated && (
                        <li>
                            <AvatarSlot
                                content={
                                    <img src="/assets/icons/unionista-logo2.png" />
                                }
                            />
                        </li>
                    )}
                </ul>
            </header>
        </>
    );
};

export default DesktopHeader;
