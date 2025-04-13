import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayOut from '../MainLayOut';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import UserDashBoard from '../layouts/DashBoard/UserDashBoard/UserDashBoard';
import Projects from '../layouts/DashBoard/UserDashBoard/Projects';
import BestContributors from '../pages/bestContributor/BestContributors';
import TodayTask from '../layouts/DashBoard/UserDashBoard/TodayTask';
import Performance from '../layouts/DashBoard/UserDashBoard/Performance';
import UserListPage from '../layouts/DashBoard/UserDashBoard/userListpage/UserListPage';
import UserDetails from '../layouts/DashBoard/userDetails/UserDetails';
import RegisterForm from '../pages/Auth/RegisterForm';
import LoginForm from '../pages/Auth/LoginForm';
import ChartView from './../layouts/DashBoard/UserDashBoard/chart/ChartView';
// const Home = lazy(() => import("../pages/Home/Home"));

const  Home =lazy (()=> import("../pages/Home/Home"))
const Contact = lazy(() => import("../pages/Contact/Contact"));




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
  {
    path: 'dashboard',
    element: <UserDashBoard></UserDashBoard>,
    children: [
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'chart',
        element: <ChartView />,
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
