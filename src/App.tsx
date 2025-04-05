import { Suspense, useEffect } from "react";
import { RouterProvider, useLocation } from "react-router";
import { AppRoutes } from "./app-routes/app-routes";

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={AppRoutes} />
      </Suspense>
    </>
  );
}

export default App;
