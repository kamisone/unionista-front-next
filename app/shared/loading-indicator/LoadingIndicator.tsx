import React from 'react';
import { CircularProgress } from '@mui/material';
import styles from '@/app/shared/loading-indicator/LoadingIndicator.module.css';
import clsx from 'clsx';

interface LoadingIndicatorProps  {
    size?: string;
    isExtended?: boolean;
}

const LoadingIndicator = ({ size = '1.45rem', isExtended = false }: LoadingIndicatorProps) => {
    return (
        <div style={{ display: 'grid', placeItems: 'center' }} className={clsx(styles.container, {  [styles.is_extended]: isExtended })}>
            <CircularProgress size={size} />
        </div>
    );
};


export default LoadingIndicator;
