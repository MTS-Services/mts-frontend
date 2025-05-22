import Select from "react-select";

const CustomDropDown = ({
  options,
  value,
  onChange,
  isMulti = false,
  placeholder = "",
}) => {
  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: "40px",
      borderRadius: "6px",
      backgroundColor: "#ffffff",
      borderColor: "#19B3E7",
      padding: "4px",
      cursor: "pointer",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#19B3E7"
        : state.isFocused
          ? "#19B3E7"
          : "#11284A",
      color: "#ffffff",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      backgroundColor: "#11284A",
    }),
  };

  return (
    <div className="border-border-color text-accent flex cursor-pointer rounded">
      <Select
        isMulti={isMulti}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-40"
        styles={customStyles}
      />
    </div>
  );
};

export default CustomDropDown;

// import { useState, useRef, useEffect } from "react";
// import { FiPlusSquare } from "react-icons/fi";

// const CustomDropdown = () => {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Trigger Button */}
//       <div
//         onClick={() => setOpen(!open)}
//         className="border-border-color bg-secondary flex cursor-pointer flex-wrap rounded border-2 p-2 duration-150 hover:scale-95"
//       >
//         <div className="border-border-color/30 flex items-center border-r-1 pr-2">
//           <FiPlusSquare className="cursor-pointer" />
//         </div>
//         <button className="cursor-pointer px-2">Options</button>
//       </div>

//       {/* Dropdown Menu */}
//       {open && (
//         <div className="bg-background border-border-color absolute left-0 z-50 mt-2 w-48 rounded border shadow-md">
//           <ul className="text-accent">
//             <li className="hover:bg-primary cursor-pointer px-4 py-2">
//               Add Project
//             </li>
//             <li className="hover:bg-primary cursor-pointer px-4 py-2">
//               Import Project
//             </li>
//             <li className="hover:bg-primary cursor-pointer px-4 py-2">
//               Settings
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomDropdown;
