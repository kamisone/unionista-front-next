'use client';

import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
import React, { Suspense } from 'react';
import { SupportedLanguages } from '@/i18n/settings';
import { ModalService } from '@/services/modal.service';

interface FlexModalProps {
    isMobileDevice: boolean;
    lng: SupportedLanguages;
}
interface FlexModalState {
    isModalOpen: boolean;
}

const BottomModal = React.lazy(
    () => import('@/components/bottom-modal/BottomModal')
);
const CenterModal = React.lazy(
    () => import('@/components/center-modal/CenterModal')
);

const modalService = ModalService.instance;

class FlexModal extends React.Component<FlexModalProps, FlexModalState> {
    state = {
        isModalOpen: modalService.state.isModalOpen,
    };
    constructor(props: FlexModalProps) {
        super(props);
    }

    componentDidMount(): void {
        modalService.addNotifier((options) => {
            options &&
                this.setState({
                    isModalOpen: options.state.isModalOpen,
                });
        });
    }

    render() {
        if (modalService.state.isModalOpen)
            return (
                <Suspense fallback={<LoadingIndicator isExtended />}>
                    {this.props.isMobileDevice ? (
                        <BottomModal lng={this.props.lng} />
                    ) : (
                        <CenterModal lng={this.props.lng} />
                    )}
                </Suspense>
            );
    }
}

export default FlexModal;
