import Hamburger from '@/components/Hamburger/Hamburger';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { i18nTranslation } from '@/i18n';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import BoSettingsIcon from '@/icons/bo-settings/BoSettingsIcon';
import CartIcon from '@/icons/cart/CartIcon';
import NotificationIcon from '@/icons/notification/NotificationIcon';
import SearchIcon from '@/icons/search-icon/SearchIcon';
import InputControl from '@/shared/input-control/InputControl';
import LinkTransparentButton from '@/shared/link-transparent-button/LinkTransparentButton';
import TextInput from '@/shared/text-input/TextInput';
import { ModalContentMapping } from '@/utils/modal';
import clsx from 'clsx';
import SwitchLanguage from '../../switch-language/SwitchLanguage';
import { modalContentNames } from '@/utils/constants';

interface HeaderProps {
    lng: SupportedLanguages;
    user: any;
}

const MobileHeader = ({ lng, user }: HeaderProps) => {
    const t = i18nTranslation(lng, 'header');

    return (
        <div className={'relative z-[1]'}>
            <div className={'flex justify-between items-center flex-wrap'}>
                <figure>
                    <img
                        className={'max-w-20'}
                        src="/assets/icons/unionista-logo2.png"
                        alt="logo"
                    />
                </figure>
                <ul
                    className={clsx(
                        'flex items-center justify-between ml-auto list-none',
                        lng === SupportedLanguagesEnum.AR
                            ? `${UthmanicFont.className} ml-[revert] mr-auto`
                            : Graphik.className
                    )}
                >
                    {!user && (
                        <LinkTransparentButton
                            addQuerySearch={{
                                key: modalContentNames.QUERY_NAME,
                                value: ModalContentMapping.SIGN_IN,
                            }}
                        >
                            <span
                                className={clsx(
                                    'p-2',
                                    'text-[clamp(0.65rem,3.5vw,1rem)]'
                                )}
                            >
                                {t('sign-in.title')}
                            </span>
                        </LinkTransparentButton>
                    )}
                    <li className={clsx('relative p-2')}>
                        <SwitchLanguage lng={lng} />
                    </li>
                    <li
                        style={{
                            // @ts-ignore
                            '--nav-icon-title': `"${t('icons.hover.admin')}"`,
                        }}
                        className={clsx('relative p-2')}
                    >
                        <LinkTransparentButton
                            isProtected
                            to={`/${lng}/admin`}
                            utilityClasses="inline-block leading-[0]"
                        >
                            <BoSettingsIcon />
                        </LinkTransparentButton>
                    </li>
                    <li className={clsx('relative p-2')}>
                        <LinkTransparentButton
                            to={`/${lng}/notifications`}
                            utilityClasses="inline-block leading-[0]"
                        >
                            <NotificationIcon />
                        </LinkTransparentButton>
                    </li>
                    <li className={clsx('relative p-2')}>
                        <LinkTransparentButton
                            to={`/${lng}/cart`}
                            utilityClasses="inline-block leading-[0]"
                        >
                            <CartIcon />
                        </LinkTransparentButton>
                    </li>
                </ul>
            </div>
            {/* sub part */}
            <div
                className={
                    'grid grid-cols-[auto_1fr] content-center gap-[clamp(0rem,1.2vw,1rem)]'
                }
            >
                <LinkTransparentButton
                    isProtected
                    addQuerySearch={{
                        key: modalContentNames.QUERY_NAME,
                        value: ModalContentMapping.MENU_DRAWER,
                    }}
                >
                    <Hamburger />
                </LinkTransparentButton>

                <InputControl lng={lng} radius="pilled" isFormChild={false}>
                    <TextInput
                        lng={lng}
                        iconGap="large"
                        size="medium"
                        placeholder={t('search-input-placeholder')}
                        name=""
                        isIconBgActive
                    >
                        <SearchIcon />
                    </TextInput>
                </InputControl>
            </div>
        </div>
    );
};

export default MobileHeader;
