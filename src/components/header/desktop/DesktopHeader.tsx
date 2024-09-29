import styles from '@/components/header/desktop/DesktopHeader.module.css';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { i18nTranslation } from '@/i18n';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import BoSettingsIcon from '@/icons/bo-settings/BoSettingsIcon';
import CartIcon from '@/icons/cart/CartIcon';
import NotificationIcon from '@/icons/notification/NotificationIcon';
import SearchIcon from '@/icons/search-icon/SearchIcon';
import AvatarSlot from '@/shared/avatar-slot/AvatarSlot';
import InputControl from '@/shared/input-control/InputControl';
import LinkTransparentButton from '@/shared/link-transparent-button/LinkTransparentButton';
import ScaleBgWrapper from '@/shared/scale-bg-wrapper/ScaleBgWrapper';
import TextInput from '@/shared/text-input/TextInput';
import { modalContentNames } from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';
import clsx from 'clsx';
import Hamburger from '../../Hamburger/Hamburger';
import SwitchLanguage from '../../switch-language/SwitchLanguage';
import { JwtPayload } from '@/services/types/auth';

interface DesktopHeaderProps {
    lng: SupportedLanguages;
    userPayload: JwtPayload | null;
}

async function DesktopHeader({ lng, userPayload }: DesktopHeaderProps) {
    const t = i18nTranslation(lng, 'header');

    return (
        <>
            <header
                className={clsx(
                    styles.container,
                    'grid grid-cols-[auto_1fr_auto] gap-[clamp(1rem,2vw,2rem)]'
                )}
            >
                <div className={styles.logo}>
                    <LinkTransparentButton to="/">
                        <div className={'inline-block'}>
                            <img
                                className={'max-w-24'}
                                src="/assets/icons/unionista-logo2.png"
                                alt="logo"
                            />
                        </div>
                    </LinkTransparentButton>
                </div>
                <div
                    className={clsx(
                        styles['hamburger-search'],
                        'flex items-center gap-[clamp(1rem,2vw,2rem)]'
                    )}
                >
                    <LinkTransparentButton
                        isProtected
                        addQuerySearch={{
                            key: modalContentNames.QUERY_NAME,
                            value: ModalContentMapping.MENU_DRAWER,
                        }}
                    >
                        <div
                            className={clsx(
                                'flex items-center relative',
                                'onhover_bg_grey'
                            )}
                        >
                            <Hamburger />
                            <span className={'first-letter:uppercase'}>
                                {t('hamburger.label')}
                            </span>
                        </div>
                    </LinkTransparentButton>
                    <div className={'grow-[1]'}>
                        <InputControl
                            lng={lng}
                            radius="pilled"
                            isFormChild={false}
                        >
                            <TextInput
                                lng={lng}
                                iconGap="large"
                                size="medium"
                                placeholder={t('search-input-placeholder')}
                                name="search"
                                isIconBgActive
                            >
                                <SearchIcon />
                            </TextInput>
                        </InputControl>
                    </div>
                </div>
                <ul
                    className={clsx(
                        styles['nav-bar'],
                        'flex items-center justify-between gap-[clamp(0.5rem,2vw,1.5rem)] ml-auto list-none',
                        lng === SupportedLanguagesEnum.AR
                            ? `${UthmanicFont.className} ml-[revert] mr-auto`
                            : Graphik.className
                    )}
                >
                    {!userPayload && (
                        <LinkTransparentButton
                            addQuerySearch={{
                                key: modalContentNames.QUERY_NAME,
                                value: ModalContentMapping.SIGN_IN,
                            }}
                        >
                            <button className="py-2 px-3 onhover_bg_grey hover:cursor-pointer">
                                {t('sign-in.title')}
                            </button>
                        </LinkTransparentButton>
                    )}
                    <li>
                        <SwitchLanguage lng={lng} />
                    </li>
                    <li
                        className={'grid place-content-center relative'}
                        style={{
                            // @ts-ignore
                            '--nav-icon-title': `"${t('icons.hover.admin')}"`,
                        }}
                    >
                        <LinkTransparentButton
                            to={`/${lng}/admin`}
                            utilityClasses="leading-[0]"
                        >
                            <ScaleBgWrapper>
                                <BoSettingsIcon size={24} />
                            </ScaleBgWrapper>
                        </LinkTransparentButton>
                    </li>
                    <li className={'grid place-content-center relative'}>
                        <LinkTransparentButton
                            to={`/${lng}/notifications`}
                            utilityClasses="leading-[0]"
                        >
                            <ScaleBgWrapper>
                                <NotificationIcon size={24} />
                            </ScaleBgWrapper>
                        </LinkTransparentButton>
                    </li>
                    <li className={'grid place-content-center relative'}>
                        <LinkTransparentButton
                            to={`/${lng}/cart`}
                            utilityClasses="leading-[0]"
                        >
                            <ScaleBgWrapper>
                                <CartIcon size={24} />
                            </ScaleBgWrapper>
                        </LinkTransparentButton>
                    </li>
                    {userPayload && (
                        <li>
                            <AvatarSlot
                                content={
                                    <img
                                        src="/assets/icons/unionista-logo2.png"
                                        alt="unionistashop logo"
                                    />
                                }
                            />
                        </li>
                    )}
                </ul>
            </header>
        </>
    );
}

export default DesktopHeader;
