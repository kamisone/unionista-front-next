'use client';
import { SupportedLanguages } from '@/app/i18n/settings';
import {
    INotifyOptions,
    SNACKBAR_DURATION,
    SnackbarService,
    SnackbarSeverity,
} from '@/app/services/snackbar.service';
import SnackbarContent from '@/app/shared/snackbar-content/SnackbarContent';
import { Slide, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';

const snackbarService = SnackbarService.getInstance();

interface CustomSnackbarProps {
    lng: SupportedLanguages;
}

const CustomSnackbar = ({ lng }: CustomSnackbarProps) => {
    const [isSnackShowed, setIsSnackShowed] = useState(false);
    const [snackSeverity, setSnackSeverity] = useState<SnackbarSeverity>(
        SnackbarSeverity.INFO
    );
    const [snackMessage, setSnackMessage] = useState<string | null>(null);
    const [onSnackWillClose, setOnSnackWillClose] = useState<
        (() => void) | null
    >(null);

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
                lng: lng,
                severity: snackSeverity,
                onClose: onSnackClose,
                message: snackMessage ?? '',
            })}
        </Snackbar>
    );
};

export default CustomSnackbar;
