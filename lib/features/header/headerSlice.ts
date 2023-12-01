import { createSlice } from '@reduxjs/toolkit';
import { ModalContentMapping } from '@/utils/bottom-modal';

const headerSlider = createSlice({
    name: 'header',
    initialState: {
        isBottomModalOpen: false,
        currentContent: ModalContentMapping.SIGN_IN,
    },
    reducers: {
        toggleBottomModal(state, action) {
            ({
                isBottomModalOpen: state.isBottomModalOpen,
                currentContent: state.currentContent,
            } = action.payload);
        },
        updateModalContent(state, action) {
            state.currentContent = action.payload;
        },
    },
});

export const { toggleBottomModal, updateModalContent } = headerSlider.actions;

export default headerSlider.reducer;
