import React from 'react';
import './NotFound.css';
import ActionButton from '@/shared/action-button/ActionButton';
import clsx from 'clsx';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import { i18nTranslation } from '@/i18n';

interface NotFoundProps {
    lng: SupportedLanguages;
}

const NotFound = ({ lng }: NotFoundProps) => {
    const t = i18nTranslation(lng);

    return (
        <div
            className={clsx(
                'nf_container',
                lng === SupportedLanguagesEnum.AR
                    ? UthmanicFont.className
                    : Graphik.className
            )}
        >
            <h2>Oops!</h2>
            <h6>{t('page-not-found.title')}</h6>
            <div>
                <p>{t('page-not-found.message-1')}</p>
                <p>{t('page-not-found.message-2')}</p>
            </div>

            <ActionButton lng={lng} to="/" radius="pilled" boxShadow={true}>
                <p className="nf_go_back_btn">{t('page-not-found.go-back')}</p>
            </ActionButton>
        </div>
    );
};

export default NotFound;
