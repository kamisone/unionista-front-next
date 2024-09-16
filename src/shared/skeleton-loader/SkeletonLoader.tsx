'use client';

import React from 'react';
import LoadingIndicator from '../loading-indicator/LoadingIndicator';
import styles from './SkeletonLoader.module.css';


interface SkeletonLoaderState {
    isLoading: boolean;
}

export default class SkeletonLoader extends React.Component<
    {},
    SkeletonLoaderState
> {
    state: SkeletonLoaderState = {
        isLoading: false,
    };
    componentDidMount(): void {
        // loadingService.addNotifier((options) => {
        //     options &&
        //         this.setState({
        //             isLoading: options.state.isLoading,
        //         });
        // });
    }
    render() {
        if (!this.state.isLoading) return <></>;
        return (
            <div className={styles.container}>
                <LoadingIndicator />
            </div>
        );
    }
}
