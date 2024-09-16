import { SupportedLanguages } from '@/i18n/settings';
import { modalContentNames } from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';

export function getProtectedPaths(lng: SupportedLanguages) {
    return [
        `${modalContentNames.QUERY_NAME}=${ModalContentMapping.MENU_DRAWER}`,
        `/${lng}/admin`,
    ];
}
