import BottomModal from '@/components/bottom-modal/BottomModal';
import { SupportedLanguages } from '@/i18n/settings';
import CenterModal from '../center-modal/CenterModal';
import { headers } from 'next/headers';
import { modalContentNames } from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';

interface FlexModalProps {
    isMobileDevice: boolean;
    lng: SupportedLanguages;
    searchParams: { [key: string]: string | undefined };
}

async function FlexModal(props: FlexModalProps) {
    const currentModalContent = headers().get(
        modalContentNames.HEADER_NAME
    ) as ModalContentMapping | null || ModalContentMapping.SIGN_IN;
    if (currentModalContent) {
        return props.isMobileDevice ? (
            <BottomModal
                lng={props.lng}
                currentModalContent={currentModalContent}
            />
        ) : (
            <CenterModal
                lng={props.lng}
                currentModalContent={currentModalContent}
            />
        );
    }
}

export default FlexModal;
