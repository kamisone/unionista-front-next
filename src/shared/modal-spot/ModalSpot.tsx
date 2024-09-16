import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import CloseIcon from '@/icons/close-icon/CloseIcon';
import styles from '@/shared/modal-spot/ModalSpot.module.css';
import clsx from 'clsx';
import { ReactNode } from 'react';
import LinkTransparentButton from '../link-transparent-button/LinkTransparentButton';
import ScaleBgWrapper from '../scale-bg-wrapper/ScaleBgWrapper';
import { modalContentNames } from '@/utils/constants';

interface ModalSpotProps {
    children: ReactNode[] | ReactNode | string;
    lng: SupportedLanguages;
    isMobile?: boolean;
    headingTitle?: string;
    type: 'bottom' | 'center' | 'side';
}

function ModalSpot({
    children,
    headingTitle,
    lng,
    type,
    isMobile = false,
}: ModalSpotProps) {
    return (
        <div
            data-modal-spot
            className={clsx(
                styles.container,
                styles[type],
                'fixed z-[3] inset-0'
            )}
        >
            <div
                className={clsx(
                    styles.content,
                    'absolute grid grid-rows-[0fr] w-full bg-white text-secondary'
                )}
            >
                <div
                    className={clsx(
                        'flex items-center justify-between pt-4 pb-6 px-4'
                    )}
                >
                    {headingTitle && (
                        <>
                            <span>{/*placeholder*/}</span>
                            <h2
                                className={clsx(
                                    lng === SupportedLanguagesEnum.AR
                                        ? UthmanicFont.className
                                        : Graphik.className,
                                    'font-normal text-xl first-letter:uppercase'
                                )}
                            >
                                {headingTitle}
                            </h2>
                        </>
                    )}
                    <LinkTransparentButton
                        deleteQuerySearch={modalContentNames.QUERY_NAME}
                    >
                        {isMobile ? (
                            <CloseIcon />
                        ) : (
                            <ScaleBgWrapper>
                                <CloseIcon />
                            </ScaleBgWrapper>
                        )}
                    </LinkTransparentButton>
                </div>
                {children}
            </div>
        </div>
    );
}

export default ModalSpot;
