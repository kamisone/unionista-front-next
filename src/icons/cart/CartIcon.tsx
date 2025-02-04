import React from 'react';

const CartIcon = ({ size = 20 }) => {
    return (
        <svg
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="m5.766 5-.618-3H1v2h2.518l2.17 10.535L6.18 17h14.306l2.4-12H5.767ZM7.82 15l-1.6-8h14.227l-1.6 8H7.82Z"
            />
            <path
                fill="currentColor"
                d="M10.666 20.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm8.334 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
            />
        </svg>
    );
};

export default CartIcon;
