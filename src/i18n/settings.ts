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
