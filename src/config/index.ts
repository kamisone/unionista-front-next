import { SupportedLanguages } from '@/i18n/settings';

export function getProtectedPaths(lng: SupportedLanguages) {
    return ['modal_content=menu-drawer', `/${lng}/admin`];
}
