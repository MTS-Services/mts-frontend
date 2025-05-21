import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Loading from "./components/Loading/Loading.js";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Loading></Loading>}>
      <App />
    </Suspense>
  </StrictMode>,
);
