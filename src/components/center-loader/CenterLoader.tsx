'use client';
import React from 'react';
import styles from '@/components/center-loader/CenterLoader.module.css';
import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';

export default class CenterLoader extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <LoadingIndicator />
            </div>
        );
    }
}
