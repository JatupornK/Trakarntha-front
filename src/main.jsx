// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./stores/index.jsx";
// import ProductContextProvider from "./contexts/ProductContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import LoadingContextProvider from "./contexts/LoadingContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </LoadingContextProvider>
  </React.StrictMode>
);
