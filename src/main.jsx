import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ReactToast from "./components/ReactToast.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactToast />
    <App />
  </StrictMode>
);
