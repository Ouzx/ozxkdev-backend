import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
