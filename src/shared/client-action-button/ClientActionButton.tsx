'use client';

import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import clsx from 'clsx';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import LoadingIndicator from '../loading-indicator/LoadingIndicator';
import './ClientActionButton.css';
import { SnackbarService } from '@/services/browser/snackbar.service';

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
}

interface ClientActionButtonState {
    isLoading: boolean;
}

const snackbarService = SnackbarService.instance;

export default class ClientActionButton extends React.Component<
    ClientActionButtonProps,
    ClientActionButtonState
> {
    state: ClientActionButtonState = {
        isLoading: false,
    };

    componentDidMount(): void {
        snackbarService.addNotifier((options) => {
            if (options && !options.state.toast) {
                this.setState({
                    isLoading: false,
                });
            }
        });
    }

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
                {this.state.isLoading ? (
                    <LoadingIndicator size="1.25rem" />
                ) : (
                    this.props.children
                )}
            </button>
        );
    }
}
