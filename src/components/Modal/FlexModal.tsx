import { fetchProductsCategories } from '@/actions';
import BottomModal from '@/components/bottom-modal/BottomModal';
import { SupportedLanguages } from '@/i18n/settings';
import { modalContentNames } from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';
import { headers } from 'next/headers';
import { ReactElement } from 'react';
import CenterModal from '../center-modal/CenterModal';
import LoginContent from '../modal-content/login-in-content/LoginContent';
import MenuDrawerNavContent from '../modal-content/menu-drawer-nav-content/MenuDrawerNavContent';

interface FlexModalProps {
    isMobileDevice: boolean;
    lng: SupportedLanguages;
    searchParams: { [key: string]: string | undefined };
}


async function FlexModal(props: FlexModalProps) {
    const currentModalContent = headers().get(modalContentNames.HEADER_NAME);
    if (currentModalContent) {
        let content: ReactElement | Promise<ReactElement> | null = null;
        switch (currentModalContent) {
            case ModalContentMapping.MENU_DRAWER:
                const categories = await fetchProductsCategories(props.lng);
                content = (
                    <MenuDrawerNavContent
                        menuItems={categories}
                        lng={props.lng}
                    />
                );
                break;
            case ModalContentMapping.SIGN_IN:
            case ModalContentMapping.SIGN_UP:
                content = <LoginContent lng={props.lng} />;
                break;
        }
        return props.isMobileDevice ? (
            <BottomModal lng={props.lng} content={content} />
        ) : (
            <CenterModal lng={props.lng} content={content} />
        );
    }
}

export default FlexModal;
