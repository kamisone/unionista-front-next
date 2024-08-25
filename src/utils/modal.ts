export enum ModalContentMapping {
    SIGN_IN = 'signin',
    SIGN_UP = 'signup',
    MENU_DRAWER = 'menu-drawer',
}

export function getModalTitle(currentModalContent: ModalContentMapping | null) {
    switch (currentModalContent) {
        case ModalContentMapping.MENU_DRAWER:
            return 'Categories';
        case ModalContentMapping.SIGN_IN:
            return 'SignIn';
        case ModalContentMapping.SIGN_UP:
            return 'SignUp';
        default:
            return '';
    }
}
