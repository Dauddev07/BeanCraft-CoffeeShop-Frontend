import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { CartProvider } from "./context/CartContext";
import { ProductStatsProvider } from "./context/ProductStatsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductStatsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductStatsProvider>
  </React.StrictMode>,
);
