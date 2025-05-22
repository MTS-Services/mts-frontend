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
      borderColor: "primary",
      padding: "4px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#19B3E7"
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
      className="mb-4 w-40"
      styles={customStyles}
    />
  );
};

export default CustomDropDown;
