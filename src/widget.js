import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const FurnitureCalculator = {
  init(selector) {
    const el = document.querySelector(selector);
    if (!el) {
      console.error("FurnitureCalculator: контейнер не найден", selector);
      return;
    }
    ReactDOM.createRoot(el).render(<App />);
  },
};

if (typeof window !== "undefined") {
  window.FurnitureCalculator = FurnitureCalculator;
}

export default FurnitureCalculator;