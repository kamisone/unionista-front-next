import HambugerIcon from '@/app/icons/hamburger/Hamburger';
import React from 'react';
import '@/app/components/Hamburger/Hamburger.css';

const Hamburger = function () {
    return (
        <div className="ham_container">
            <span></span>
            <HambugerIcon />
        </div>
    );
};

export default Hamburger;
