import BottomModal from '@/components/bottom-modal/BottomModal';
import { SupportedLanguages } from '@/i18n/settings';
import { modalContentNames } from '@/utils/constants';
import { headers } from 'next/headers';
import CenterModal from '../center-modal/CenterModal';

interface FlexModalProps {
    isMobileDevice: boolean;
    lng: SupportedLanguages;
    searchParams: { [key: string]: string | undefined };
}

async function FlexModal(props: FlexModalProps) {
    return props.isMobileDevice ? (
        <BottomModal lng={props.lng} />
    ) : (
        <CenterModal lng={props.lng} />
    );
}

export default FlexModal;
