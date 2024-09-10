'use client';
import { SnackbarService, SnackbarSeverity } from '@/services/snackbar.service';
import { useEffect, useState } from 'react';
import styles from './Notifier.module.css';

const snackbarService = SnackbarService.instance;

export default function Notifier() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        console.log('notifier useeffect');
        snackbarService.addNotifier((options) => {
            console.log('called: ', toasts);
            if (!options || !options.state.toast) return;
            setToasts((toasts) => [...toasts, options.state.toast as Toast]);
            snackbarService.state = {
                toast: null,
            };
            setTimeout(() => {
                setToasts((toasts) =>
                    toasts.reduce((acc, curr) => {
                        if (curr !== options.state.toast) {
                            acc.push(curr);
                        }
                        return acc;
                    }, [] as Toast[])
                );
            }, 5000);
        });
    }, []);

    if (toasts.length) {
        return (
            <div className={styles.container}>
                {toasts.map((toast) => {
                    return (
                        <div key={toast.message} className={styles.toast}>
                            <p>{toast.message}</p>
                        </div>
                    );
                })}
            </div>
        );
    }

    return;
}

export interface Toast {
    message: string;
    severity: SnackbarSeverity;
}
