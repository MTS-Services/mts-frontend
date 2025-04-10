import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import MainLayOut from "../MainLayOut";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import LoginForm from "../pages/Auth/LoginForm";
import RegisterForm from "../pages/Auth/RegisterForm";
import UserDashBoard from "../layouts/DashBoard/UserDashBoard/UserDashBoard";
import Projects from "../layouts/DashBoard/UserDashBoard/Projects";
import BestContributors from "../pages/bestContributor/BestContributors";

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
        path: "/login",
        element: <LoginForm  />,
      },
      {
        path: "/register",
        element: <RegisterForm />
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },

      {
        path: "/bestContributor",
        element:<BestContributors></BestContributors>,
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
