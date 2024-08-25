import { Namespace } from 'i18next';

export const fallbackLng = 'en';

export type SupportedLanguages = 'en' | 'fr' | 'es' | 'ar';
export enum SupportedLanguagesEnum {
    EN = 'en',
    ES = 'es',
    AR = 'ar',
    FR = 'fr',
}

export const languages: SupportedLanguages[] = [fallbackLng, 'es', 'fr', 'ar'];

export const lngCookieName = 'lng';
export const defaultNs = 'translation';

export function getOptions(
    lng: SupportedLanguages = fallbackLng,
    ns: Namespace = defaultNs
) {
    return {
        supportedLngs: languages,
        fallbackLng,
        lng,
        fallbackNs: defaultNs,
        defaultNs,
        ns,
    };
}
