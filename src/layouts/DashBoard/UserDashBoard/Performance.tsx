import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import Distribution from "../../../pages/Distribution/Distribution";

const Performance = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedQuater, setSelectedQuater] = useState("");
  const [tableData, setTableData] = useState([]);

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
    "Project Price",
    "Achive price",
    "Leader comment",
    "Your comments",
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
    <div className="bg-background min-h-screen w-full overflow-x-auto px-6 py-10 sm:px-4 md:px-10">
      <div>
        <div className="mt-14 mb-5 flex items-center gap-4">
          <h2 className="my-5 text-4xl text-white">Last Quarter</h2>
          <select
            className="bg-background rounded px-4 py-1 text-white outline-none"
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

        <div className="flex flex-wrap items-start gap-2">
          {lastQuarter.map(({ title, amount, note }, idx) => (
            <div
              key={idx}
              className="bg-primary relative w-full rounded-sm p-4 text-white md:w-[30%] lg:h-28 lg:w-[20%] xl:w-[14%]"
            >
              <h2 className="text-sm md:text-xl">{title}</h2>
              <h2 className="text-sm md:text-xl">{amount}</h2>
              {note && (
                <div className="group absolute top-2 right-2">
                  <MdInfoOutline className="text-xl" />
                  <div className="pointer-events-none absolute top-6 right-0 z-10 w-40 rounded bg-black p-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                    {note}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mt-14 mb-5 flex items-center gap-4">
          <h2 className="text-4xl text-white">Current Month</h2>
          <select
            className="bg-background rounded px-4 py-1 text-white outline-none"
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

        <div className="flex flex-wrap items-start gap-2">
          {currentMonth.map(({ title, amount, note }, idx) => (
            <div
              key={idx}
              className="bg-primary relative w-full rounded-sm p-4 text-white md:w-[30%] lg:h-28 lg:w-[20%] xl:w-[14%]"
            >
              <h2 className="text-sm md:text-xl">{title}</h2>
              <h2 className="text-sm md:text-xl">{amount}</h2>
              {note && (
                <div className="group absolute top-2 right-2">
                  <MdInfoOutline className="text-xl" />
                  <div className="pointer-events-none absolute top-6 right-0 z-10 w-40 rounded bg-black p-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                    {note}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mt-14 mb-5 flex items-center gap-4">
          <h2 className="mb-5 text-4xl text-white">Monthly Destribution</h2>
          <select
            className="bg-background rounded px-4 py-1 text-white outline-none"
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
        <Distribution />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="bg-secondary border border-white text-[16px] text-white">
                {tableHeaders.map((head, i) => (
                  <th
                    key={head}
                    className={`border border-white px-2 py-3 ${
                      i === 0 ? "border-x" : ""
                    }`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="border-2 border-white">
              {tableData.length > 0 ? (
                tableData.map((row, i) => (
                  <tr
                    key={i}
                    className="odd:bg-primary even:bg-primary/70 hover:bg-primary/80 transform text-sm text-white transition-all duration-300 ease-in-out"
                  >
                    <td className="border-secondary font-primary border-r px-2 py-3 font-normal">
                      {row.clientName}
                    </td>

                    <td className="border-secondary font-primary border-r px-2 py-3 font-normal">
                      {row?.after_fiverr_amount}
                    </td>

                    <td className="border-secondary font-primary border-r px-2 py-3 font-normal">
                      {row?.status}
                    </td>
                    <td className="border-secondary font-primary border-r px-2 py-3 font-normal">
                      ${Number(row?.after_fiverr_amount || 0).toFixed(2)}
                    </td>
                    <td className="border-secondary font-primary border-r px-2 py-3 font-normal">
                      ${Number(row?.bonus || 0).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={tableHeaders.length}
                    className="py-4 text-center"
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
