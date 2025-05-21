import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { AppRoutes } from "./app-routes/app-routes";
import AuthProvider from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketContext";
import { ThemeProvider } from "./context/ThemeContext";
import { store } from "./features/store";

function App() {
  const queryClient = new QueryClient();
  const memoizedRoutes = useMemo(() => AppRoutes, []);
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <SocketProvider>
                <RouterProvider router={memoizedRoutes} />
              </SocketProvider>
            </QueryClientProvider>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
