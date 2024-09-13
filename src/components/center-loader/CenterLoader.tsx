'use client';
import React from 'react';
import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';

export default class CenterLoader extends React.Component {
    render() {
        return (
            <div className={'absolute h-full w-full inset-0 text-neutral-grey'}>
                <LoadingIndicator />
            </div>
        );
    }
}
