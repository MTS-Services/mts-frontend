import { MdInfoOutline } from "react-icons/md";

const Performance = () => {
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

  const tableData = [
    ["Alex", "20.10.2025", "Masud", "10:30 AM", "Done", "30.10.2025"],
    ["Jordan", "21.10.2025", "Rakib", "11:30 AM", "Pending", "31.10.2025"],
    ["Rifat", "22.10.2025", "Salman", "9:00 AM", "Wip", "01.11.2025"],
  ];

  return (
    <div className="w-full overflow-x-auto py-10 sm:px-4 bg-background min-h-screen lg:px-14 md:px-10 px-6">
      <div>
        <h2 className="text-white text-4xl my-5">Last Quater</h2>
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
      </div>
      <div>
        <h2 className="text-white text-4xl my-5">Current Month </h2>
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
      </div>

      <div>
        <h2 className="text-white text-4xl my-5">Current Month </h2>
        {/* Filter Dropdowns */}

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
