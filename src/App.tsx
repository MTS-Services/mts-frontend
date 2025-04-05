import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { AppRoutes } from "./app-routes/app-routes";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={AppRoutes} />
      </Suspense>
    </>
  );
}

export default App;
