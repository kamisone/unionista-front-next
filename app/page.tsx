'use client';
export const dynamic = 'force-dynamic';

import React, { Suspense, useEffect, useState } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import MenuDrawerContent from '@/components/modal-content/menu-drawer-content/MenuDrawerContent';
import { ModalContentMapping } from '@/utils/bottom-modal';
import { HttpService } from '@/services/http.service';
import { Snackbar, Slide } from '@mui/material';
import SnackbarContent from '@/shared/snackbar-content/SnackbarContent';
import {
    INotifyOptions,
    SNACKBAR_DURATION,
    SnackbarService,
    SnackbarSeverity,
} from '@/services/snackbar.service';
import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
import { useAppSelector } from '@/lib/store';

const snackbarService = SnackbarService.getInstance();

const LoginInContent = React.lazy(
    () => import('@/components/modal-content/login-in-content/LoginContent')
);

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

export default function Home() {
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
            <h2>minemine{headerState.currentContent}</h2>
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
                        <LoginInContent />
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
