import Select from "react-select";

const CustomSelect = ({
  options,
  value,
  onChange,
  isMulti = false,
  placeholder = "",
}) => {
  return (
    <Select
      isMulti={isMulti}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mb-4 w-150"
      classNames={{
        control: () =>
          "bg-primary border border-border-color cursor-pointer flex flex-wrap gap-5 rounded p-2 px-2 py-3 min-h-0 shadow-none",
        valueContainer: () => "p-0",
        multiValue: () =>
          "bg-blue-600 text-white rounded px-1 text-sm flex items-center",
        multiValueLabel: () => "text-white",
        // ✅ your requested fix:
        multiValueRemove: () =>
          "text-white hover:text-red-500 cursor-pointer px-1",
        menu: () => "bg-primary mt-1 rounded",
        menuList: () => "bg-primary",
        option: ({ isFocused, isSelected }) =>
          `cursor-pointer px-4 py-2 ${
            isSelected
              ? "bg-blue-600 text-white"
              : isFocused
                ? "bg-blue-100 text-accent"
                : "text-accent"
          }`,
        placeholder: () => "text-accent",
        singleValue: () => "text-accent",
      }}
    />
  );
};

export default CustomSelect;
