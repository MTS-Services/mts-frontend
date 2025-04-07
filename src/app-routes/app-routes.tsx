import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import MainLayOut from "../MainLayOut";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import UserDashBoard from "../layouts/DashBoard/UserDashBoard/UserDashBoard";
import Projects from "../layouts/DashBoard/UserDashBoard/Projects";

// const Home = lazy(() => import("../pages/Home/Home"));

const  Home =lazy (()=> import("../pages/Home/Home"))

const Contact = lazy(() => import("../pages/Contact/Contact"));

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <UserDashBoard></UserDashBoard>,
    children: [
      {
        path: "projects",
        element: <Projects/>,
      },
    ],
  },
]);

export { AppRoutes };
