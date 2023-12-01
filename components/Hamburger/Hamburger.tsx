import HambugerIcon from '@/icons/hamburger/Hamburger';
import React from 'react';
import '@/components/Hamburger/Hamburger.css';

const Hamburger = function () {
    return (
        <div className="ham_container">
            <span></span>
            <HambugerIcon />
        </div>
    );
};

export default Hamburger;
