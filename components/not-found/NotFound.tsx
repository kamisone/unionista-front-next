import { useTranslation } from 'react-i18next';
import React from 'react';
import './NotFound.css';
import ActionButton from '@/shared/action-button/ActionButton';

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div className="nf_container">
            <h2>Oops!</h2>
            <h6>{t('page-not-found.title')}</h6>
            <div>
                <p>{t('page-not-found.message-1')}</p>
                <p>{t('page-not-found.message-2')}</p>
            </div>

            <ActionButton to="/" radius="pilled" boxShadow={true}>
                <p className="nf_go_back_btn">{t('page-not-found.go-back')}</p>
            </ActionButton>
        </div>
    );
};

export default NotFound;
