import { SupportedLanguages } from '@/i18n/settings';
import { JwtPayload } from '@/services/types/auth';
import { modalContentNames } from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';

export function getAdminPaths() {
    return [
        `${modalContentNames.QUERY_NAME}=${ModalContentMapping.MENU_DRAWER}`,
        `/admin`,
    ];
}

export function isUserAuthorized(
    user: JwtPayload | null | undefined,
    path: string
) {
    switch (user?.role) {
        case 'admin':
            return true;
        case 'client':
            return !getAdminPaths().some((p) => path.includes(p));
        default:
            return false;
    }
}
