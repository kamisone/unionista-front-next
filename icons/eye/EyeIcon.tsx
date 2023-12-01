import React from 'react';
import TraitIcon from './trait/TraitIcon';
import PropTypes from 'prop-types';
import 'icons/eye/EyeIcon.css';
interface EyeIconProps {
    isPassDiscovered: boolean;
}

const EyeIcon = (props: EyeIconProps) => {
    const { isPassDiscovered = false } = props;
    return (
        <div className="ei_container">
            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g fillRule="evenodd" fill="currentColor">
                    <path
                        d="M10 4c4.113 0 7.908 2.186 9.925 5.713.1.176.1.391 0 .567C17.91 13.81 14.115 15.998 10 16h-.001c-4.113-.002-7.908-2.188-9.924-5.716a.57.57 0 0 1 0-.568C2.091 6.188 5.885 4.002 10 4zm-8.5 6c1.845 2.998 4.921 4.498 8.5 4.5 3.58-.001 6.655-1.5 8.5-4.5-1.846-2.997-4.921-4.5-8.5-4.5-3.579.001-6.655 1.501-8.5 4.5z"
                        fill="currentColor"
                        fillRule="nonzero"
                    />
                    <circle
                        stroke="currentColor"
                        strokeWidth="1.5"
                        cx="10"
                        cy="10"
                        r="2.25"
                    />
                </g>
            </svg>
            {!isPassDiscovered && <TraitIcon />}
        </div>
    );
};

export default EyeIcon;
