import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "./slice/screen.slice";

export const store = configureStore({
    reducer: {
        screen: screenReducer,
    },
});
