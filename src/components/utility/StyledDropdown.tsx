import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useFetchData } from "../../hooks/useFetchData";

function StyledDropdown({ options = [], onSelect }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState("Select");

  const { data } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/team",
  );

  const isStatic = options.length > 0;
  const dynamicOptions = data?.teams || [];

  const handleSelect = (option) => {
    const label = typeof option === "string" ? option : option.team_name;
    const value = typeof option === "string" ? option : option.id;

    setSelected(label);
    setDropdownOpen(false);
    onSelect && onSelect(value);
  };

  return (
    <div className="font-secondary relative mt-14 w-48">
      {/* Dropdown Trigger Button */}
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="border-border-color bg-secondary flex cursor-pointer items-center rounded border-2 p-2 duration-150 hover:scale-95"
      >
        <div className="border-border-color/30 flex items-center border-r-1 pr-2">
          <FiChevronDown className="text-white" />
        </div>
        <span className="cursor-pointer truncate px-2">{selected}</span>
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <ul className="absolute right-0 z-50 mt-2 w-48 rounded border border-gray-700 bg-[#2a2a2a] text-sm text-white shadow-lg">
          {/* Extra Options Only for Dynamic */}
          {!isStatic && (
            <>
              <li
                onClick={() => handleSelect("Monthly")}
                className="cursor-pointer px-4 py-2 hover:bg-gray-700"
              >
                Monthly
              </li>
              <li
                onClick={() => handleSelect("Daily")}
                className="cursor-pointer px-4 py-2 hover:bg-gray-700"
              >
                Daily
              </li>
            </>
          )}

          {/* Render Options */}
          {(isStatic ? options : dynamicOptions).map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(option)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-700"
            >
              {isStatic ? option : option.team_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StyledDropdown;
