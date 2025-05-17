import Select from "react-select";

const CustomSelect = ({
  options,
  value,
  onChange,
  isMulti = false,
  placeholder = "",
}) => {
  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: "60px", // 👈 increase height here (default is ~38px)
      borderRadius: "6px",
      backgroundColor: "#ffffff",
      borderColor: "#e5e7eb",
      padding: "4px", // optional for internal spacing
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#1D4ED8"
        : state.isFocused
          ? "#F87171"
          : "#111827",
      color: state.isSelected || state.isFocused ? "#FFFFFF" : "#FBBF24",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      backgroundColor: "#000000",
    }),
  };

  return (
    <Select
      isMulti={isMulti}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mb-4 w-150"
      styles={customStyles}
    />
  );
};

export default CustomSelect;
