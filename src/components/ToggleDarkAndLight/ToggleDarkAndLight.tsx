import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { PiSunDimFill } from "react-icons/pi";
import { useTheme } from "../../context/ThemeContext";

const ToggleDarkAndLight = ({ isOpen }) => {
  const [isChecked, setIsChecked] = useState(false);
const {theme, toggleTheme} =useTheme()
 
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label onClick={toggleTheme} className="themeSwitcherThree relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />

        <div
          className={`${
            !isOpen
              ? ""
              : "w-40 bg-black flex items-center justify-around border border-gray-500  rounded-full"
          }`}
        >
          <div
            className={`${
              isOpen ? "flex items-center  p-[4px] rounded-full" : "mb-5"
            }`}
          >
            <div
              className={`flex items-center justify-center  text-accent  ml-2 P-2 ${
                isChecked
                  ? "bg-sky-950 P-2 rounded-full text-white"
                  : "text-body-color"
              }`}
            >
              <PiSunDimFill className="text-xl" />
              <h2 className={`${isOpen ? "text-sm" : "hidden"}`}>Light</h2>
            </div>
          </div>

          <div
            className={`${
              isOpen ? "flex items-center p-[4px] rounded-full" : ""
            }`}
          >
            <div
              className={`flex items-center justify-center  rounded text-accent  ${
                !isChecked
                  ? "bg-sky-950 P-2 rounded-full text-white"
                  : "text-body-color"
              }`}
            >
              <FaMoon className="text-sm" />
              <h2 className={`${isOpen ? "text-sm" : "hidden"}`}>Dark</h2>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default ToggleDarkAndLight;
