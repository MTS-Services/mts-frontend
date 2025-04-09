import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";

const TodayTask = () => {
  const [filter, setFilter] = useState({
    assign: "",
    status: "",
  });

  const mtsTargets = [
    { title: "Total Revision", amount: "10" },
    { title: "Time Short", amount: "4" },
    { title: "Submitted", amount: "2", note: "mr" },
  ];

  const tableHeaders = [
    "Client Name",
    "Last Update",
    "Assign",
    "Expect Finish Time",
    "Status",
    "Delivery Last Date",
  ];

  const [tableData, setTableData] = useState([
    ["Alex", "20.10.2025", "Masud", "10:30 AM", "Done", "30.10.2025"],
    ["Jordan", "21.10.2025", "Rakib", "11:30 AM", "Pending", "31.10.2025"],
    ["Rifat", "22.10.2025", "Salman", "9:00 AM", "Wip", "01.11.2025"],
  ]);

  const assignOptions = [...new Set(tableData.map((row) => row[2]))];
  const statusOptions = [...new Set(tableData.map((row) => row[4]))];

  const filteredData = tableData.filter((row) => {
    const assignMatch = filter.assign ? row[2] === filter.assign : true;
    const statusMatch = filter.status ? row[4] === filter.status : true;
    return assignMatch && statusMatch;
  });

  const handleChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  return (
    <div className="w-full overflow-x-auto py-10 sm:px-4 bg-background min-h-screen lg:px-14 md:px-10 px-6">
      {/* Dashboard Summary Cards */}
      <div className="flex flex-wrap items-start gap-2">
        {mtsTargets.map(({ title, amount, note }, idx) => (
          <div
            key={idx}
            className="relative bg-primary p-4 text-white rounded-sm w-full md:w-[30%] lg:w-[20%] xl:w-[14%] w-[10%] lg:h-28"
          >
            <h2 className="text-sm md:text-xl">{title}</h2>
            <h2 className="text-sm md:text-xl">{amount}</h2>
            {note && (
              <div className="absolute top-2 right-2 group">
                <MdInfoOutline className="text-xl" />
                <div className="absolute top-6 right-0 bg-black text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 w-40 pointer-events-none">
                  {note}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Filter Dropdowns */}
      <div className="my-4 flex gap-4 mt-10">
        <select
          value={filter.assign}
          onChange={(e) => setFilter({ ...filter, assign: e.target.value })}
          className="text-sm px-4 py-2 border border-accent rounded-md w-full text-accent bg-background max-w-48"
        >
          <option value="">Filter by Assign</option>
          {assignOptions.map((assign, index) => (
            <option key={index} value={assign}>
              {assign}
            </option>
          ))}
        </select>

        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="text-sm px-4 py-2 border border-accent rounded-md w-full text-accent bg-background max-w-48"
        >
          <option value="">Filter by Status</option>
          {statusOptions.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Project Details Table */}
      <div className="overflow-x-auto mt-10">
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className="bg-secondary text-white text-[16px] border border-white">
              {tableHeaders.map((head, i) => (
                <th
                  key={head}
                  className={`px-2 py-3 border border-white ${
                    i === 0 ? "border-x" : ""
                  }`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="border-2 border-white">
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="odd:bg-primary even:bg-primary/70 text-white text-sm hover:bg-primary/80 transition-all duration-300 ease-in-out transform"
                >
                  {row.map((cell, colIndex) => {
                    const isAssignCol = colIndex === 2;
                    const isStatusCol = colIndex === 4;
                    return (
                      <td
                        key={colIndex}
                        className={`px-2 py-3 border-r border-secondary font-primary font-normal ${
                          colIndex === 0 ? "border-x" : ""
                        }`}
                      >
                        {(isAssignCol || isStatusCol) ? (
                          <div className="relative w-full flex items-center">
                            <select
                              value={cell}
                              onChange={(e) =>
                                handleChange(rowIndex, colIndex, e.target.value)
                              }
                              className="appearance-none bg-transparent text-white border-none focus:outline-none text-sm w-full pr-4"
                            >
                              {(isAssignCol ? assignOptions : statusOptions).map((opt) => (
                                <option
                                  key={opt}
                                  value={opt}
                                  className="bg-primary text-white px-2 py-1"
                                >
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <MdArrowDropDown className="absolute right-1 pointer-events-none text-white text-lg" />
                          </div>
                        ) : (
                          cell
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeaders.length} className="text-center py-4">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayTask;
