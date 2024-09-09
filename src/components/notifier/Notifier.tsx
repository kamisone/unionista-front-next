'use client';
import { SnackbarService, SnackbarSeverity } from '@/services/snackbar.service';
import { useEffect, useState } from 'react';
import styles from './Notifier.module.css';

const snackbarService = SnackbarService.instance;

export default function Notifier() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        console.log('notifier useeffect')
        snackbarService.addNotifier((options) => {
            console.log('called: ', notifications);
            if (!options || !options.state.notification) return;
            setNotifications((notifications) => [
                ...notifications,
                options.state.notification as Notification,
            ]);
            snackbarService.state = {
                notification: null,
            };
            setTimeout(() => {
                setNotifications((notifications) =>
                    notifications.reduce((acc, curr) => {
                        if (curr !== options.state.notification) {
                            acc.push(curr);
                        }
                        return acc;
                    }, [] as Notification[])
                );
            }, 5000);
        });
    }, []);

    if (notifications.length) {
        return (
            <div className={styles.container}>
                {notifications.map((notif) => {
                    return (
                        <div
                            key={notif.message}
                            className={styles.notification}
                        >
                            <p>{notif.message}</p>
                        </div>
                    );
                })}
            </div>
        );
    }

    return;
}

export interface Notification {
    message: string;
    severity: SnackbarSeverity;
}
