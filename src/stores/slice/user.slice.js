// src/redux/slices/screenSlice.js
import { createSlice } from "@reduxjs/toolkit";

const useSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null,
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
    },
});

export const { setUserInfo } = useSlice.actions;
export default useSlice.reducer;
