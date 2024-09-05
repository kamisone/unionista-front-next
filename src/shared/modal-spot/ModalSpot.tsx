import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import CloseIcon from '@/icons/close-icon/CloseIcon';
import { AuthService } from '@/services/auth.service';
import { ModalService } from '@/services/modal.service';
import ScaleBgWrapper from '@/shared/scale-bg-wrapper/ScaleBgWrapper';
import clsx from 'clsx';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { ReactNode } from 'react';
import './ModalSpot.css';
import LinkTransparentButton from '../link-transparent-button/LinkTransparentButton';
// import ScaleBgWrapper from 'shared/scale-bg-wrapper/ScaleBgWrapper';

const authService = AuthService.instance;
const modalService = ModalService.instance;

// interface ModalService extends ComponentsStateNotify<any, any> {}

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
    // const { t } = useTranslation();
    // const [isDrawerQuitting, setIsDrawerQuitting] = useState(false);
    // const [ModalContent, setModalContent] = useState(
    //     modalService.state.currentModalContent
    // );

    // const onCloseDrawer = (duration = 300) => {
    //     // if (
    //     //     (
    //     //         [
    //     //             ModalContentMapping.SIGN_IN,
    //     //             ModalContentMapping.SIGN_UP,
    //     //         ] as (ModalContentMapping | null)[]
    //     //     ).includes(bottomModalContent)
    //     // ) {
    //     //     authService.state = {
    //     //         isUserNotifiedToSignin: true,
    //     //     };
    //     // }
    //     setIsDrawerQuitting(true);
    //     setTimeout(() => {
    //         modalService.state = {
    //             isModalOpen: false,
    //             currentModalContent: null,
    //         };
    //     }, duration);
    // };

    // set notifiers
    // useEffect(() => {
    //     modalService.addNotifier(
    //         (options) =>
    //             options && setModalContent(options.state.currentModalContent)
    //     );
    // }, []);

    function removeQueryParam(path: string, param: string) {
        // path.replace()
    }

    return (
        <div
            className={clsx('ms_container', animationDirection, {
                // ms_quitting: isDrawerQuitting,
                is_desktop: isDesktop,
            })}
            // onClick={() => onCloseDrawer()}
        >
            <div
                className={clsx('ms_content')}
                // onClick={(e) => e.stopPropagation()}
            >
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
                                {/* {t('drawer.title')} */}
                                {headingTitle}
                            </h2>
                        </>
                    )}
                    {/* <Link
                        href={`/${lng}`}
                        className={clsx('ms_close_icon', {
                            floating: !headingTitle,
                        })}
                    >
                        <ScaleBgWrapper
                            Icon={<CloseIcon />}
                            // onClick={() => onCloseDrawer()}
                        />
                    </Link> */}
                    <LinkTransparentButton to={`/${lng}`}>
                        <ScaleBgWrapper
                            Icon={<CloseIcon />}
                            // onClick={() => onCloseDrawer()}
                        />
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
