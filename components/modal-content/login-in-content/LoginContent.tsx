import React, { useEffect, useState } from 'react';
import 'components/modal-content/login-in-content/LoginContent.css';
import { useTranslation } from 'react-i18next';
import ActionButton from '@/shared/action-button/ActionButton';
import InputControl from '@/shared/input-control/InputControl';
import TextInput from '@/shared/text-input/TextInput';
import CheckboxInput from '@/shared/checkbox-input/CheckboxInput';
import EyeIcon from '@/icons/eye/EyeIcon';
import GoogleIcon from '@/icons/google/GoogleIcon';
// import { AuthService } from 'services/auth.service';
import { useForm } from 'react-hook-form';
import { AuthService } from '@/services/auth.service';

import { useDispatch, useSelector } from 'react-redux';
import { ModalContentMapping } from '@/utils/bottom-modal';
import { updateModalContent } from '@/lib/features/header/headerSlice';
import clsx from 'clsx';
import { RootState, useAppSelector } from '@/lib/store';
import Link from 'next/link';

const authService = AuthService.getInstance();

const FADE_IN_ANIMATE_MS = 700; // 700ms;

type FormValues = {
    email: string;
    password: string;
    fullName: string;
    stayConnected: boolean;
};

const LoginContent = () => {
    const { t } = useTranslation();
    const [isPassDiscovered, setIsPassDiscovered] = useState(false);
    const dispatch = useDispatch();
    const headerState = useAppSelector((state) => state.header);
    const isSignin = headerState.currentContent == ModalContentMapping.SIGN_IN;
    const [isSwitched, setIsSwitched] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        resetField,
        formState: { errors, dirtyFields, isValid },
    } = useForm<FormValues>({
        mode: 'all',
        defaultValues: { stayConnected: false },
    });

    const stayedConnected = watch('stayConnected');

    useEffect(() => {
        setTimeout(() => {
            setIsSwitched(false);
        }, FADE_IN_ANIMATE_MS);
    }, []);

    async function onSubmit(data: FormValues) {
        console.log('called: ', data);
        setIsSubmitting(true);
        try {
            const response = isSignin
                ? await authService.signinUser(data)
                : await authService.signupUser(data);
            console.log('reponse: ', response);
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
            className={clsx('sic_container', {
                switched: isSwitched,
            })}
        >
            <div className="sic_head">
                <h2>{isSignin ? t('sign-in.title') : t('sign-up.title')}</h2>

                <ActionButton
                    onClick={() => {
                        setIsSwitched(true);
                        setTimeout(() => {
                            setIsSwitched(false);
                        }, FADE_IN_ANIMATE_MS);
                        dispatch(
                            isSignin
                                ? updateModalContent(
                                      ModalContentMapping.SIGN_UP
                                  )
                                : updateModalContent(
                                      ModalContentMapping.SIGN_IN
                                  )
                        );
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
                        radius="rounded_1"
                        borderVariant="border_light"
                        insetShadow
                        fieldError={errors.email}
                        isDirty={!!dirtyFields['email']}
                    >
                        <TextInput
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
                            radius="rounded_1"
                            borderVariant="border_light"
                            insetShadow
                            fieldError={errors.fullName}
                            isDirty={!!dirtyFields['fullName']}
                        >
                            <TextInput
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
                                            'sign-up.validation.full_name-short',
                                            { minLength: 4 }
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
                        radius="rounded_1"
                        borderVariant="border_light"
                        insetShadow
                        fieldError={errors.password}
                        isDirty={!!dirtyFields['password']}
                    >
                        <TextInput
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
                                        'sign-in.validation.password-short',
                                        { minLength: 8 }
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
