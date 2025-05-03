import { useState } from "react";
import {
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaUser,
  FaChartLine,
  FaMedal,
} from "react-icons/fa";
import { GiTeamUpgrade } from "react-icons/gi";

import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router";
import { useTheme } from "../../context/ThemeContext";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { GrGroup } from "react-icons/gr";

import ToggleDarkAndLight from "../ToggleDarkAndLight/ToggleDarkAndLight";
import { SlSettings } from "react-icons/sl";

const SidebarStyle = () => {
  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const sidebarItems = [
    { icon: <FaHome />, label: "Home", path: "/dashboard" },
    { icon: <FaProjectDiagram />, label: "Projects", path: "projects" },
    { icon: <FaChartLine />, label: "Sales Project", path: "todaytask" },
    { icon: <FaTasks />, label: "Performance", path: "performance" },
    {
      icon: <GiTeamUpgrade />,
      label: "Team Performance",
      path: "teamperformance",
    },
    { icon: <SlSettings />, label: "Operation", path: "operation" },

    { icon: <FaUser />, label: "User List", path: "userlist" },
    { icon: <GrGroup />, label: "Team Distribution", path: "teamtistribution" },

    { icon: <FaMedal />, label: "BestContributors", path: "bestcontributors" },
  ];
  return (
    <aside
      className={`bg-background text-accent hover:text-accent z-1 min-h-screen border-r-1 border-gray-700 shadow-md shadow-black ${
        isOpen ? "w-48 space-y-3 px-2 py-4" : "w-14 space-y-2 px-2 py-2"
      } flex flex-col justify-between transition-all duration-400 ease-in-out`}
    >
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between p-2">
        <img
          className={`${!isOpen ? "hidden" : "w-26 md:w-20 lg:w-28"}`}
          src={
            theme === "light-mode"
              ? "/images/black_logo.png"
              : "/images/white_logo.png"
          }
          alt="logo"
        />
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <IoMdArrowDropleftCircle className="cursor-pointer text-xl" />
          ) : (
            <IoMdArrowDroprightCircle className="cursor-pointer text-[20px]" />
          )}
        </button>
      </div>

      {/* Sidebar Items */}
      <nav>
        {sidebarItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`group relative my-2 flex cursor-pointer items-center rounded-lg p-2 text-xl ${
              location.pathname === item.path ? "bg-primary" : "bg-background"
            } hover:bg-primary transform transition-all duration-300 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-[18px]">{item.icon}</span>
              <h2
                className={`${isOpen ? "inline-block text-[16px]" : "hidden"}`}
              >
                {item.label}
              </h2>
              {!isOpen && (
                <span className="bg-primary absolute left-12 translate-y-2 scale-95 rounded-sm px-2 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
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
      <div className="mt-auto flex items-center space-x-4">
        <div className="group relative flex items-center">
          <img
            src="/user_profile.png"
            className={`${
              isOpen ? "w-11" : "w-11"
            } border-primary rounded-full border-1`}
            alt="user"
          />
          {!isOpen && (
            <span className="bg-primary text-accent absolute left-14 translate-y-2 scale-95 rounded-sm px-2 py-2 text-sm whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
              User Profile
            </span>
          )}
        </div>
        {isOpen && (
          <>
            <div className="text-start">
              <h2 className="text-[14px]">Masud Rana</h2>
              <h2 className="text-[10px]">Web Developer</h2>
            </div>
            <div className="ml-auto">
              <FiLogOut className="text-[20px]" />
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default SidebarStyle;
