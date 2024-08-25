import { SupportedLanguages } from '@/i18n/settings';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import { getModalTitle, ModalContentMapping } from '@/utils/modal';
import { ReactElement, Suspense } from 'react';

import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
import { modalContentNames } from '@/utils/constants';
import { headers } from 'next/headers';


interface BottomModalProps {
    lng: SupportedLanguages;
    content: ReactElement | Promise<ReactElement> | null;
}

const BottomModal = async function ({ lng, content }: BottomModalProps) {

    const currentModalContent = headers().get(
        modalContentNames.HEADER_NAME
    ) as ModalContentMapping | null;

    return (
        <ModalSpot lng={lng} headingTitle={getModalTitle(currentModalContent)}>
            <Suspense fallback={<LoadingIndicator />}>{content}</Suspense>
        </ModalSpot>
    );
};

export default BottomModal;
