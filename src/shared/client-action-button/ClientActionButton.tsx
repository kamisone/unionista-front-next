'use client';

import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import './ClientActionButton.css';
import clsx from 'clsx';
import LoadingIndicator from '../loading-indicator/LoadingIndicator';
import Link from 'next/link';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';

interface ClientActionButtonProps {
    lng: SupportedLanguages;
    radius?: 'rounded' | 'pilled';
    boxShadow?: boolean;
    to?: string;
    children: ReactNode[] | ReactNode | string;
    variant?: 'primary' | 'secondary';
    fit?: 'min' | 'max';
    animationOnHover?: boolean;
    disabled?: boolean;
    isSubmit?: boolean;
    isFail: boolean
}

interface ClientActionButtonState {
    isLoading: boolean;
}

export default class ClientActionButton extends React.Component<
    ClientActionButtonProps,
    ClientActionButtonState
> {
    //  {
    //     lng,
    //     radius,
    //     variant,
    //     boxShadow = false,
    //     to = '/',
    //     children,
    //     fit = 'min',
    //     animationOnHover = false,
    //     disabled = false,
    //     loading = false,
    //     isSubmit,
    // } = this.props;
    // lng = this.props.lng;

    state: ClientActionButtonState = {
        isLoading: false,
    };

    render() {
        return this.props.to ? (
            <Link
                data-disabled={this.props.disabled}
                href={this.props.to}
                className={clsx(
                    'cab_container',
                    this.props.radius,
                    this.props.variant,
                    this.props.fit,
                    {
                        'box-shadow': this.props.boxShadow,
                        animated: this.props.animationOnHover,
                    }
                )}
            >
                {this.props.children}
            </Link>
        ) : (
            <button
                onClick={() => {
                    this.setState({
                        isLoading: true,
                    });
                }}
                type={this.props.isSubmit ? 'submit' : 'button'}
                disabled={this.props.disabled}
                className={clsx(
                    'cab_container',
                    this.props.lng,
                    this.props.lng === SupportedLanguagesEnum.AR
                        ? UthmanicFont.className
                        : Graphik.className,
                    this.props.radius,
                    this.props.variant,
                    this.props.fit,
                    {
                        'box-shadow': this.props.boxShadow,
                        animated: this.props.animationOnHover,
                    }
                )}
            >
                {this.state.isLoading && !this.props.isFail? (
                    <LoadingIndicator size="1.25rem" />
                ) : (
                    this.props.children
                )}
            </button>
        );
    }
}
