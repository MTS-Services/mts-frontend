import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { PiSunDimFill } from "react-icons/pi";
import { useTheme } from "../../context/ThemeContext";

const ToggleDarkAndLight = ({ isOpen }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { toggleTheme } = useTheme();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <button
        onClick={() => {
          toggleTheme();
          handleCheckboxChange();
        }}
        className="themeSwitcherThree relative inline-flex cursor-pointer select-none items-center"
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />

        <div
          className={`${
            isOpen
              ? `max-w-[130px] flex p-[2px] space-x-2 border border-gray-500 rounded-full transition-colors duration-300`
              : ""
          }`}
        >
          {/* Light Mode */}
          <div
            className={`${
              isChecked
                ? "bg-primary text-white p-[2px] rounded-full transition-colors duration-300"
                : "text-body-color"
            }`}
          >
            <div
              className={`flex items-center justify-center  p-[2px] rounded-full transition-colors duration-300 `}
            >
              <PiSunDimFill className="text-xl" />
              <h2 className={`${isOpen ? "text-sm ml-1" : "hidden"}`}>Light</h2>
            </div>
          </div>

          {/* Dark Mode */}
          <div
            className={`${
              isOpen ? "" :"mt-3"
            }
              
              ${
              !isChecked
                ? "bg-primary text-white p-[2px] rounded-full transition-colors duration-300"
                : "text-body-color"
            }`}
          >
            <div
              className={`flex items-center justify-center  p-[2px] rounded-full transition-colors duration-300`}
            >
              <FaMoon className="text-sm" />
              <h2 className={`${isOpen ? "text-sm ml-1" : "hidden"}`}>Dark</h2>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ToggleDarkAndLight;
