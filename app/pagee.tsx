'use client';

import React, { Context, Suspense, useEffect, useState } from 'react';
import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import ModalSpot from '@/app/shared/modal-spot/ModalSpot';
import MenuDrawerContent from '@/app/components/modal-content/menu-drawer-content/MenuDrawerContent';
import { ModalContentMapping } from '@/app/utils/bottom-modal';
import { Snackbar, Slide } from '@mui/material';
import SnackbarContent from '@/app/shared/snackbar-content/SnackbarContent';
import {
    INotifyOptions,
    SNACKBAR_DURATION,
    SnackbarService,
    SnackbarSeverity,
} from '@/app/services/snackbar.service';
import { useAppSelector } from '@/app/lib/store';
import LoginContent from '@/app/components/modal-content/login-in-content/LoginContent';

const snackbarService = SnackbarService.getInstance();

// const LoginInContent = React.lazy(
//     () => import('@/app/components/modal-content/login-in-content/LoginContent')
// );

const menuItems = [
    'Early Christmas Deals',
    'Jewelry & Accessories',
    'Clothing & shoes',
    'Home & Living',
    'Wedding & party',
    'toys & entertainment',
    'art & collectibles',
    'craft supplies & tools',
    'etsy registry',
];

function Home() {
    const headerState = useAppSelector((state) => state.header);

    const [isSnackShowed, setIsSnackShowed] = useState(false);
    const [snackSeverity, setSnackSeverity] = useState<SnackbarSeverity>(
        SnackbarSeverity.INFO
    );
    const [onSnackWillClose, setOnSnackWillClose] = useState<
        (() => void) | null
    >(null);
    const [snackMessage, setSnackMessage] = useState<string | null>(null);
    useEffect(() => {
        console.log(process.env.NODE_ENV);

        snackbarService.addNotifier((options: INotifyOptions) => {
            if (options.onClose) {
                setOnSnackWillClose(options.onClose);
            }
            setSnackSeverity(options.severity);
            setSnackMessage(options.message);
            setIsSnackShowed(true);
        });
    }, []);

    function onSnackClose() {
        onSnackWillClose?.();
        setIsSnackShowed(false);
        setSnackMessage(null);
    }
    return (
        <div className="app_container">
            <Header />
            <div className="app_body_container">{/* <RenderRoutes /> */}</div>
            <Footer />
            <Snackbar
                open={isSnackShowed}
                onClose={onSnackClose}
                TransitionComponent={(props) => (
                    <Slide {...props} direction="left" />
                )}
                autoHideDuration={SNACKBAR_DURATION}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                ClickAwayListenerProps={{ mouseEvent: false }}
            >
                {SnackbarContent({
                    severity: snackSeverity,
                    onClose: onSnackClose,
                    message: snackMessage ?? '',
                })}
            </Snackbar>
            {headerState.isBottomModalOpen &&
                _BottomModalContent(headerState.currentContent)}
        </div>
    );
}

function _BottomModalContent(currentContent: ModalContentMapping) {
    switch (currentContent) {
        case ModalContentMapping.MENU_DRAWER:
            return (
                <ModalSpot>
                    <MenuDrawerContent menuItems={menuItems} />
                </ModalSpot>
            );
        case ModalContentMapping.SIGN_IN:
        case ModalContentMapping.SIGN_UP:
            return (
                <ModalSpot>
                    <Suspense>
                        <LoginContent />
                    </Suspense>
                </ModalSpot>
            );

        default:
            return (
                <ModalSpot>
                    <h2>no content found</h2>{' '}
                </ModalSpot>
            );
    }
}
