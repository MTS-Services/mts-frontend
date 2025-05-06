import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import BestContributorsForm from "../FormTesting/FinalForm";
import ProjectsDetails from "../layouts/DashBoard/ProjectgsDetails/ProjectsDetails";
import TeamDistribution from "../layouts/DashBoard/TeamDistribution/TeamDistribution";
import OperationPage from "../layouts/DashBoard/UserDashBoard/OperationPage";
import Performance from "../layouts/DashBoard/UserDashBoard/Performance";
import Projects from "../layouts/DashBoard/UserDashBoard/Projects";
import TeamPerformancePage from "../layouts/DashBoard/UserDashBoard/TeamPerformancePage";
import SalesProject from "../layouts/DashBoard/UserDashBoard/TodayTask";
import UserListPage from "../layouts/DashBoard/UserDashBoard/userListpage/UserListPage";
import UserDetails from "../layouts/DashBoard/userDetails/UserDetails";
import MainLayOut from "../MainLayOut";
import LoginForm from "../pages/Auth/LoginForm";
import RegisterForm from "../pages/Auth/RegisterForm";
import RegisterView from "../pages/auth/RegisterView";
import RoleProtectedRoute from "../pages/Auth/RoleProtectedRoute";
import BestContributors from "../pages/bestContributor/BestContributors";
import CelebrationCurtain from "../pages/CelebrationCurtain/CelebrationCurtain";
import AllProjects from "../pages/Deshboard/AllProjects/AllProjects";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ChartView from "./../layouts/DashBoard/UserDashBoard/chart/ChartView";

// const Home = lazy(() => import("../pages/Home/Home"));

const Home = lazy(() => import("../pages/Home/Home"));

const Contact = lazy(() => import("../pages/Contact/Contact"));

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <CelebrationCurtain>
            <Home />
          </CelebrationCurtain>
        ),
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
        element: (
          <RoleProtectedRoute
            allowedRoles={[
              "sales_member",
              "operation_member",
              "operation_leader",
            ]}
          >
            <AllProjects />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "projects-old",
        element: <Projects />,
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
