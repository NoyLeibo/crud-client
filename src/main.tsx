import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RootCmp } from "./RootCmp";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RootCmp />
    </BrowserRouter>
  </StrictMode>
);
