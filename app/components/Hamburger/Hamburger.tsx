import HambugerIcon from '@/app/icons/hamburger/Hamburger';
import React from 'react';
import '@/app/components/Hamburger/Hamburger.css';

interface HamburgerProps {
    hoverAnimated?: boolean;
}

const Hamburger = function ({ hoverAnimated = true }: HamburgerProps) {
    return (
        <div className="ham_container">
            {hoverAnimated && <span></span>}
            <HambugerIcon />
        </div>
    );
};

export default Hamburger;
