import React from 'react';
const CountryIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
        >
            <g transform="translate(-1 -.004)" fill="none" fill-rule="evenodd">
                <path
                    fill="#B73C24"
                    d="M.547 6.002h20v-6h-22m2 20h20v-6h-20"
                ></path>
                <path fill="#FFCF5C" d="M1 5v10h20V5"></path>
                <circle fill="#B73C24" cx="7" cy="10.004" r="2"></circle>
                <use xlinkHref="#d" fill="#000"></use>
            </g>
        </svg>
    );
};

export default CountryIcon;
