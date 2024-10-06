'use client';

import ScaleBgWrapper from '@/shared/scale-bg-wrapper/ScaleBgWrapper';
import clsx from 'clsx';
import RightArrowIcon from '../right-arrow-icon/RightArrowIcon';

interface RightBottomArrowIconProps {
    isActive: boolean;
    isMobile?: boolean;
    utilities?: string;
}

export default function RightBottomArrowIcon({
    utilities,
    isActive,
    isMobile,
}: RightBottomArrowIconProps) {
    return (
        <div
            className={clsx('cursor-pointer transition-transform', utilities)}
            style={{
                ...(isActive
                    ? {
                          transformOrigin: '50% 50% 0',
                          transform: 'rotateZ(90deg)',
                      }
                    : {}),
            }}
        >
            {isMobile ? (
                <RightArrowIcon />
            ) : (
                <ScaleBgWrapper>
                    <RightArrowIcon />
                </ScaleBgWrapper>
            )}
        </div>
    );
}
