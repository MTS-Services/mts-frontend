import { useState, useRef } from "react";
import Select from "react-select";
import { RiArrowDropDownLine } from "react-icons/ri";

const CustomSearchDropdown = ({
  options,
  value,
  onChange,
  isMulti = false,
  placeholder = "Search project...",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => {
    setMenuOpen((prev) => {
      const next = !prev;
      next ? selectRef.current?.focus() : selectRef.current?.blur();
      return next;
    });
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#ffffff",
      border: "none",
      boxShadow: "none",
      minHeight: "18px",
      fontSize: "1rem", // base font size
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#11284A",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#7FDBFF",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#19B3E7"
        : state.isFocused
          ? "#147aa7"
          : "#11284A",
      color: "#ffffff",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#11284A",
      zIndex: 9999,
      overflowX: "hidden",
      width: "250px",
      marginTop: "12px",
      marginLeft: "-20px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: () => ({
      display: "none",
    }),
  };

  return (
    <div className="border-border-color bg-secondary flex w-[250px] items-center justify-between gap-2 rounded border-2 p-2">
      {/* Select Box */}
      <div className="border-border-color/30 flex w-full items-center rounded border bg-white pl-2">
        <Select
          ref={selectRef}
          isMulti={isMulti}
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          styles={customStyles}
          menuIsOpen={menuOpen}
          onMenuOpen={() => setMenuOpen(true)}
          onMenuClose={() => setMenuOpen(false)}
        />
      </div>

      {/* Dropdown Icon */}
      <div
        className="border-accent/30 flex cursor-pointer items-center gap-2 border-l pl-2"
        onClick={toggleDropdown}
      >
        <RiArrowDropDownLine size={32} className="text-white" />
      </div>
    </div>
  );
};

export default CustomSearchDropdown;
