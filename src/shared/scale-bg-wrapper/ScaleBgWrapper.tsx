import styles from '@/shared/scale-bg-wrapper/ScaleBgWrapper.module.css';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface ScaleBgWrapperProps {
    children: ReactNode;
}

const ScaleBgWrapper = (props: ScaleBgWrapperProps) => {
    const { children } = props;
    return <div className={clsx(styles.container)}>{children}</div>;
};

export default ScaleBgWrapper;
