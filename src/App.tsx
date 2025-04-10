import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { AppRoutes } from "./app-routes/app-routes";
import Loading from "./components/Loading/Loading";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <Suspense fallback={<Loading></Loading>}>
        <ThemeProvider>
          <RouterProvider router={AppRoutes} />
        </ThemeProvider>
      </Suspense>
    </>
  );
}

export default App;
