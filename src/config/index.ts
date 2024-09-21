import { SupportedLanguages } from '@/i18n/settings';
import { modalContentNames } from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';

export function getAdminPaths() {
    return [
        `${modalContentNames.QUERY_NAME}=${ModalContentMapping.MENU_DRAWER}`,
        `/admin`,
    ];
}
