import styles from '@/components/modal-content/login-in-content/LoginContent.module.css';
import EyeIcon from '@/icons/eye/EyeIcon';
import GoogleIcon from '@/icons/google/GoogleIcon';
import { AuthService, UserWithTokens } from '@/services/server/auth.service';
import ActionButton from '@/shared/action-button/ActionButton';
import CheckboxInput from '@/shared/checkbox-input/CheckboxInput';
import InputControl from '@/shared/input-control/InputControl';
import TextInput from '@/shared/text-input/TextInput';

import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { i18nTranslation } from '@/i18n';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import TraitIcon from '@/icons/eye/trait/TraitIcon';
import { SnackbarSeverity } from '@/services/snackbar.service';
import ClientActionButton from '@/shared/client-action-button/ClientActionButton';
import LinkTransparentButton from '@/shared/link-transparent-button/LinkTransparentButton';
import {
    accessTokenNames,
    CURRENT_USER_COOKIE_NAME,
    modalContentNames,
    PATHNAME_HEADER_NAME,
    PENDING_REDIRECT_PATH_NAME,
    TOAST_COOKIE_NAME,
} from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';
import clsx from 'clsx';
import { cookies, headers } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';
import { stripQueryParamFromUrl } from '@/utils/query-params';

const authService = AuthService.instance;

export type FormValues = {
    email: string;
    password: string;
    fullName: string;
    stayConnected: boolean;
    avatarFile: FileList | null;
};

interface LoginContentProps {
    lng: SupportedLanguages;
}

const LoginContent = async function ({ lng }: LoginContentProps) {
    const t = i18nTranslation(lng, 'login_content');

    const currentModalContent = headers().get(
        modalContentNames.HEADER_NAME
    ) as ModalContentMapping | null;

    const pathWithSearch = headers().get(PATHNAME_HEADER_NAME) || '';

    const isSignin = currentModalContent == ModalContentMapping.SIGN_IN;

    async function submit(formData: FormData) {
        'use server';
        const email = formData.get('email');
        const password = formData.get('password');
        const fullName = formData.get('full_name');
        const avatar = formData.get('avatar');

        async function onSignSuccess(response: UserWithTokens) {
            if (response) {
                cookies().set(
                    accessTokenNames.ACCESS_TOKEN,
                    response.accessToken,
                    {
                        httpOnly: true,
                        path: '/',
                        secure: true,
                        maxAge: 99999999,
                    }
                );
                cookies().set(
                    accessTokenNames.REFRESH_TOKEN,
                    response.refreshToken,
                    {
                        httpOnly: true,
                        path: '/',
                        secure: true,
                        maxAge: 99999999,
                    }
                );
                cookies().set(
                    CURRENT_USER_COOKIE_NAME,
                    JSON.stringify(
                        (await AuthService.verifyJwt(response.accessToken))
                            .payload
                    )
                );

                cookies().set(
                    TOAST_COOKIE_NAME,
                    JSON.stringify({
                        message: 'successfully connected',
                        severity: SnackbarSeverity.SUCCESS,
                    })
                );
            }
        }

        const response: { success: boolean; message?: string } = await (isSignin
            ? authService.signinUser(
                  {
                      email,
                      password,
                  },
                  onSignSuccess
              )
            : authService.signupUser(
                  {
                      email,
                      password,
                      fullName,
                      avatarFile: avatar,
                  },
                  onSignSuccess
              ));

        if (response.success) {
            
            const redirectTo = cookies().get(PENDING_REDIRECT_PATH_NAME);
            if (redirectTo) {
                cookies().set(PENDING_REDIRECT_PATH_NAME, '', { maxAge: 0 });
                return redirect(redirectTo.value, RedirectType.replace);
            }
            return redirect(
                stripQueryParamFromUrl(
                    pathWithSearch,
                    modalContentNames.QUERY_NAME
                ),
                RedirectType.replace
            );
        }

        // Error notification
        cookies().set(
            TOAST_COOKIE_NAME,
            JSON.stringify({
                message: response.message,
                severity: SnackbarSeverity.SUCCESS,
            })
        );

        return redirect(pathWithSearch);
    }

    return (
        <div
            className={clsx(
                styles.container,
                'overflow-y-scroll p-4 grid content-start gap-4',
                lng === SupportedLanguagesEnum.AR
                    ? UthmanicFont.className
                    : Graphik.className
            )}
        >
            <div className={'flex items-center justify-between'}>
                <h2 className="text-lg font-normal first-letter:uppercase">
                    {isSignin ? t('sign-in.title') : t('sign-up.title')}
                </h2>

                <LinkTransparentButton
                    addQuerySearch={{
                        key: modalContentNames.QUERY_NAME,
                        value:
                            currentModalContent === ModalContentMapping.SIGN_IN
                                ? ModalContentMapping.SIGN_UP
                                : ModalContentMapping.SIGN_IN,
                    }}
                >
                    <ActionButton
                        variant="secondary"
                        radius="pilled"
                        animationOnHover
                        lng={lng}
                    >
                        {isSignin
                            ? t('sign-in.sign-up-action')
                            : t('sign-up.sign-in-action')}
                    </ActionButton>
                </LinkTransparentButton>
            </div>
            <form noValidate action={submit} className="grid gap-4">
                <div className={'input-container'}>
                    <label
                        className="block text-sm mb-1 first-letter:uppercase"
                        htmlFor="text-input-email"
                    >
                        {t('sign-in.email-label')}
                    </label>
                    <InputControl
                        lng={lng}
                        radius="rounded_1"
                        borderVariant="border_light"
                        insetShadow
                    >
                        <TextInput
                            lng={lng}
                            name="email"
                            labelId="text-input-email"
                            size="medium"
                        />
                    </InputControl>
                </div>
                {!isSignin && (
                    <div className={''}>
                        <label
                            className="block text-sm mb-1 first-letter:uppercase"
                            htmlFor="text-input-full_name"
                        >
                            {t('sign-up.full_name')}
                        </label>
                        <InputControl
                            lng={lng}
                            radius="rounded_1"
                            borderVariant="border_light"
                            insetShadow
                            // fieldError={errors.fullName}
                            // isDirty={!!dirtyFields['fullName']}
                        >
                            <TextInput
                                lng={lng}
                                name="full_name"
                                labelId="text-input-full_name"
                                size="medium"
                            />
                        </InputControl>
                    </div>
                )}
                <div className={''}>
                    <label
                        className="block text-sm mb-1 first-letter:uppercase"
                        htmlFor="text-input-password"
                    >
                        {t('sign-in.password-label')}
                    </label>
                    <InputControl
                        lng={lng}
                        radius="rounded_1"
                        borderVariant="border_light"
                        insetShadow
                    >
                        <TextInput
                            lng={lng}
                            name="password"
                            isIconBgActive={true}
                            labelId="text-input-password"
                            size="medium"
                            type="switchable"
                            switch={
                                <div
                                    className={
                                        'relative [&>*:nth-child(2)]:absolute [&>*:nth-child(2)]:inset-0'
                                    }
                                >
                                    <EyeIcon />
                                    <TraitIcon />
                                </div>
                            }
                        >
                            <EyeIcon />
                        </TextInput>
                    </InputControl>
                </div>
                {!isSignin && (
                    <div className={''}>
                        <label
                            className="block text-sm mb-1 first-letter:uppercase"
                            htmlFor="avatar-uploader-id"
                        >
                            {t('sign-up.avatar-label')}
                        </label>
                        <input type="file" name="avatar" />
                        {/* <FileUploader
                            uploadedFile={
                                // uploadedUserAvatar?.[0]
                                //     ? uploadedUserAvatar[0]
                                //     : null
                                null
                            }
                            fileInputId="avatar-uploader-id"
                            variant="avatar"
                            lng={lng}
                            // register={register('avatarFile', {})}
                        /> */}
                    </div>
                )}
                <div className={'flex items-center justify-between'}>
                    <div className={'flex items-start gap-2'}>
                        <CheckboxInput
                            size="medium"
                            variant="secondary"
                            radius="rounded_1"
                            labelId="sic_checkbox_id"
                            checked
                        />
                        <label
                            className="block text-sm mb-1 first-letter:uppercase font-light text-[clamp(0.5rem,4vw,1rem)]"
                            htmlFor="sic_checkbox_id"
                        >
                            {isSignin
                                ? t('sign-in.remember-me')
                                : t('sign-up.receive-newsletter.title')}
                        </label>
                    </div>
                    <LinkTransparentButton to={`/${lng}/forgot-password`}>
                        <span
                            className={
                                'text-neutral-grey font-light text-[clamp(0.5rem,4vw,1rem)] text-end text-nowrap underline'
                            }
                        >
                            {t('sign-in.forgot-password')}
                        </span>
                    </LinkTransparentButton>
                </div>
                <ClientActionButton
                    lng={lng}
                    // disabled={!isValid}
                    variant="primary"
                    fit="max"
                    radius="pilled"
                    animationOnHover
                    isSubmit
                >
                    {isSignin ? t('sign-in.title') : t('sign-up.action-title')}
                </ClientActionButton>
            </form>
            <span
                className={clsx(
                    'relative my-8 w-fit mx-auto px-2 text-charcoal-grey uppercase ',
                    styles.divider
                )}
            >
                {t('sign-in.divider-title')}
            </span>
            <ActionButton
                lng={lng}
                variant="secondary"
                fit="max"
                radius="pilled"
                animationOnHover
            >
                <span className={'flex items-center justify-center gap-2'}>
                    <GoogleIcon />
                    {t('sign-in.sso-google-title')}
                </span>
            </ActionButton>
        </div>
    );
};

export default LoginContent;
