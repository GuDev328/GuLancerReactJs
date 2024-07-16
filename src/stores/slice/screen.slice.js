// src/redux/slices/screenSlice.js
import { createSlice } from "@reduxjs/toolkit";

const screenSlice = createSlice({
    name: "screen",
    initialState: {
        isMobile: false,
        isLgScreen: false,
    },
    reducers: {
        setIsMobile: (state, action) => {
            state.isMobile = action.payload;
        },
        setIsLgScreen: (state, action) => {
            state.isLgScreen = action.payload;
        },
    },
});

export const { setIsMobile, setIsLgScreen } = screenSlice.actions;
export default screenSlice.reducer;
