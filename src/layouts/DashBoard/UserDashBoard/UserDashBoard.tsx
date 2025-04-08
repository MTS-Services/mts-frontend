import { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { FaHome, FaMoon, FaProjectDiagram, FaTasks } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { PiSunDimFill } from "react-icons/pi";
import {
  IoMdArrowDroprightCircle,
  IoMdArrowDropleftCircle,
} from "react-icons/io";
import Projects from "./Projects";
import TodayTask from "./TodayTask";
import { FaDiagramProject } from "react-icons/fa6";

const UserDashBoard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const sidebarItems = [
    { icon: <FaHome />, label: "Home", path: "/" },
    { icon: <FaProjectDiagram />, label: "Projects", path: "projects" },
    { icon: <FaTasks />, label: "TodayTask", path: "todaytask" },
  ];

  return (
    <div className="flex ">
      {/* Sidebar */}
      <div
        className={`min-h-screen bg-gray-900 text-white shadow-xl shadow-black z-1  ${
          isOpen ? "w-56 space-y-3 py-4 px-2" : "w-14 space-y-2 py-2 px-2"
        } transition-all duration-700 ease-in-out flex flex-col justify-between`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-2">
          <img
            className={`${!isOpen ? "hidden" : "lg:w-28 md:w-20 w-26"}`}
            src="../../../../public/mts_logo.png"
            alt="logo"
          />
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <IoMdArrowDropleftCircle className="text-xl" />
            ) : (
              <IoMdArrowDroprightCircle className="text-[20px]" />
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
                ${location.pathname === item.path ? "bg-[#19B3E7]" : ""}
                hover:bg-primary hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-[18px]">{item.icon}</span>
                <h2
                  className={`${
                    isOpen ? "inline-block text-[16px]" : "hidden"
                  }`}
                >
                  {item.label}
                </h2>
                {!isOpen && (
                  <span className="absolute left-12 bg-[#19B3E7] text-white text-sm px-2 py-2 rounded-sm opacity-0 translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Light/Dark Toggle */}
        <div
          className={`p-2${
            !isOpen
              ? ""
              : "w-40 bg-black flex items-center justify-around border-2 border-gray-500  rounded-full"
          }`}
        >
          <div
            className={`${
              isOpen
                ? "flex items-center bg-sky-950 p-[4px] rounded-full"
                : "mb-5"
            }`}
          >
            <PiSunDimFill className="text-xl" />
            <h2 className={`${isOpen ? "text-sm" : "hidden"}`}>Light</h2>
          </div>
          <div
            className={`${
              isOpen ? "flex items-center p-[4px] rounded-full" : "" 
            }`}
          >
            <FaMoon className="text-sm" />
            <h2 className={`${isOpen ? "text-sm" : "hidden"}`}>Dark</h2>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4 mt-auto">
          <div className="group relative flex items-center">
            <img
              src="../../../../public/user_profile.png"
              className={`${
                isOpen ? "w-11" : "w-11"
              } rounded-full border-1 border-sky-500`}
              alt="user"
            />
            {!isOpen && (
              <span className="absolute left-14 bg-[#19B3E7] text-white text-sm px-2 py-2 rounded-sm opacity-0 translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 whitespace-nowrap">
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
      </div>

      {/* Content Area */}
      <div className=" w-full ">
        <Routes>
          <Route
            path="/dashboard"
            element={
              <h1 className="text-2xl font-semibold">🏠 Welcome to Home!</h1>
            }
          />
          <Route
            path="projects"
            element={
              <h1 className="text-2xl font-semibold">
                <Projects></Projects>
              </h1>
            }
          />
          <Route
            path="projects"
            element={
              <h1 className="text-2xl font-semibold">
                <Projects></Projects>
              </h1>
            }
          />
          <Route
            path="todaytask"
            element={
              <h1 className="text-2xl font-semibold">
                <TodayTask></TodayTask>
              </h1>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default UserDashBoard;
