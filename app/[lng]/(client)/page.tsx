import React from 'react';

import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '../../i18n/settings';
import { useTranslation } from '../../i18n';
import clsx from 'clsx';
import { UthmanicFont } from '@/app/fonts/fonts';

interface HomeProps {
    params: {
        lng: SupportedLanguages;
    };
}

function Home({ params: { lng } }: HomeProps) {
    // const { t } = await useTranslation(lng);
    return (
        <div
            className={clsx('app_container', lng, {
                [UthmanicFont.className]: lng === SupportedLanguagesEnum.AR,
            })}
        >
            <div className="app_body_container">{/* <RenderRoutes /> */}</div>
        </div>
    );
}

export default Home;
