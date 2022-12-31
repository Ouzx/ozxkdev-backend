import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";

const Theme = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  return (
    <div
      className={
        `bg-auto bg-center h-screen w-screen overflow-auto` +
        (darkMode
          ? " dark bg-hero-pattern-dark bg-dblack"
          : "bg-white bg-hero-pattern")
      }
    >
      <RouterProvider router={router} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme />
    </Provider>
  </React.StrictMode>
);
