import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { BrowserRouter as Routers } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import App from "./App";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routers>
        <App />
      </Routers>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);
