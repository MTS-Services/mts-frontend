import { Outlet } from "react-router-dom";
import SidebarStyle from "./SidebarStyle"; // Sidebar component

const DashboardLayout = () => {
  return (
    <div className="flex w-full bg-gray-900 text-white">
      {/* Sidebar */}
      <SidebarStyle />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col flex-wrap">
        {/* Topbar */}

        {/* Content Outlet */}
        <main className="bg-background flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
