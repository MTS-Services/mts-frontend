import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { AppRoutes } from "./app-routes/app-routes";
import AuthProvider from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketContext";
import { ThemeProvider } from "./context/ThemeContext";
import { store } from "./features/store";
import PrefetchWrapper from "./pages/PrefetchWrapper";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <PrefetchWrapper />
              <SocketProvider>
                <RouterProvider router={AppRoutes} />
              </SocketProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
