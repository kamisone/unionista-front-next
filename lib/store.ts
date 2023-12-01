import { Reducer, configureStore } from '@reduxjs/toolkit';
import headerReducer from './features/header/headerSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const makeStore = (reducers: Record<string, Reducer>) => {
    return configureStore({
        reducer: reducers,
    });
};

const store = configureStore({
    reducer: {
        header: headerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof makeStore>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };
