import styles from '@/shared/scale-bg-wrapper/ScaleBgWrapper.module.css';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface ScaleBgWrapperProps {
    children: ReactNode;
    size?: string;
    isFixedSize?: boolean;
}

const ScaleBgWrapper = (props: ScaleBgWrapperProps) => {
    const { children, isFixedSize = true, size = '1.5rem' } = props;
    return (
        <div
            style={{
                height: isFixedSize ? size : 'auto',
                width: isFixedSize ? size : 'auto',
            }}
            className={clsx(
                styles.container,
                'grid items-center relative isolate text-inherit'
            )}
        >
            {children}
        </div>
    );
};

export default ScaleBgWrapper;
