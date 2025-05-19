import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import {
  BsFileEarmarkBarGraph,
  BsFillFileEarmarkPdfFill,
} from "react-icons/bs";
import { FaPeopleCarry, FaProjectDiagram, FaUser } from "react-icons/fa";
import { FaAward, FaPersonArrowUpFromLine } from "react-icons/fa6";
import { FiExternalLink, FiLogOut } from "react-icons/fi";
import { GiTakeMyMoney } from "react-icons/gi";
import { GrWorkshop } from "react-icons/gr";
import { ImProfile } from "react-icons/im";
import { HiOutlineFingerPrint } from "react-icons/hi2";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { MdBookmarkAdd, MdSafetyDivider } from "react-icons/md";
import {
  PiBuildingOfficeFill,
  PiRankingFill,
  PiUserListFill,
} from "react-icons/pi";
import { RiTeamFill } from "react-icons/ri";
import { TbMessage2Check } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeContext";
import ToggleDarkAndLight from "../ToggleDarkAndLight/ToggleDarkAndLight";

const SidebarStyle = () => {
  const { theme } = useTheme();
  const {
    role,
    dbUser,
    operationMemberPermission,
    salesMemberPermission,
    hodPermission,
    businessDevelopmentPermission,
  } = useContext(AuthContext);
  const { logOutUser } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const sidebarItemsOperationMember = [
    { icon: <FiExternalLink />, label: "Over View", path: "over-view" },
    { icon: <FaProjectDiagram />, label: "Projects", path: "projects" },
    { icon: <GrWorkshop />, label: "Today Task", path: "todaytask" },
    { icon: <HiOutlineFingerPrint />, label: "Attendance", path: "attendance" },

    {
      icon: <RiTeamFill />,
      label: "Team Perform",
      path: "teamperformance",
    },
    {
      icon: <FaPersonArrowUpFromLine />,
      label: "Self Perform",
      path: "performance",
    },
    ...(role === "operation_leader"
      ? [
          {
            icon: <MdSafetyDivider />,
            label: "Distribution",
            path: "distribution",
          },
        ]
      : []),
    { icon: <TbMessage2Check />, label: "Update", path: "update-message" },
    { icon: <FaAward />, label: "Awards", path: "best_performance" },
  ];

  const sidebarItemsSalesMember = [
    { icon: <FiExternalLink />, label: "Over View", path: "over-view" },
    { icon: <FaProjectDiagram />, label: "Projects", path: "projects" },
    {
      icon: <FaPersonArrowUpFromLine />,
      label: "Self Perform",
      path: "performance",
    },
    {
      icon: <BsFileEarmarkBarGraph />,
      label: "Special Order",
      path: "special-order",
    },
    { icon: <PiRankingFill />, label: "Profile Ranking", path: "ranking-page" },
    { icon: <GiTakeMyMoney />, label: "Promotion", path: "promotion-summary" },
    { icon: <GiTakeMyMoney />, label: "Add Promotion", path: "promotion-add" },
    { icon: <TbMessage2Check />, label: "Update", path: "update-message" },
    { icon: <HiOutlineFingerPrint />, label: "Attendance", path: "attendance" },

    {
      icon: <BsFillFileEarmarkPdfFill />,
      label: "Quotation",
      path: "quotation-pdf-form",
    },
    { icon: <FaAward />, label: "Awards", path: "best_performance" },
  ];

  const sidebarItemsBusinessDevelopmentTeam = [
    { icon: <FiExternalLink />, label: "Over View", path: "over-view" },
    { icon: <FaProjectDiagram />, label: "Projects", path: "projects" },
    {
      icon: <BsFileEarmarkBarGraph />,
      label: "Special Order",
      path: "special-order",
    },
    { icon: <PiRankingFill />, label: "Profile Ranking", path: "ranking-page" },
    { icon: <GiTakeMyMoney />, label: "Add Promotion", path: "promotion-add" },
    { icon: <HiOutlineFingerPrint />, label: "Attendance", path: "attendance" },

    {
      icon: <MdBookmarkAdd />,
      label: "Add Awards",
      path: "bestcontributors",
    },
    { icon: <FaAward />, label: "Awards", path: "best_performance" },
  ];

  const sidebarItemsHOD = [
    { icon: <FiExternalLink />, label: "Over View", path: "over-view" },
    { icon: <FaProjectDiagram />, label: "Projects", path: "projects" },
    { icon: <MdSafetyDivider />, label: "Distribution", path: "distribution" },
    { icon: <FaUser />, label: "User List", path: "userlist" },
    { icon: <FaPeopleCarry />, label: "Team Create", path: "create-team" },
    { icon: <HiOutlineFingerPrint />, label: "Attendance", path: "attendance" },

    {
      icon: <PiBuildingOfficeFill />,
      label: "Department Create",
      path: "create-department",
    },
    {
      icon: <ImProfile />,
      label: "Profile Create",
      path: "create-profile",
    },
    {
      icon: <PiUserListFill />,
      label: "Profile List",
      path: "profile-List",
    },
    { icon: <FaAward />, label: "Awards", path: "best_performance" },
  ];

  const sidebarItemsCEO = [
    { icon: <FiExternalLink />, label: "Over View", path: "over-view" },
    { icon: <FaProjectDiagram />, label: "Projects", path: "projects" },

    { icon: <GrWorkshop />, label: "Today Task", path: "todaytask" },
    { icon: <HiOutlineFingerPrint />, label: "Attendance", path: "attendance" },

    {
      icon: <RiTeamFill />,
      label: "Team Perform",
      path: "teamperformance",
    },
    {
      icon: <FaPersonArrowUpFromLine />,
      label: "Self Perform",
      path: "performance",
    },
    { icon: <MdSafetyDivider />, label: "Distribution", path: "distribution" },
    {
      icon: <MdBookmarkAdd />,
      label: "Add Awards",
      path: "bestcontributors",
    },

    {
      icon: <BsFileEarmarkBarGraph />,
      label: "Special Order",
      path: "special-order",
    },

    { icon: <PiRankingFill />, label: "Profile Ranking", path: "ranking-page" },
    { icon: <GiTakeMyMoney />, label: "Add Promotion", path: "promotion-add" },
    { icon: <FaUser />, label: "User List", path: "userlist" },
    { icon: <FaPeopleCarry />, label: "Team Create", path: "create-team" },

    { icon: <TbMessage2Check />, label: "Update", path: "update-message" },
    { icon: <FaAward />, label: "Awards", path: "best_performance" },
  ];

  const handleLogOut = () => {
    logOutUser();
    Cookies.remove("core");
    navigate("/");
  };

  const isActive = dbUser?.account_status?.toLowerCase() === "active";

  return (
    <aside
      className={`bg-background text-accent hover:text-accent z-1 min-h-screen border-r-1 border-gray-700 ${
        theme === "light-mode" ? "" : "border-gray-700"
      } ${
        isOpen ? "w-48 space-y-3 px-2 py-4" : "w-14 space-y-2 px-2 py-2"
      } flex flex-col justify-between transition-[width] duration-300 ease-in-out`}
      style={{ transitionProperty: "width, padding" }}
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
          draggable={false}
        />
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Sidebar">
          {isOpen ? (
            <IoMdArrowDropleftCircle className="cursor-pointer text-xl" />
          ) : (
            <IoMdArrowDroprightCircle className="cursor-pointer text-[20px]" />
          )}
        </button>
      </div>

      {/* Sidebar Items */}
      <nav className="font-secondary">
        {operationMemberPermission &&
          sidebarItemsOperationMember.map((item, index) => (
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
                  <span className="bg-primary will-change-opacity pointer-events-none absolute left-12 translate-y-2 scale-95 rounded-sm px-2 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 will-change-transform group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          ))}
        {salesMemberPermission &&
          sidebarItemsSalesMember.map((item, index) => (
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
                  <span className="bg-primary will-change-opacity pointer-events-none absolute left-12 translate-y-2 scale-95 rounded-sm px-2 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 will-change-transform group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          ))}
        {businessDevelopmentPermission &&
          sidebarItemsBusinessDevelopmentTeam.map((item, index) => (
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
                  <span className="bg-primary will-change-opacity pointer-events-none absolute left-12 translate-y-2 scale-95 rounded-sm px-2 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 will-change-transform group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          ))}
        {hodPermission &&
          sidebarItemsHOD.map((item, index) => (
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
                  <span className="bg-primary will-change-opacity pointer-events-none absolute left-12 translate-y-2 scale-95 rounded-sm px-2 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 will-change-transform group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          ))}

        <div className="border-primary flex w-full flex-wrap gap-2 overflow-hidden border-1 p-2 text-[14px]">
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

      <div className="mt-auto flex items-center space-x-4">
        <Link
          to={`/dashboard/userprofiledetails/${dbUser?.id}`}
          className="group relative flex items-center"
        >
          <div className="relative">
            {/* ইউজার ছবি */}
            <img
              src={dbUser?.dp}
              className="border-primary h-11 w-11 rounded-full border object-cover"
              alt="user"
            />

            {/* স্ট্যাটাস ব্যাজ */}
            <span
              className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white ${
                isActive ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          </div>

          {/* Tooltip (sidebar বন্ধ থাকলে) */}
          {!isOpen && (
            <span className="bg-primary text-accent will-change-opacity pointer-events-none absolute left-14 translate-y-2 scale-95 rounded-sm px-2 py-2 text-sm whitespace-nowrap opacity-0 transition-all duration-300 will-change-transform group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
              User Profile
            </span>
          )}
        </Link>

        {/* Sidebar খোলা থাকলে নাম, designation ও logout */}
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
    </aside>
  );
};

export default SidebarStyle;
