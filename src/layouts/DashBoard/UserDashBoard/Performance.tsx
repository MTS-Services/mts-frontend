import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";

const Performance = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedQuater, setSelectedQuater] = useState("");

  const lastQuarter = [
    { title: "Individual target", amount: "$3000", note: "mr" },
    { title: "Achieve", amount: "$2000", note: "mr" },
    { title: "+/-", amount: "2", note: "mr" },
  ];

  const currentMonth = [
    { title: "Worked Amount", amount: "$3000", note: "mr" },
    { title: "Worked Projects", amount: "$3000", note: "mr" },
    { title: "Target", amount: "$3000", note: "mr" },
    { title: "Achieve", amount: "$2000", note: "mr" },
  ];

  const tableHeaders = [
    "Client Name",
    "Last Update",
    "Assign",
    "Expect Finish Time",
    "Status",
    "Delivery Last Date",
  ];

  const tableData = [
    ["Alex", "20.10.2025", "Masud", "10:30 AM", "Done", "30.10.2025"],
    ["Jordan", "21.10.2025", "Rakib", "11:30 AM", "Pending", "31.10.2025"],
    ["Rifat", "22.10.2025", "Salman", "9:00 AM", "Wip", "01.11.2025"],
  ];

  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const quarterName = [
    "1st January to 31st March",
    "1st April to 30th June",
    "1st July to 30th September",
    "1st October to 31st December",
  ];

  return (
    <div className="w-full overflow-x-auto py-10 sm:px-4 bg-background min-h-screen lg:px-14 md:px-10 px-6">
      <div>
        <div className="flex items-center gap-4 mb-5 mt-14">
          <h2 className="text-white text-4xl my-5">Last Quarter</h2>

          <select
            className="bg-background text-white px-4 py-1  rounded outline-none"
            value={selectedQuater}
            onChange={(e) => setSelectedQuater(e.target.value)}
          >
            {quarterName.map((quarter) => (
              <option key={quarter} value={quarter}>
                {quarter}
              </option>
            ))}
          </select>
        </div>

        {/* Dashboard Summary Cards */}
        <div className="flex flex-wrap items-start gap-2">
          {lastQuarter.map(({ title, amount, note }, idx) => (
            <div
              key={idx}
              className="relative bg-primary p-4 text-white rounded-sm w-full md:w-[30%] lg:w-[20%] xl:w-[14%] lg:h-28"
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
      </div>

      <div>
        {/* Header with Month Select */}
        <div className="flex items-center gap-4 mb-5 mt-14">
          <h2 className="text-white text-4xl">Current Month</h2>
          <select
            className="bg-background text-white px-4 py-1  rounded outline-none"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {monthName.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Dashboard Summary Cards */}
        <div className="flex flex-wrap items-start gap-2">
          {currentMonth.map(({ title, amount, note }, idx) => (
            <div
              key={idx}
              className="relative bg-primary p-4 text-white rounded-sm w-full md:w-[30%] lg:w-[20%] xl:w-[14%] lg:h-28"
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
      </div>

      <div>
        <h2 className="text-white text-4xl mb-5 mt-14">Project Details</h2>

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

            <tbody className=" border-2 border-white">
              {tableData.length > 0 ? (
                tableData.map((row, i) => (
                  <tr
                    key={i}
                    className="odd:bg-primary even:bg-primary/70 text-white text-sm  hover:bg-primary/80 transition-all duration-300 ease-in-out transform"
                  >
                    {row.map((text, idx) => (
                      <td
                        key={idx}
                        className={`px-2 py-3 border-r border-secondary font-primary font-normal ${
                          idx === 0 ? "border-x" : ""
                        } `}
                      >
                        {text}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={tableHeaders.length}
                    className="text-center py-4"
                  >
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Performance;
