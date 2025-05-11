import { Outlet } from "react-router-dom";
import SidebarStyle from "./SidebarStyle"; // Sidebar component

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full bg-gray-900 text-white">
      {/* Sidebar */}
      <SidebarStyle />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-auto">
        {/* Optional Topbar can go here */}

        {/* Page Content */}
        <main className="bg-background flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
