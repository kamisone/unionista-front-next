'use client';

import React from 'react';
import styles from './TransitionLoader.module.css';
import clsx from 'clsx';
import { LoaderService } from '@/services/loader.service';

interface TransitionLoaderState {
    isLoading: boolean;
}

interface TransitionLoaderProps {}

const loaderService = LoaderService.instance;

export default class TransitionLoader extends React.Component<
    TransitionLoaderProps,
    TransitionLoaderState
> {
    state: TransitionLoaderState = {
        isLoading: false,
    };
    componentDidMount(): void {
        loaderService.addNotifier(
            (options) =>
                options &&
                this.setState({
                    isLoading: !!options.state.isLoadingIds.length,
                })
        );
    }

    render() {
        if (!this.state.isLoading) return;
        return (
            <div
                className={clsx(
                    styles.container,
                    'absolute z-10 inset-[0_0_auto_0] h-[3px] bg-primary'
                )}
                role="alert"
                aria-live="assertive"
                aria-busy="true"
            />
        );
    }
}
