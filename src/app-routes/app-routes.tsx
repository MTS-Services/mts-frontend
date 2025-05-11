import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import BestContributorsForm from "../components/common/BestContributorsfrom/BestContributorsfrom";
import Profile from "../components/common/Profile/Profile";
import DashboardLayout from "../DashboardLayout";
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
import OverView from "../pages/Deshboard/OverView/OverView";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProfileRankingPage from "../pages/ProfileRankigPage/ProfileRankingPage";
import SpecialOrderPage from "../pages/SpecialOrderPage/SpecialOrderPage";
import UserProfilePage from "../pages/UserProfilePage";

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
        path: "over-view",
        element: <OverView />,
      },
      {
        path: "projects",
        element: (
          <RoleProtectedRoute
            allowedRoles={[
              "sales_member",
              "operation_member",
              "operation_leader",
              "sales_leader",
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
        path: "ranking-page",
        element: <ProfileRankingPage />,
      },
      {
        path: "special-order",
        element: <SpecialOrderPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      {
        path: "projectsdetails/:id",
        element: <ProjectsDetails />,
      },

      {
        path: "userprofiledetails/:id",
        element: <UserProfilePage />,
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
      // {
      //   path: "userdetails/:id", // <-- :id is dynamic
      //   element: <UserDetails />,
      // },
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
