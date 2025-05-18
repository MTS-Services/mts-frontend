import { Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { AppRoutes } from "./app-routes/app-routes";
import Loading from "./components/Loading/Loading";
import AuthProvider from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeContext";
import { store } from "./features/store";

function App() {
  return (
    <>
      <Suspense fallback={<Loading></Loading>}>
        <Provider store={store}>
          <ThemeProvider>
            <AuthProvider>
              <RouterProvider router={AppRoutes} />
            </AuthProvider>
          </ThemeProvider>
        </Provider>
      </Suspense>
    </>
  );
}

export default App;
