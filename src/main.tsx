import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/event/EventListPage";
import "./styles.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    {/* <React.StrictMode>
    
  </React.StrictMode> */}
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
