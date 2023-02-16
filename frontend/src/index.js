import React from "react";
import ReactDOM from "react-dom";
//import './styles/index.css';
import App from "./App";
import "./bootstrap.min.css";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./Store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
