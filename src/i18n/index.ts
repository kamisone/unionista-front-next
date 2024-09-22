import { isBrowser } from '@/utils/is-browser';
import { fallbackLng, SupportedLanguages } from './settings';
import { getCookies } from '@/utils/query-params';

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

export function getLocale(): SupportedLanguages {
    if (!isBrowser()) return fallbackLng;

    const cookies = getCookies();

    return (cookies.lng || fallbackLng) as SupportedLanguages;
}
