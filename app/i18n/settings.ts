import { Namespace } from 'i18next';

export const fallbackLng = 'en';
export const languages = [fallbackLng, 'es', 'fr'];

export type SupportedLanguages = 'en' | 'fr' | 'es';
export const cookieName = 'lng';
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
