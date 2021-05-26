import React from "react";
import ReactDOM from "react-dom";
import Main from "./main";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode throwIfNamespace={false}>
    <HashRouter>
      <ToastContainer />
      <Main />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
