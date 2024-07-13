// src/redux/slices/screenSlice.js
import { createSlice } from "@reduxjs/toolkit";

const screenSlice = createSlice({
    name: "screen",
    initialState: {
        isMobile: false,
    },
    reducers: {
        setIsMobile: (state, action) => {
            state.isMobile = action.payload;
        },
    },
});

export const { setIsMobile } = screenSlice.actions;
export default screenSlice.reducer;
