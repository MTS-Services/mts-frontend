import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../MainLayOut";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import LoginForm from "../pages/Auth/LoginForm";
import RegisterForm from "../pages/Auth/RegisterForm";
import RegisterView from "../pages/Auth/RegisterView";
import BestContributors from "../pages/bestContributor/BestContributors";
import DashboardLayout from "../DashboardLayout";

// const Home = lazy(() => import("../pages/Home/Home"));

const Home = lazy(() => import("../pages/Home/Home"));

const Contact = lazy(() => import("../pages/Contact/Contact"));
import ChartView from "./../layouts/DashBoard/UserDashBoard/chart/ChartView";
import Projects from "../layouts/DashBoard/UserDashBoard/Projects";
import AllProjects from "../pages/Deshboard/AllProjects/AllProjects";
import ProjectsDetails from "../layouts/DashBoard/ProjectgsDetails/ProjectsDetails";
import Performance from "../layouts/DashBoard/UserDashBoard/Performance";
import UserListPage from "../layouts/DashBoard/UserDashBoard/userListpage/UserListPage";
import OperationPage from "../layouts/DashBoard/UserDashBoard/OperationPage";
import TeamPerformancePage from "../layouts/DashBoard/UserDashBoard/TeamPerformancePage";
import UserDetails from "../layouts/DashBoard/userDetails/UserDetails";
import BestContributorsForm from "../FormTesting/FinalForm";
import TeamDistribution from "../layouts/DashBoard/TeamDistribution/TeamDistribution";
import SalesProject from "../layouts/DashBoard/UserDashBoard/TodayTask";

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
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/register-2",
        element: <RegisterView />,
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
        element: <BestContributors />,
      },
    ],
  },

  // DashBoard Route
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        path: "/dashboard",
        element: <ChartView />,
      },

      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "all-projects",
        element: <AllProjects />,
      },
      {
        path: "projectsdetails",
        element: <ProjectsDetails />,
      },

      {
        path: "todaytask",
        element: <SalesProject />,
      },
      {
        path: "performance",
        element: <Performance />,
      },
      {
        path: "bestcontributor",
        element: <BestContributors />,
      },

      {
        path: "userlist",
        element: <UserListPage />,
      },

      {
        path: "operation",
        element: <OperationPage />,
      },
      {
        path: "teamperformance",
        element: <TeamPerformancePage />,
      },
      {
        path: "userdetails/:id", // <-- :id is dynamic
        element: <UserDetails />,
      },
      {
        path: "bestcontributors",
        element: <BestContributorsForm />,
      },

      {
        path: "teamtistribution",
        element: <TeamDistribution />,
      },

      {
        path: "userdetails/:id", // <-- :id is dynamic
        element: <UserDetails />,
      },
    ],
  },
]);

export { AppRoutes };
