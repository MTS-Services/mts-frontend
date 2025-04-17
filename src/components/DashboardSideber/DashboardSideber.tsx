import { Outlet } from 'react-router-dom';
import SidebarStyle from './SidebarStyle'; // Sidebar component

const  DashboardLayout = () => {
  return (
    <div className='flex min-h-screen bg-gray-900 text-white'>
      {/* Sidebar */}
      <SidebarStyle />

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col'>
        {/* Topbar */}

        {/* Content Outlet */}
        <main className='flex-1 overflow-y-auto p-6 bg-background'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
