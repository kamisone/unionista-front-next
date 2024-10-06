import BottomModal from '@/components/bottom-modal/BottomModal';
import { SupportedLanguages } from '@/i18n/settings';
import { modalContentNames } from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';
import { headers } from 'next/headers';
import CenterModal from '../center-modal/CenterModal';
import SideModal from '../side-modal/SideModal';

interface FlexModalProps {
    isMobileDevice: boolean;
    lng: SupportedLanguages;
    searchParams: { [key: string]: string | undefined };
}

async function FlexModal(props: FlexModalProps) {
    const currentModalContent = headers().get(
        modalContentNames.HEADER_NAME
    ) as ModalContentMapping | null;

    if (currentModalContent) {
        if (currentModalContent === ModalContentMapping.MENU_DRAWER) {
            return (
                <SideModal
                    lng={props.lng}
                    currentModalContent={currentModalContent}
                    isMobile={props.isMobileDevice}
                />
            );
        } else if (props.isMobileDevice) {
            return (
                <BottomModal
                    lng={props.lng}
                    currentModalContent={currentModalContent}
                    isMobile={props.isMobileDevice}
                    searchParams={props.searchParams}
                />
            );
        } else {
            return (
                <CenterModal
                    lng={props.lng}
                    currentModalContent={currentModalContent}
                    isMobile={props.isMobileDevice}
                    searchParams={props.searchParams}
                />
            );
        }
    }
}

export default FlexModal;
