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
      minHeight: "50px",
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
      backgroundColor: "#1E293B",
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
        className="w-115"
        styles={customStyles}
      />
    </div>
  );
};

export default CustomDropDown;
