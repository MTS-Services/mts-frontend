import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { FaProjectDiagram, FaUser } from "react-icons/fa";
import { FiExternalLink, FiLogOut } from "react-icons/fi";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeContext";
import ToggleDarkAndLight from "../ToggleDarkAndLight/ToggleDarkAndLight";
const SidebarStyle = () => {
  const { theme } = useTheme();
  const { dbUser } = useContext(AuthContext);

  console.log("db: ", dbUser);

  const { logOutUser } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  // const sidebarItems = [
  //   { icon: <FiExternalLink />, label: "Over View", path: "over-view" },
  //   { icon: <FaProjectDiagram />, label: "Projects", path: "projects" },
  //   { icon: <FaChartLine />, label: "Sales Project", path: "todaytask" },
  //   { icon: <FaTasks />, label: "Performance", path: "performance" },
  //   {
  //     icon: <GiTeamUpgrade />,
  //     label: "Team Performance",
  //     path: "teamperformance",
  //   },
  //   { icon: <SlSettings />, label: "Operation", path: "operation" },

  //   { icon: <FaUser />, label: "User List", path: "userlist" },
  //   { icon: <GrGroup  />, label: "Team Distribution", path: "teamtistribution" },

  //   { icon: <FaMedal className="font-primary" />, label: "BestContributors", path: "bestcontributors" },
  //   { icon: <FaUser  className="font-primary" />, label: "Profile", path: "profile" },
  // ];

  const sidebarItems = [
    { icon: <FiExternalLink />, label: "Over View", path: "over-view" },
    { icon: <FaProjectDiagram />, label: "Projects", path: "projects" },
    { icon: <FaUser />, label: "User List", path: "userlist" },
  ];

  const handleLogOut = () => {
    logOutUser();
    Cookies.remove("core");
    navigate("/");
  };

  ////// munshi codgin master
  const isActive = dbUser?.account_status?.toLowerCase() === "active";

  return (
    <aside
      className={`bg-background text-accent hover:text-accent z-1 min-h-screen border-r-1 border-gray-700 ${theme == "light-mode" ? "" : "border-gray-700"} ${
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
      <nav className="font-secondary">
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
        <div className="border-primary text[4px] flex w-full flex-wrap gap-2 overflow-hidden border-1 p-2">
          <p>
            Role:
            <br /> {dbUser?.role}
          </p>
          <br />
          <p>
            Email:
            <br />
            {dbUser?.email}
          </p>
          <br />
        </div>
      </nav>

      {/* Light/Dark Toggle */}
      <ToggleDarkAndLight isOpen={isOpen} />

      {/* User Info */}
      {/* <div className="mt-auto flex items-center space-x-4">
        <div className="group relative flex items-center">
          <img
            src={`${dbUser?.dp}`}
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
              <h2 className="font-primary text-[14px]">{dbUser?.first_name}</h2>
              <h2 className="font-secondary text-[10px]">{`${
                dbUser?.designation || "Pending.."
              }`}</h2>
            </div>
            <div className="hover:text-primary ml-auto cursor-pointer">
              <FiLogOut onClick={handleLogOut} className="text-[20px]" />
            </div>
          </>
        )}
      </div> */}

      <div className="mt-auto flex items-center space-x-4">
        <Link
          to={`/dashboard/userprofiledetails/${dbUser?.id}`}
          className="group relative flex items-center"
        >
          <div className="relative">
            {/* ✅ ইউজার ছবি */}
            <img
              src={dbUser?.dp}
              className="border-primary h-11 w-11 rounded-full border object-cover"
              alt="user"
            />

            {/* ✅ স্ট্যাটাস ব্যাজ */}
            <span
              className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white ${
                isActive ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          </div>

          {/* ✅ Tooltip (sidebar বন্ধ থাকলে) */}
          {!isOpen && (
            <span className="bg-primary text-accent absolute left-14 translate-y-2 scale-95 rounded-sm px-2 py-2 text-sm whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
              User Profile
            </span>
          )}
        </Link>

        {/* ✅ Sidebar খোলা থাকলে নাম, designation ও logout */}
        {isOpen && (
          <>
            <Link
              to={`/dashboard/userprofiledetails/${dbUser?.id}`}
              className="text-start"
            >
              <h2 className="font-primary text-[14px]">{dbUser?.first_name}</h2>
              <h2 className="font-secondary text-[10px]">
                {dbUser?.designation || ""}
              </h2>
            </Link>

            <div className="hover:text-primary ml-auto cursor-pointer">
              <FiLogOut onClick={handleLogOut} className="text-[20px]" />
            </div>
          </>
        )}
      </div>

      {/* //////// munshi coding and setup this */}
      {/* <div className="mt-auto flex items-center space-x-4">
  <Link to={`/dashboard/userprofiledetails/${dbUser?.id}`} className="group relative flex items-center">
    <img
      src={`${dbUser?.dp}`}
      className={`${isOpen ? "w-11" : "w-11"} border-primary rounded-full border-1`}
      alt="user"
    />
    {!isOpen && (
      <span className="bg-primary text-accent absolute left-14 translate-y-2 scale-95 rounded-sm px-2 py-2 text-sm whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
        User Profile
      </span>
    )}
  </Link>

  {isOpen && (
    <>
      <Link to={`/dashboard/userprofiledetails/${dbUser?.id}`} className="text-start">
        <h2 className="font-primary text-[14px]">{dbUser?.first_name}</h2>
        <h2 className="font-secondary text-[10px]">
          {`${dbUser?.designation || "Pending.."}`}
        </h2>
      </Link>

      <div className="hover:text-primary ml-auto cursor-pointer">
        <FiLogOut onClick={handleLogOut} className="text-[20px]" />
      </div>
    </>
  )}
</div> */}
    </aside>
  );
};

export default SidebarStyle;
