import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaTasks, FaUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from 'react-icons/io';

import { useTheme } from '../../context/ThemeContext';
import ToggleDarkAndLight from '../../components/ToggleDarkAndLight/ToggleDarkAndLight';

const SidebarStyle = () => {
  const { toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const sidebarItems = [
    { icon: <FaHome />, label: 'Home', path: 'dashboard' },
    { icon: <FaProjectDiagram />, label: 'Projects', path: 'projects' },
    { icon: <FaTasks />, label: 'TodayTask', path: 'todaytask' },
    { icon: <FaTasks />, label: 'Performance', path: 'performance' },
    { icon: <FaUser />, label: 'User List', path: 'userlist' },
  ];

  return (
    <aside
      className={`min-h-screen bg-background text-accent hover:text-accent shadow-xl shadow-black z-1  ${
        isOpen ? 'w-56 space-y-3 py-4 px-2' : 'w-14 space-y-2 py-2 px-2'
      } transition-all duration-700 ease-in-out flex flex-col justify-between`}
    >
      {/* Logo & Toggle */}
      <div className='flex items-center justify-between p-2'>
        <img
          className={`${!isOpen ? 'hidden' : 'lg:w-28 md:w-20 w-26'}`}
          src='/mts_logo.png'
          alt='logo'
        />
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <IoMdArrowDropleftCircle className='text-xl' />
          ) : (
            <IoMdArrowDroprightCircle className='text-[20px]' />
          )}
        </button>
      </div>

      {/* Sidebar Items */}
      <nav>
        {sidebarItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`group cursor-pointer relative p-2 flex items-center rounded-lg text-xl my-2 
                ${
                  location.pathname === item.path
                    ? 'bg-primary'
                    : 'bg-background'
                }
                hover:bg-primary hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform`}
          >
            <div className='flex items-center space-x-2'>
              <span className='text-[18px]'>{item.icon}</span>
              <h2
                className={`${isOpen ? 'inline-block text-[16px]' : 'hidden'}`}
              >
                {item.label}
              </h2>
              {!isOpen && (
                <span className='absolute left-12 bg-primary text-accent text-sm px-2 py-2 rounded-sm opacity-0 translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 whitespace-nowrap'>
                  {item.label}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>

      {/* Light/Dark Toggle */}
      <ToggleDarkAndLight isOpen={isOpen} />

      {/* User Info */}
      <div className='flex items-center space-x-4 mt-auto'>
        <div className='group relative flex items-center'>
          <img
            src='/user_profile.png'
            className={`${
              isOpen ? 'w-11' : 'w-11'
            } rounded-full border-1 border-primary`}
            alt='user'
          />
          {!isOpen && (
            <span className='absolute left-14 bg-primary text-accent text-sm px-2 py-2 rounded-sm opacity-0 translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 whitespace-nowrap'>
              User Profile
            </span>
          )}
        </div>
        {isOpen && (
          <>
            <div className='text-start'>
              <h2 className='text-[14px]'>Masud Rana</h2>
              <h2 className='text-[10px]'>Web Developer</h2>
            </div>
            <div className='ml-auto'>
              <FiLogOut className='text-[20px]' />
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default SidebarStyle;
