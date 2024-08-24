import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "./slice/screen.slice";
import userReducer from "./slice/user.slice";

export const store = configureStore({
    reducer: {
        screen: screenReducer,
        user: userReducer,
    },
});
