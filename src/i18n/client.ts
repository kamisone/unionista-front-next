import i18next, { Namespace } from 'i18next';
import {
    initReactI18next,
    useTranslation as useTranslationOrg,
} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import {
    SupportedLanguages,
    cookieName,
    getOptions,
    languages,
} from '@/i18n/settings';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

const runsOnServerSide = typeof window === 'undefined';

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
        resourcesToBackend(
            (language: string, namespace: string) =>
                import(`/src/i18n/locales/${language}/${namespace}.json`)
        )
    )
    .init({
        ...getOptions(),
        lng: undefined,
        detection: {
            order: ['path', 'htmlTag', 'cookie', 'navigator'],
        },
        preload: runsOnServerSide ? languages : [],
    });

export function useTranslation(
    lng: SupportedLanguages,
    ns: Namespace = 'translation',
    options?: any
) {
    const [cookies, setCookie] = useCookies([cookieName]);
    const ret = useTranslationOrg(ns, options);
    const { i18n } = ret;
    if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
        i18n.changeLanguage(lng);
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (activeLng === i18n.resolvedLanguage) return;
            setActiveLng(i18n.resolvedLanguage);
        }, [activeLng, i18n.resolvedLanguage]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (!lng || i18n.resolvedLanguage === lng) return;
            i18n.changeLanguage(lng);
        }, [lng, i18n]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (cookies['lng'] === lng) return;
            setCookie(cookieName, lng, { path: '/' });
        }, [lng, cookies, setCookie]);
    }
    return ret;
}
