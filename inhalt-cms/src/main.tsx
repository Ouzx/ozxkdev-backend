import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

import "./index.css";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
