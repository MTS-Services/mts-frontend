// src/components/SelectFilter/SelectFilter.jsx

const SelectFilter = ({ icon, setValue, value, options }) => {
  return (
    <div className="bg-primary border-border-color flex rounded border-2 p-2">
      <div className="bg-primary border-border-color/30 flex items-center border-r-1 pr-2">
        {icon}
      </div>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-primary font-secondary border-border-color/40 mr-2 ml-3 border px-3 focus:outline-0"
      >
        <option value="">Select All</option>
        {options?.map((item) => (
          <option key={item} value={item}>
            {item?.charAt(0).toUpperCase() + item?.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
