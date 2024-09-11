import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import CloseIcon from '@/icons/close-icon/CloseIcon';
import styles from '@/shared/modal-spot/ModalSpot.module.css';
import clsx from 'clsx';
import { ReactNode } from 'react';
import LinkTransparentButton from '../link-transparent-button/LinkTransparentButton';
import ScaleBgWrapper from '../scale-bg-wrapper/ScaleBgWrapper';
import Link from 'next/link';

interface ModalSpotProps {
    children: ReactNode[] | ReactNode | string;
    lng: SupportedLanguages;
    animationDirection?:
        | 'animate_to_top'
        | 'animate_to_bottom'
        | 'animate_to_center';
    headingTitle?: string;
    isDesktop?: boolean;
}

function ModalSpot({
    children,
    headingTitle,
    lng,
    animationDirection = 'animate_to_top',
    isDesktop = false,
}: ModalSpotProps) {
    return (
        <Link
            href='.'
            className={clsx(styles.container, styles[animationDirection], {
                [styles.is_desktop]: isDesktop,
            })}
        >
            <div className={clsx(styles.content)}>
                <div
                    className={clsx({
                        [styles.title_container]: !!headingTitle,
                    })}
                >
                    {headingTitle && (
                        <>
                            <span>{/*placeholder*/}</span>
                            <h2
                                className={clsx(
                                    lng === SupportedLanguagesEnum.AR
                                        ? UthmanicFont.className
                                        : Graphik.className
                                )}
                            >
                                {headingTitle}
                            </h2>
                        </>
                    )}
                    <LinkTransparentButton to={`/${lng}`}>
                        {isDesktop ? (
                            <ScaleBgWrapper>
                                <CloseIcon />
                            </ScaleBgWrapper>
                        ) : (
                            <CloseIcon />
                        )}
                    </LinkTransparentButton>
                </div>
                {children}
            </div>
        </Link>
    );
}

export default ModalSpot;
