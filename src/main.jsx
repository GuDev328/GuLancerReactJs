import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "./stores/index.js";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("rooot")).render(
    <ThemeProvider>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <App />
            </Provider>
        </QueryClientProvider>
    </ThemeProvider>
);
