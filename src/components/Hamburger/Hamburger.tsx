import React from 'react';
import styles from '@/components/Hamburger/Hamburger.module.css';
import clsx from 'clsx';

interface HamburgerProps {}

const Hamburger = function ({}: HamburgerProps) {
    return (
        <div className={clsx(styles.container, 'bg-no-repeat bg-center')}></div>
    );
};

export default Hamburger;
