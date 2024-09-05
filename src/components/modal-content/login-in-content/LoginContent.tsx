import '@/components/modal-content/login-in-content/LoginContent.css';
import EyeIcon from '@/icons/eye/EyeIcon';
import GoogleIcon from '@/icons/google/GoogleIcon';
import { AuthService, UserWithTokens } from '@/services/server/auth.service';
import ActionButton from '@/shared/action-button/ActionButton';
import CheckboxInput from '@/shared/checkbox-input/CheckboxInput';
import InputControl from '@/shared/input-control/InputControl';
import TextInput from '@/shared/text-input/TextInput';

import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { useTranslation } from '@/i18n';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import {
    accessTokenNames,
    modalContentNames,
    PENDING_REDIRECT_PATH_NAME,
} from '@/utils/constants';
import { ModalContentMapping } from '@/utils/modal';
import clsx from 'clsx';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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
    const { t } = await useTranslation(lng, 'login_content');

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

        let response: UserWithTokens | undefined;
        try {
            response = await (isSignin
                ? authService.signinUser({
                      email,
                      password,
                  })
                : authService.signupUser({
                      email,
                      password,
                      fullName,
                      avatarFile: avatar,
                  }));
        } catch (_) {
            console.log('error: ', _);
        } finally {
            if (response) {
                cookies().set(
                    accessTokenNames.ACCESS_TOKEN,
                    response?.accessToken,
                    {
                        httpOnly: true,
                        path: '/',
                        secure: true,
                        maxAge: 99999999,
                    }
                );
                cookies().set(
                    accessTokenNames.REFRESH_TOKEN,
                    response?.refreshToken,
                    {
                        httpOnly: true,
                        path: '/',
                        secure: true,
                        maxAge: 99999999,
                    }
                );
            }
            const redirectTo = cookies().get(PENDING_REDIRECT_PATH_NAME);
            if (redirectTo) {
                cookies().set(PENDING_REDIRECT_PATH_NAME, '', { maxAge: 0 });
                return redirect(redirectTo.value);
            }
            return redirect(`/${lng}`);
        }
    }

    return (
        <div
            className={clsx(
                'sic_container',
                lng,
                lng === SupportedLanguagesEnum.AR
                    ? UthmanicFont.className
                    : Graphik.className,
                {
                    // switched: isSwitched,
                }
            )}
        >
            <div className="sic_head">
                <h2>{isSignin ? t('sign-in.title') : t('sign-up.title')}</h2>

                <ActionButton
                    to={`/${lng}?modal_content=${
                        currentModalContent === ModalContentMapping.SIGN_IN
                            ? ModalContentMapping.SIGN_UP
                            : ModalContentMapping.SIGN_IN
                    }`}
                    lng={lng}
                    // onClick={() => {
                    //     setIsSwitched(true);
                    //     setTimeout(() => {
                    //         setIsSwitched(false);
                    //     }, FADE_IN_ANIMATE_MS);

                    //     modalService.state = {
                    //         currentModalContent: isSignin
                    //             ? ModalContentMapping.SIGN_UP
                    //             : ModalContentMapping.SIGN_IN,
                    //     };
                    // }}
                    variant="secondary"
                    radius="pilled"
                    animationOnHover
                >
                    {isSignin
                        ? t('sign-in.sign-up-action')
                        : t('sign-up.sign-in-action')}
                </ActionButton>
            </div>
            <form noValidate action={submit}>
                <div className="sic_input_container">
                    <label htmlFor="text-input-email">
                        {t('sign-in.email-label')}
                    </label>
                    <InputControl
                        lng={lng}
                        radius="rounded_1"
                        borderVariant="border_light"
                        insetShadow
                        // fieldError={errors.email}
                        // isDirty={!!dirtyFields['email']}
                    >
                        <TextInput
                            lng={lng}
                            name="email"
                            // register={register('email', {
                            //     required: {
                            //         value: true,
                            //         message: t(
                            //             'sign-in.validation.email-empty'
                            //         ),
                            //     },
                            //     pattern: {
                            //         value: /\S+@\S+\.\S+/,
                            //         message: t(
                            //             'sign-in.validation.email-not-valid'
                            //         ),
                            //     },
                            // })}
                            // isError={!!errors.email}
                            labelId="text-input-email"
                            size="medium"
                        />
                    </InputControl>
                </div>
                {!isSignin && (
                    <div className="sic_input_container">
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
                                // register={register('fullName', {
                                //     required: {
                                //         value: true,
                                //         message: t(
                                //             'sign-up.validation.full_name-empty'
                                //         ),
                                //     },
                                //     minLength: {
                                //         value: 4,
                                //         message: t(
                                //             'sign-up.validation.full_name-short'
                                //         ),
                                //     },
                                // })}
                                // isError={!!errors.fullName}
                                labelId="text-input-full_name"
                                size="medium"
                            />
                        </InputControl>
                    </div>
                )}
                <div className="sic_input_container">
                    <label htmlFor="text-input-password">
                        {t('sign-in.password-label')}
                    </label>
                    <InputControl
                        lng={lng}
                        radius="rounded_1"
                        borderVariant="border_light"
                        insetShadow
                        // fieldError={errors.password}
                        // isDirty={!!dirtyFields['password']}
                    >
                        <TextInput
                            lng={lng}
                            name="password"
                            // register={register('password', {
                            //     required: {
                            //         value: true,
                            //         message: t(
                            //             'sign-in.validation.password-empty'
                            //         ),
                            //     },
                            //     minLength: {
                            //         value: 8,
                            //         message: t(
                            //             'sign-in.validation.password-short'
                            //         ),
                            //     },
                            // })}
                            // isError={!!errors.password}
                            isIconBgActive={false}
                            labelId="text-input-password"
                            size="medium"
                            // type={isPassDiscovered ? 'text' : 'password'}
                        >
                            <div
                                style={{ color: 'grey' }}
                                // onClick={() =>
                                //     setIsPassDiscovered(!isPassDiscovered)
                                // }
                            >
                                <EyeIcon
                                    // isPassDiscovered={isPassDiscovered}
                                    isPassDiscovered={false}
                                />
                            </div>
                        </TextInput>
                    </InputControl>
                </div>
                {!isSignin && (
                    <div className="sic_input_container">
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
                <div className="sic_remember_me_container">
                    <div className="sic_remember_me_checkbox_container">
                        <CheckboxInput
                            // register={register('stayConnected', {})}
                            size="medium"
                            variant="secondary"
                            radius="rounded_1"
                            labelId="sic_checkbox_id"
                            // checked={stayedConnected}
                            checked
                        />
                        <label
                            className="sic_remember_me_label"
                            htmlFor="sic_checkbox_id"
                        >
                            {isSignin
                                ? t('sign-in.remember-me')
                                : t('sign-up.receive-newsletter.title')}
                        </label>
                    </div>
                    <Link
                        className="sic_forgot_password"
                        href={`/${lng}/forgot_password`}
                    >
                        {t('sign-in.forgot-password')}
                    </Link>
                </div>
                {/* <ActionButton
                    lng={lng}
                    // disabled={!isValid}
                    // loading={isSubmitting}
                    // onClick={handleSubmit(onSubmit)}
                    variant="primary"
                    fit="max"
                    radius="pilled"
                    animationOnHover
                >
                    {isSignin ? t('sign-in.title') : t('sign-up.action-title')}
                </ActionButton> */}
                <button type="submit">
                    {isSignin ? t('sign-in.title') : t('sign-up.action-title')}
                </button>
            </form>
            <p className="sic_divider">{t('sign-in.divider-title')}</p>
            <ActionButton
                lng={lng}
                // onClick={() => {}}
                variant="secondary"
                fit="max"
                radius="pilled"
                animationOnHover
            >
                <span className="sic_sso_google">
                    <GoogleIcon />
                    {t('sign-in.sso-google-title')}
                </span>
            </ActionButton>
        </div>
    );
};

export default LoginContent;
