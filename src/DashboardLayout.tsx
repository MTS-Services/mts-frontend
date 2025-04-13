import { Outlet } from "react-router";
import { DashBoard } from "./layouts/DashBoard/DashBoard";
import { useTheme } from "./context/ThemeContext";
import DashboardSideber from "./components/DashboardSideber/DashboardSideber";

const DashboardLayout = () => {
  const { theme } = useTheme();

  return (
    <>
      <main className={theme}>
        <DashboardSideber></DashboardSideber>
      </main>
    </>
  );
};

export default DashboardLayout;
