import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { AppRoutes } from "./app-routes/app-routes";
import Loading from "./components/Loading/Loading";

function App() {
  return (

    <>
      <Suspense fallback={  
        <Loading></Loading>   }>
       <RouterProvider router={AppRoutes} />
      </Suspense>
    </>
    
  );
}

export default App;
