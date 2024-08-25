import { SupportedLanguages } from '@/i18n/settings';
import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import { modalContentNames } from '@/utils/constants';
import { getModalTitle, ModalContentMapping } from '@/utils/modal';
import { headers } from 'next/headers';
import { ReactElement, Suspense } from 'react';

interface CenterModalProps {
    lng: SupportedLanguages;
    content: ReactElement | Promise<ReactElement> | null;
}

const CenterModal = async function ({ lng, content }: CenterModalProps) {
    const currentModalContent = headers().get(
        modalContentNames.HEADER_NAME
    ) as ModalContentMapping | null;
    return (
        <ModalSpot lng={lng} headingTitle={getModalTitle(currentModalContent)}>
            <Suspense fallback={<LoadingIndicator />}>{content}</Suspense>
        </ModalSpot>
    );
};

export default CenterModal;
