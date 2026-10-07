import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('The application root element "#root" was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
