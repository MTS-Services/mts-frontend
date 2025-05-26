import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import BestContributorsForm from "../components/common/BestContributorsfrom/BestContributorsfrom";
import MarketPlaceProfile from "../components/common/MarketPlaceProfile/MarketPlaceProfile";
import Profile from "../components/common/Profile/Profile";
import DashboardLayout from "../DashboardLayout";
import AttendacnePage from "../layouts/DashBoard/AttendancePage/AttendancePage";
import ProjectsDetails from "../layouts/DashBoard/ProjectgsDetails/ProjectsDetails";
import TeamDistribution from "../layouts/DashBoard/TeamDistribution/TeamDistribution";
import CreateDepartment from "../layouts/DashBoard/UserDashBoard/CreateDepartment/CreateDepartment";
import CreateProfile from "../layouts/DashBoard/UserDashBoard/CreatProfile/CreateProfile";
import OperationPage from "../layouts/DashBoard/UserDashBoard/OperationPage";
import Performance from "../layouts/DashBoard/UserDashBoard/Performance";
import TeamPerformancePage from "../layouts/DashBoard/UserDashBoard/TeamPerformancePage";
import SalesProject from "../layouts/DashBoard/UserDashBoard/TodayTask";
import UserListPage from "../layouts/DashBoard/UserDashBoard/userListpage/UserListPage";
import UserDetails from "../layouts/DashBoard/userDetails/UserDetails";
import MainLayOut from "../MainLayOut";
import AddOtherCost from "../pages/AddOtherCost/AddOtherCost";
import AllReport from "../pages/AllReport/AllReport";
import LoginForm from "../pages/Auth/LoginForm";
import RegisterForm from "../pages/Auth/RegisterForm";
import RoleProtectedRoute from "../pages/Auth/RoleProtectedRoute";
import BestContributors from "../pages/bestContributor/BestContributors";
import CelebrationCurtain from "../pages/CelebrationCurtain/CelebrationCurtain";
import AllProjects from "../pages/Deshboard/AllProjects/AllProjects";
import OverView from "../pages/Deshboard/OverView/OverView";
import TeamCreate from "../pages/Deshboard/TeamCreate/TeamCreate";
import Distribution from "../pages/Distribution/Distribution";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProfileRankingPage from "../pages/ProfileRankigPage/ProfileRankingPage";
import Promotion from "../pages/Promotion/Promotion";
import PromotionSummary from "../pages/PromotionSummary/PromotionSummary";
import QuotationPDFForm from "../pages/QuotationPDF/QuotationPDFForm";
import SpecialOrderPage from "../pages/SpecialOrderPage/SpecialOrderPage";
import UpdateMessage from "../pages/UpdateMessage/UpdateMessage";
import UserProfilePage from "../pages/UserProfilePage";

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
              "hod_mern",
            ]}
          >
            <AllProjects />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "quotation-pdf-form",
        element: <QuotationPDFForm />,
      },
      {
        path: "add-other-cost",
        element: <AddOtherCost />,
      },
      {
        path: "all-report",
        element: <AllReport />,
      },
      {
        path: "distribution",
        element: <Distribution />,
      },
      {
        path: "ranking-page",
        element: <ProfileRankingPage />,
      },
      {
        path: "promotion-add",
        element: <Promotion />,
      },
      {
        path: "promotion-summary",
        element: <PromotionSummary />,
      },
      {
        path: "create-team",
        element: <TeamCreate />,
      },
      {
        path: "best_performance",
        element: <BestContributors />,
      },
      {
        path: "create-department",
        element: <CreateDepartment />,
      },
      {
        path: "create-profile",
        element: <CreateProfile />,
      },

      {
        path: "special-order",
        element: <SpecialOrderPage />,
      },
      {
        path: "update-message",
        element: <UpdateMessage />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "profile-List",
        element: <MarketPlaceProfile />,
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
        path: "attendance",
        element: <AttendacnePage />,
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
        path: "profile-List",
        element: <MarketPlaceProfile />,
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
        path: "bestcontributors",
        element: <BestContributorsForm />,
      },

      {
        path: "teamtistribution",
        element: <TeamDistribution />,
      },

      {
        path: "userdetails/:id",
        element: <UserDetails />,
      },
    ],
  },
]);

export { AppRoutes };
