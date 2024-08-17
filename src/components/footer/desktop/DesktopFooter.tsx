import React from 'react';
import styles from '@/components/footer/desktop/DesktopFooter.module.css';
import { SupportedLanguages } from '@/i18n/settings';

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
