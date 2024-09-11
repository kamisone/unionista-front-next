import styles from '@/shared/scale-bg-wrapper/ScaleBgWrapper.module.css';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface ScaleBgWrapperProps {
    Icon?: ReactNode;
    children?: ReactNode;
}

const ScaleBgWrapper = (props: ScaleBgWrapperProps) => {
    const { Icon, children } = props;
    return <div className={clsx(styles.container)}>{Icon || children}</div>;
};

export default ScaleBgWrapper;
