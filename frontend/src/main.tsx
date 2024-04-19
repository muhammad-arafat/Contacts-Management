import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes.tsx";
import { ToastContainer } from "react-toastify";

import store from "./store/store.ts";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
