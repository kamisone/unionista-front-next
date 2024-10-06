'use client';

import BottomArrowIcon from '@/icons/bottom-arrow-icon/BottomArrowIcon';
import LeftArrowIcon from '@/icons/left-arrow-icon/LeftArrowIcon';
import ScaleBgWrapper from '@/shared/scale-bg-wrapper/ScaleBgWrapper';
import clsx from 'clsx';
import { useState } from 'react';

export default function ToggleTitlesArrow({
    toggleClass,
    utilities,
}: {
    toggleClass: string;
    utilities?: string;
}) {
    const [isMenuHidden, setIsMenuHidden] = useState(false);
    return (
        <div
            className={clsx(
                'cursor-pointer transition-transform',
                isMenuHidden ? 'justify-self-center' : 'right-0 mr-2',
                utilities
            )}
            style={{
                ...(isMenuHidden
                    ? {
                          transformOrigin: '50% 50% 0',
                          transform: 'rotateZ(180deg)',
                      }
                    : {}),
            }}
            onClick={(e) => {
                (
                    e.currentTarget as HTMLElement
                ).parentElement?.classList.toggle(toggleClass);
                setIsMenuHidden((prev) => !prev);
            }}
        >
            <ScaleBgWrapper>
                <LeftArrowIcon />
            </ScaleBgWrapper>
        </div>
    );
}
