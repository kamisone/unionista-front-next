'use client';

import { ModalContentMapping } from '@/app/utils/bottom-modal';
import { isBrowser } from '@/app/utils/is-browser';
import { FrontQueryParams } from '@/app/utils/query-params';
import { createSlice } from '@reduxjs/toolkit';

// const urlSearch = new URLSearchParams(isBrowser() ? location.search : '');

const headerSlice = createSlice({
    name: 'header',
    initialState: {
        isBottomModalOpen: false,
        currentContent: null,
    },
    reducers: {
        toggleBottomModal(state, action) {
            state.isBottomModalOpen = action.payload.isBottomModalOpen;
            state.currentContent = action.payload.currentContent;
        },
        updateModalContent(state, action) {
            state.currentContent = action.payload;
        },
    },
});

export const { toggleBottomModal, updateModalContent } = headerSlice.actions;

export default headerSlice.reducer;
