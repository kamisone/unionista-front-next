import { SupportedLanguages } from '@/i18n/settings';
import { JwtPayload } from '@/services/server/auth.service';
import { modalContentNames } from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';

export function getAdminPaths() {
    return [
        `${modalContentNames.QUERY_NAME}=${ModalContentMapping.MENU_DRAWER}`,
        `/admin`,
    ];
}

export function isUserAuthorized(user: JwtPayload | null, path: string) {
    switch (user?.role) {
        case 'admin':
            return true;
        case 'user':
            return !getAdminPaths().some((p) => path.includes(p));
        default:
            return false;
    }
}
