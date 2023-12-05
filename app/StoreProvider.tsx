'use client';

import headerSlice from '@/app/lib/features/header/headerSlice';
import { AppStore, makeStore } from '@/app/lib/store';
import { useRef } from 'react';
import { Provider } from 'react-redux';

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        storeRef.current = makeStore({ header: headerSlice });
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
