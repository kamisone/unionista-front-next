import React from 'react';
const EnglandFlagIcon = () => {
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
            <defs>
                <filter
                    x="-2.5%"
                    y="-2.5%"
                    width="105%"
                    height="105%"
                    filterUnits="objectBoundingBox"
                    id="c"
                >
                    <feGaussianBlur
                        stdDeviation=".5"
                        in="SourceAlpha"
                        result="shadowBlurInner1"
                    ></feGaussianBlur>
                    <feOffset
                        in="shadowBlurInner1"
                        result="shadowOffsetInner1"
                    ></feOffset>
                    <feComposite
                        in="shadowOffsetInner1"
                        in2="SourceAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                        result="shadowInnerInner1"
                    ></feComposite>
                    <feColorMatrix
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
                        in="shadowInnerInner1"
                    ></feColorMatrix>
                </filter>
            </defs>
            <g fill="none" fill-rule="evenodd">
                <path fill="#00247F" d="M0 20h20V0H0"></path>
                <path
                    fill="#FFF"
                    d="M7.33 11.35L-.844 3.174l2.12-2.12L9.453 9.23"
                ></path>
                <path
                    fill="#B73C24"
                    d="M7.684 10.733L-.094 2.955l.707-.707 7.778 7.778"
                ></path>
                <path
                    fill="#FFF"
                    d="M9.297 10.797L1.12 18.973-1 16.853l8.176-8.177"
                ></path>
                <path
                    fill="#B73C24"
                    d="M8.68 10.444L.902 18.222l-.707-.707 7.778-7.778"
                ></path>
                <path
                    fill="#FFF"
                    d="M12.12 8l8.177 8.176-2.12 2.12L10 10.122"
                ></path>
                <path
                    fill="#B73C24"
                    d="M11.707 9l7.778 7.778-.707.707L11 9.707"
                ></path>
                <path
                    fill="#FFF"
                    d="M11 9.176L19.176 1l2.12 2.12-8.175 8.177"
                ></path>
                <path
                    fill="#B73C24"
                    d="M12 8.778L19.778 1l.707.707-7.778 7.778"
                ></path>
                <path fill="#FFF" d="M-.798 12h21.392V8H-.798"></path>
                <path fill="#FFF" d="M8 20h4V-1H8"></path>
                <path fill="#B73C24" d="M-.798 11h21.392V9H-.798"></path>
                <path fill="#B73C24" d="M9 20h2V-1H9"></path>
            </g>
        </svg>
    );
};

export default EnglandFlagIcon;
