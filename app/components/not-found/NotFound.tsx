import { useTranslation } from 'react-i18next';
import React from 'react';
import './NotFound.css';
import ActionButton from '@/app/shared/action-button/ActionButton';
import clsx from 'clsx';
import { Montserrat } from '@/app/fonts/fonts';

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div className={clsx('nf_container', Montserrat.className)}>
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
