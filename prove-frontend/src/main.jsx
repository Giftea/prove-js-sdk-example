import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Style from "./components/Style.jsx";
import { BrowserRouter } from "react-router";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Style />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
