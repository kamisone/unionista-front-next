import 'components/header/Header.css';
import BoSettingsIcon from '@/icons/bo-settings/BoSettingsIcon';
import CartIcon from '@/icons/cart/CartIcon';
import NotificationIcon from '@/icons/notification/NotificationIcon';
import React from 'react';
import TextInput from '@/shared/text-input/TextInput';
import InputControl from '@/shared/input-control/InputControl';
import { toggleBottomModal } from '@/lib/features/header/headerSlice';
import { useDispatch, useSelector } from 'react-redux';
import Hamburger from '@/components/Hamburger/Hamburger';
import SearchIcon from '@/icons/search-icon/SearchIcon';
import { useTranslation } from 'react-i18next';
import { ModalContentMapping } from '@/utils/bottom-modal';
import Link from 'next/link';
import { useAppSelector } from '@/lib/store';

const Header = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isBottomModalOpen = useAppSelector(
        (state) => state.header.isBottomModalOpen
    );

    return (
        <div className="h_container">
            <div className="h_top_part">
                <figure className="h_logo">
                    <img src="/icons/unionista-logo2.png" alt="logo" />
                </figure>
                <ul className="h_nav_bar">
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
                <InputControl radius="pilled">
                    <TextInput
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
