'use client';
import { SupportedLanguages } from '@/i18n/settings';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import { FrontQueryParams } from '@/utils/query-params';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LoginContent from '../modal-content/login-in-content/LoginContent';
import { ModalService } from '@/services/modal.service';
import { ModalContentMapping } from '@/utils/modal';

const modalService = ModalService.instance;

interface CenterModalProps {
    lng: SupportedLanguages;
}

const CenterModal = ({ lng }: CenterModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(
        modalService.state.isModalOpen
    );
    const [currentModalContent, setCurrentModalContent] = useState(
        modalService.state.currentModalContent
    );

    const searchParams = useSearchParams();

    useEffect(() => {
        // set notifiers
        modalService.addNotifier((options) => {
            if (options) {
                setIsModalOpen(options.state.isModalOpen);
                setCurrentModalContent(options.state.currentModalContent);
            }
        });

        // initialize center modal state
        const searchParamsUrl = new URLSearchParams(
            Array.from(searchParams.entries())
        );
        if (searchParamsUrl.has(FrontQueryParams.MODAL_CONTENT)) {
            modalService.state = {
                isModalOpen: true,
                currentModalContent: searchParams.get(
                    FrontQueryParams.MODAL_CONTENT
                ) as ModalContentMapping,
            };
        }
    }, []);

    if (!isModalOpen) {
        return null;
    }
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
                    <h2>no content found</h2>{' '}
                </ModalSpot>
            );
    }
};

export default CenterModal;
