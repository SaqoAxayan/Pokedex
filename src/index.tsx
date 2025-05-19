import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { setUpStore } from "./store/store.ts";
import { Provider } from "react-redux";
const store = setUpStore();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
