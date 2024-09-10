import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';

export enum ModalContentMapping {
    SIGN_IN = 'signin',
    SIGN_UP = 'signup',
    MENU_DRAWER = 'menu-drawer',
}

export function getModalTitle(
    currentModalContent: ModalContentMapping | null,
    lng: SupportedLanguages
) {
    const t = i18nTranslation(lng, 'modal');
    switch (currentModalContent) {
        case ModalContentMapping.MENU_DRAWER:
            return t('categories-heading');
        case ModalContentMapping.SIGN_IN:
            return t('signin-heading');
        case ModalContentMapping.SIGN_UP:
            return t('signup-heading');
        default:
            return '';
    }
}
