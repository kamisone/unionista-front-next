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
import { SnackbarSeverity } from '@/services/snackbar.service';
import ClientActionButton from '@/shared/client-action-button/ClientActionButton';
import {
    accessTokenNames,
    CURRENT_USER_COOKIE_NAME,
    modalContentNames,
    PENDING_REDIRECT_PATH_NAME,
    TOAST_COOKIE_NAME,
} from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';
import clsx from 'clsx';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';
import { redirect, RedirectType } from 'next/navigation';
import LinkTransparentButton from '@/shared/link-transparent-button/LinkTransparentButton';
import TraitIcon from '@/icons/eye/trait/TraitIcon';

const authService = AuthService.instance;

const FADE_IN_ANIMATE_MS = 700; // 700ms;

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
            return redirect(`/${lng}`, RedirectType.replace);
        }

        // Error notification
        cookies().set(
            TOAST_COOKIE_NAME,
            JSON.stringify({
                message: response.message,
                severity: SnackbarSeverity.SUCCESS,
            })
        );

        return redirect(
            `/${lng}?modal_content=${isSignin ? 'signin' : 'signup'}`
        );
    }

    return (
        <div
            className={clsx(
                styles.container,
                lng,
                lng === SupportedLanguagesEnum.AR
                    ? UthmanicFont.className
                    : Graphik.className
            )}
        >
            <div className={styles.head}>
                <h2>{isSignin ? t('sign-in.title') : t('sign-up.title')}</h2>

                <LinkTransparentButton
                    to={`/${lng}?modal_content=${
                        currentModalContent === ModalContentMapping.SIGN_IN
                            ? ModalContentMapping.SIGN_UP
                            : ModalContentMapping.SIGN_IN
                    }`}
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
            <form noValidate action={submit}>
                <div className={styles['input-container']}>
                    <label htmlFor="text-input-email">
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
                    <div className={styles['input-container']}>
                        <label htmlFor="text-input-full_name">
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
                <div className={styles['input-container']}>
                    <label htmlFor="text-input-password">
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
                            switch={<div className={styles['eye-switch']}><EyeIcon/><TraitIcon/></div>}
                        >
                            <EyeIcon />
                        </TextInput>
                    </InputControl>
                </div>
                {!isSignin && (
                    <div className={styles['input-container']}>
                        <label htmlFor="avatar-uploader-id">
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
                <div className={styles['rememberme-container']}>
                    <div className={styles['rememberme-checkbox-container']}>
                        <CheckboxInput
                            size="medium"
                            variant="secondary"
                            radius="rounded_1"
                            labelId="sic_checkbox_id"
                            checked
                        />
                        <label htmlFor="sic_checkbox_id">
                            {isSignin
                                ? t('sign-in.remember-me')
                                : t('sign-up.receive-newsletter.title')}
                        </label>
                    </div>
                    <LinkTransparentButton to={`/${lng}/forgot-password`}>
                        <span className={styles['forgot-password']}>
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

                {/* <button type="submit">
                    {isSignin ? t('sign-in.title') : t('sign-up.action-title')}
                </button> */}
            </form>
            <p className={styles.divider}>{t('sign-in.divider-title')}</p>
            <ActionButton
                lng={lng}
                variant="secondary"
                fit="max"
                radius="pilled"
                animationOnHover
            >
                <span className={styles['sso-google']}>
                    <GoogleIcon />
                    {t('sign-in.sso-google-title')}
                </span>
            </ActionButton>
        </div>
    );
};

export default LoginContent;
