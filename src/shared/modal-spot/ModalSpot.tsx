import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import CloseIcon from '@/icons/close-icon/CloseIcon';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { ReactNode } from 'react';
import LinkTransparentButton from '../link-transparent-button/LinkTransparentButton';
import './ModalSpot.css';

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
        <div
            className={clsx('ms_container', animationDirection, {
                is_desktop: isDesktop,
            })}
        >
            <div className={clsx('ms_content')}>
                <div className={clsx({ ms_title_container: !!headingTitle })}>
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
                        <CloseIcon />
                    </LinkTransparentButton>
                </div>
                {children}
            </div>
        </div>
    );
}

ModalSpot.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ModalSpot;
