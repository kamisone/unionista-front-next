import React from 'react';
import styles from '@/app/components/footer/desktop/DesktopFooter.module.css';
import { SupportedLanguages } from '@/app/i18n/settings';

interface DesktopHeaderProps {
    lng: SupportedLanguages;
    isUserAuthenticated: boolean;
}

const DesktopFooter = ({ lng, isUserAuthenticated }: DesktopHeaderProps) => {
    return (
        <div className={styles.container}>
            <h2>Desktop footer</h2>
        </div>
    );
};

export default DesktopFooter;
