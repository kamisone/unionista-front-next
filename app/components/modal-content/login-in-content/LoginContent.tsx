'use client';

import React, { useEffect, useState } from 'react';
import '@/app/components/modal-content/login-in-content/LoginContent.css';
import ActionButton from '@/app/shared/action-button/ActionButton';
import InputControl from '@/app/shared/input-control/InputControl';
import TextInput from '@/app/shared/text-input/TextInput';
import CheckboxInput from '@/app/shared/checkbox-input/CheckboxInput';
import EyeIcon from '@/app/icons/eye/EyeIcon';
import GoogleIcon from '@/app/icons/google/GoogleIcon';
import { useForm } from 'react-hook-form';
import { AuthService } from '@/app/services/auth.service';

import clsx from 'clsx';
import Link from 'next/link';
import { useTranslation } from '@/app/i18n/client';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '@/app/i18n/settings';
import { Graphik, UthmanicFont } from '@/app/fonts/fonts';
import { usePathname, useRouter } from 'next/navigation';
import { ModalService } from '@/app/services/modal.service';
import FileUploader from '@/app/shared/file-uploader/FileUploader';
import { ModalContentMapping } from '@/app/utils/modal';

const authService = AuthService.getInstance();
const modalService = ModalService.getInstance();

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

const LoginContent = ({ lng }: LoginContentProps) => {
    const [isPassDiscovered, setIsPassDiscovered] = useState(false);

    const [isSwitched, setIsSwitched] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t } = useTranslation(lng, 'login_content');

    const [bottomModalContent, setBottomModalContent] = useState(
        modalService.state.currentModalContent
    );

    const isSignin = bottomModalContent == ModalContentMapping.SIGN_IN;

    const {
        register,
        handleSubmit,
        watch,
        setError,
        resetField,
        formState: { errors, dirtyFields, isValid },
    } = useForm<FormValues>({
        mode: 'all',
        defaultValues: { stayConnected: false, avatarFile: null },
    });

    const stayedConnected = watch('stayConnected');
    const uploadedUserAvatar = watch('avatarFile');

    useEffect(() => {
        setTimeout(() => {
            setIsSwitched(false);
        }, FADE_IN_ANIMATE_MS);
    }, []);

    // set notifiers
    useEffect(() => {
        modalService.addNotifier(
            (options) =>
                options &&
                setBottomModalContent(options.state.currentModalContent)
        );
    }, []);

    async function onSubmit(data: FormValues) {
        const signupData = {
            ...data,
            avatarFile: data.avatarFile ? data.avatarFile[0] : null,
        };
        setIsSubmitting(true);
        try {
            const response = isSignin
                ? await authService.signinUser(data)
                : await authService.signupUser(signupData);
            setIsSubmitting(false);
        } catch (_) {
            setError(
                'email',
                {
                    message: t('sign-in.server-errors.unauthorized'),
                },
                { shouldFocus: true }
            );
            resetField('password', { defaultValue: data.password });
            setIsSubmitting(false);
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
                    switched: isSwitched,
                }
            )}
        >
            <div className="sic_head">
                <h2>{isSignin ? t('sign-in.title') : t('sign-up.title')}</h2>

                <ActionButton
                    lng={lng}
                    onClick={() => {
                        setIsSwitched(true);
                        setTimeout(() => {
                            setIsSwitched(false);
                        }, FADE_IN_ANIMATE_MS);

                        modalService.state = {
                            currentModalContent: isSignin
                                ? ModalContentMapping.SIGN_UP
                                : ModalContentMapping.SIGN_IN,
                        };
                    }}
                    variant="secondary"
                    radius="pilled"
                    animationOnHover
                >
                    {isSignin
                        ? t('sign-in.sign-up-action')
                        : t('sign-up.sign-in-action')}
                </ActionButton>
            </div>
            <form noValidate>
                <div className="sic_input_container">
                    <label htmlFor="text-input-email">
                        {t('sign-in.email-label')}
                    </label>
                    <InputControl
                        lng={lng}
                        radius="rounded_1"
                        borderVariant="border_light"
                        insetShadow
                        fieldError={errors.email}
                        isDirty={!!dirtyFields['email']}
                    >
                        <TextInput
                            lng={lng}
                            register={register('email', {
                                required: {
                                    value: true,
                                    message: t(
                                        'sign-in.validation.email-empty'
                                    ),
                                },
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: t(
                                        'sign-in.validation.email-not-valid'
                                    ),
                                },
                            })}
                            isError={!!errors.email}
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
                            fieldError={errors.fullName}
                            isDirty={!!dirtyFields['fullName']}
                        >
                            <TextInput
                                lng={lng}
                                register={register('fullName', {
                                    required: {
                                        value: true,
                                        message: t(
                                            'sign-up.validation.full_name-empty'
                                        ),
                                    },
                                    minLength: {
                                        value: 4,
                                        message: t(
                                            'sign-up.validation.full_name-short'
                                        ),
                                    },
                                })}
                                isError={!!errors.fullName}
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
                        fieldError={errors.password}
                        isDirty={!!dirtyFields['password']}
                    >
                        <TextInput
                            lng={lng}
                            register={register('password', {
                                required: {
                                    value: true,
                                    message: t(
                                        'sign-in.validation.password-empty'
                                    ),
                                },
                                minLength: {
                                    value: 8,
                                    message: t(
                                        'sign-in.validation.password-short'
                                    ),
                                },
                            })}
                            isError={!!errors.password}
                            isIconBgActive={false}
                            labelId="text-input-password"
                            size="medium"
                            type={isPassDiscovered ? 'text' : 'password'}
                        >
                            <div
                                style={{ color: 'grey' }}
                                onClick={() =>
                                    setIsPassDiscovered(!isPassDiscovered)
                                }
                            >
                                <EyeIcon isPassDiscovered={isPassDiscovered} />
                            </div>
                        </TextInput>
                    </InputControl>
                </div>
                {!isSignin && (
                    <div className="sic_input_container">
                        <label htmlFor="avatar-uploader-id">
                            {t('sign-up.avatar-label')}
                        </label>
                        <FileUploader
                            uploadedFile={
                                uploadedUserAvatar?.[0]
                                    ? uploadedUserAvatar[0]
                                    : null
                            }
                            fileInputId="avatar-uploader-id"
                            variant="avatar"
                            lng={lng}
                            register={register('avatarFile', {})}
                        />
                    </div>
                )}
                <div className="sic_remember_me_container">
                    <div className="sic_remember_me_checkbox_container">
                        <CheckboxInput
                            register={register('stayConnected', {})}
                            size="medium"
                            variant="secondary"
                            radius="rounded_1"
                            labelId="sic_checkbox_id"
                            checked={stayedConnected}
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
                        href={'/forgot_password'}
                    >
                        {t('sign-in.forgot-password')}
                    </Link>
                </div>
                <ActionButton
                    lng={lng}
                    disabled={!isValid}
                    loading={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                    variant="primary"
                    fit="max"
                    radius="pilled"
                    animationOnHover
                >
                    {isSignin ? t('sign-in.title') : t('sign-up.action-title')}
                </ActionButton>
            </form>
            <p className="sic_divider">{t('sign-in.divider-title')}</p>
            <ActionButton
                lng={lng}
                onClick={() => {}}
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
