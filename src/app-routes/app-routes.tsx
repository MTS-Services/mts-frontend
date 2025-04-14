import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayOut from '../MainLayOut';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

<<<<<<< HEAD
import DashboardLayout from '../DashboardLayout';
import Performance from '../layouts/DashBoard/UserDashBoard/Performance';
import Projects from '../layouts/DashBoard/UserDashBoard/Projects';
import TodayTask from '../layouts/DashBoard/UserDashBoard/TodayTask';
import UserListPage from '../layouts/DashBoard/UserDashBoard/userListpage/UserListPage';
import UserDetails from '../layouts/DashBoard/userDetails/UserDetails';
import BestContributors from '../pages/bestContributor/BestContributors';
import LoginForm from '../pages/auth/LoginForm';
import RegisterForm from '../pages/auth/RegisterForm';
import ChartView from '../layouts/DashBoard/UserDashBoard/chart/ChartView';
=======
import DashboardLayout from "../DashboardLayout";
import Performance from "../layouts/DashBoard/UserDashBoard/Performance";
import Projects from "../layouts/DashBoard/UserDashBoard/Projects";
import TodayTask from "../layouts/DashBoard/UserDashBoard/TodayTask";
import UserListPage from "../layouts/DashBoard/UserDashBoard/userListpage/UserListPage";
import UserDetails from "../layouts/DashBoard/userDetails/UserDetails";
import BestContributors from "../pages/bestContributor/BestContributors";
import LoginForm from "../pages/Auth/LoginForm";
import RegisterForm from "../pages/Auth/RegisterForm";
import ChartView from './../layouts/DashBoard/UserDashBoard/chart/ChartView';

>>>>>>> 34b3c78358299afa9132064c1339e157a4b9a46b

// const Home = lazy(() => import("../pages/Home/Home"));

const Home = lazy(() => import('../pages/Home/Home'));

const Contact = lazy(() => import('../pages/Contact/Contact'));

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
<<<<<<< HEAD
        path: '/register',
        element: <RegisterForm />,
=======
        path: "/register",
        element: <RegisterForm/>,
>>>>>>> 34b3c78358299afa9132064c1339e157a4b9a46b
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

  // DashBoard Route
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
<<<<<<< HEAD
        path: '/dashboard',
=======

        index: true,
        path: "/dashboard",
>>>>>>> 34b3c78358299afa9132064c1339e157a4b9a46b
        element: <ChartView />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'todaytask',
        element: <TodayTask />,
      },
      {
        path: 'performance',
        element: <Performance />,
      },

      {
        path: 'userlist',
        element: <UserListPage />,
      },

      {
        path: 'userdetails',
        element: <UserDetails />,
      },
    ],
  },
]);

export { AppRoutes };
