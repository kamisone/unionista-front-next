'use client';
import { SupportedLanguages } from '@/i18n/settings';
import { ModalService } from '@/services/modal.service';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import { ModalContentMapping } from '@/utils/modal';
import { useEffect, useState } from 'react';
import LoginContent from '../modal-content/login-in-content/LoginContent';

const modalService = ModalService.instance;

interface CenterModalProps {
    lng: SupportedLanguages;
}

const CenterModal = ({ lng }: CenterModalProps) => {
    const [currentModalContent, setCurrentModalContent] = useState(
        modalService.state.currentModalContent
    );

    useEffect(() => {
        // set notifiers
        modalService.addNotifier((options) => {
            if (options) {
                setCurrentModalContent(options.state.currentModalContent);
            }
        });
    }, []);

    switch (currentModalContent) {
        case ModalContentMapping.SIGN_IN:
        case ModalContentMapping.SIGN_UP:
            return (
                <ModalSpot
                    lng={lng}
                    animationDirection="animate_to_center"
                    isDesktop={true}
                >
                    <LoginContent lng={lng} />
                </ModalSpot>
            );
        default:
            return (
                <ModalSpot lng={lng} isDesktop={true}>
                    <h2>no content found</h2>
                </ModalSpot>
            );
    }
};

export default CenterModal;
