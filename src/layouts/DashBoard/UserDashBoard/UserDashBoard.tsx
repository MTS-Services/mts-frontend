import { Outlet } from 'react-router';
import SidebarStyle from '../../sidebar/SidebarStyle';

const UserDashBoard = () => {
  return (
    <div className={`flex`}>
      {/* Sidebar */}
      <SidebarStyle />

      {/* Content Area*/}
      <div className='w-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashBoard;
