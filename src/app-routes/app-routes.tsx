import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import MainLayOut from "../MainLayOut";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import LoginForm from "../pages/Auth/LoginForm";
import RegisterForm from "../pages/Auth/RegisterForm";
import Projects from "../layouts/DashBoard/UserDashBoard/Projects";
import BestContributors from "../pages/bestContributor/BestContributors";
import TodayTask from "../layouts/DashBoard/UserDashBoard/TodayTask";
import Performance from "../layouts/DashBoard/UserDashBoard/Performance";
import UserListPage from "../layouts/DashBoard/UserDashBoard/userListpage/UserListPage";
import UserDetails from "../layouts/DashBoard/userDetails/UserDetails";
import DashboardLayout from "../DashboardLayout";

// const Home = lazy(() => import("../pages/Home/Home"));

<<<<<<< HEAD
const Home = lazy(() => import('../pages/Home/Home'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
=======
const Home = lazy(() => import("../pages/Home/Home"));

const Contact = lazy(() => import("../pages/Contact/Contact"));
>>>>>>> 893cae1c828a94806b234c8ad1a23636d38e3ef7

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayOut />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/register',
        element: <RegisterForm />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },

      {
        path: '*',
        element: <NotFoundPage />,
      },

      {
        path: '/bestContributor',
        element: <BestContributors />,
      },

      {
        path: 'userdetails',
        element: <UserDetails />,
      },
    ],
  },

<<<<<<< HEAD
  {
    path: 'dashboard',
    element: <UserDashBoard />,
=======
  // DashBoard Route
  {
    path: "dashboard",
    element: <DashboardLayout />,
>>>>>>> 893cae1c828a94806b234c8ad1a23636d38e3ef7
    children: [
      {
        path: "/dashboard",
        element: <></>,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "todaytask",
        element: <TodayTask />,
      },
      {
        path: "performance",
        element: <Performance />,
      },

      {
        path: "userlist",
        element: <UserListPage />,
      },

      {
        path: "userdetails",
        element: <UserDetails />,
      },
    ],
  },
]);

export { AppRoutes };
