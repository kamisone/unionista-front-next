import { Namespace, createInstance } from 'i18next';
import { SupportedLanguages, defaultNs, getOptions } from '@/i18n/settings';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';

const initI18next = async (lng: SupportedLanguages, ns: Namespace) => {
    const i18nInstance = createInstance();
    await i18nInstance
        .use(initReactI18next)
        .use(
            resourcesToBackend(
                (language: string, namespace: string) =>
                    import(`@/i18n/locales/${language}/${namespace}.json`)
            )
        )
        .init(getOptions(lng, ns));
    return i18nInstance;
};

export async function useTranslation(
    lng: SupportedLanguages,
    ns: Namespace = defaultNs,
    options: any = {}
) {
    const i18nextInstance = await initI18next(lng, ns);
    return {
        t: i18nextInstance.getFixedT(
            lng,
            Array.isArray(ns) ? ns[0] : ns,
            options?.keyPrefix
        ),
        i18n: i18nextInstance,
    };
}
