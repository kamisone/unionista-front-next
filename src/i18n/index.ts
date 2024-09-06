// import i18n, { Namespace, createInstance, InitOptions } from 'i18next';
// import { SupportedLanguages, defaultNs, getOptions } from '@/i18n/settings';
// import { initReactI18next } from 'react-i18next/initReactI18next';
// import resourcesToBackend from 'i18next-resources-to-backend';
// import i18nextFSBackend from 'i18next-fs-backend';
// // import { I18n, InitPromise, CreateClientReturn } from 'next-i18next';

import { SupportedLanguages } from './settings';

// const initI18next = async (lng: SupportedLanguages, ns: Namespace) => {
//     const i18nInstance = createInstance();
//     await i18nInstance
//         .use(initReactI18next)
//         .use(
//             resourcesToBackend(
//                 (language: string, namespace: string) =>
//                     import(`@/i18n/locales/${language}/${namespace}.json`)
//             )
//         )
//         .init(getOptions(lng, ns));
//     return i18nInstance;
// };

// export async function useTranslation(
//     lng: SupportedLanguages,
//     ns: Namespace = defaultNs,
//     options: any = {}
// ) {
//     const i18nextInstance = await initI18next(lng, ns);
//     return {
//         t: i18nextInstance.getFixedT(
//             lng,
//             Array.isArray(ns) ? ns[0] : ns,
//             options?.keyPrefix
//         ),
//         i18n: i18nextInstance,
//     };
// }

const DEFAULT_NAME_SPACE = 'translation';

export function i18nTranslation(lng: SupportedLanguages, namespace?: string) {
    const json = require(
        `@/i18n/locales/${lng}/${namespace ?? DEFAULT_NAME_SPACE}.json`
    );
    return function t(path: string, substitutions?: Record<string, unknown>) {
        const segments = path.split('.');
        return segments.reduce(function (acc, curr, idx) {
            if (idx === segments.length - 1 && substitutions) {
                Object.keys(substitutions).forEach(
                    (sub) =>
                        (acc[curr] = (acc[curr] as string).replace(
                            `{{${sub}}}`,
                            String(substitutions[sub])
                        ))
                );
            }
            return acc[curr];
        }, json);
    };
}
