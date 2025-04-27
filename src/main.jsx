import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "./stores/index.js";
import { ToastContainer, toast } from "react-toastify";
const queryClient = new QueryClient();
import { ConfigProvider, DatePicker } from "antd";
import viVN from "antd/locale/vi_VN";
ReactDOM.createRoot(document.getElementById("rooot")).render(
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ConfigProvider locale={viVN}>
          <App />
        </ConfigProvider>
        <ToastContainer stacked />
      </Provider>
    </QueryClientProvider>
  </ThemeProvider>
);
