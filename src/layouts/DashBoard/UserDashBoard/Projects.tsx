import { useState, useEffect } from "react";
import { MdInfoOutline } from "react-icons/md";

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState([]); // Ensure it's an empty array initially
  const [filter, setFilter] = useState({
    account: "",
    operationStatus: "",
    orderedBy: "",
  });

  const toggleModal = () => setIsOpen(!isOpen);

  const mtsTargets = [
    { title: "Total Order", amount: "$30000" },
    { title: "Total delivered", amount: "$2500" },
    { title: "Total Target", amount: "$50000" },
    { title: "Cancels ", amount: "$1000" },
    { title: "Total sales", amount: "$20000" },
    { title: "Total operation", amount: "$25000", note: "mr" },
  ];

  const tableHeaders = [
    "Date",
    "Account",
    "Client Name",
    "Operation-Status",
    "Sheet link",
    "Ordered by",
    "Delivery Last Date",
    "Profile Status",
    "After Fiverr",
    "Tips",
    "Rating",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.10.40:3000/api/project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            page: "1",
            limit: "10"
          })
        });

        const data = await response.json();
        console.log("API response:", data);

        // Access data.projects if it exists
        if (data?.projects && Array.isArray(data.projects)) {
          setTableData(data.projects);
        } else {
          console.error("API response is not in the expected format:", data);
          setTableData([]); // Fallback to empty array if response is not in the expected format
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = tableData.filter((row) => {
    const accountMatch = filter.account ? row.account === filter.account : true;
    const statusMatch = filter.operationStatus ? row.operationStatus === filter.operationStatus : true;
    const orderedByMatch = filter.orderedBy ? row.orderedBy === filter.orderedBy : true;
    return accountMatch && statusMatch && orderedByMatch;
  });

  const uniqueAccounts = [...new Set(tableData.map((row) => row.account))];
  const operationStatuses = ["Wip", "Completed", "Pending"];
  const orderedByOptions = [...new Set(tableData.map((row) => row.orderedBy))];

  return (
    <div className="w-full overflow-x-auto py-10 sm:px-4 bg-background min-h-screen lg:px-14 md:px-10 px-6">
      {/* Dashboard Summary Cards */}
      <div className="flex flex-wrap justify-between items-start gap-2">
        {mtsTargets.map(({ title, amount, note }, idx) => (
          <div
            key={idx}
            className="relative bg-primary p-4 text-white rounded-sm w-full md:w-[30%] lg:w-[20%] xl:w-[14%] lg:h-28"
          >
            <h2 className="text-sm md:text-xl">{title}</h2>
            <h2 className="text-sm md:text-xl">{amount}</h2>
            <div className="absolute top-2 right-2 group">
              <MdInfoOutline className="text-xl" />
              {note && (
                <div className="absolute top-6 right-0 bg-black text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 w-40 pointer-events-none">
                  {note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Dropdowns */}
      <div className="my-4 flex gap-4 mt-10">
        <select
          value={filter.account}
          onChange={(e) => setFilter({ ...filter, account: e.target.value })}
          className="text-sm px-4 py-2 border border-accent rounded-md w-full text-accent bg-background max-w-48"
        >
          <option value="">Filter by Account</option>
          {uniqueAccounts.map((account, index) => (
            <option key={index} value={account}>
              {account}
            </option>
          ))}
        </select>

        <select
          value={filter.operationStatus}
          onChange={(e) => setFilter({ ...filter, operationStatus: e.target.value })}
          className="text-sm px-4 py-2 border border-accent rounded-md w-full text-accent bg-background max-w-48"
        >
          <option value="">Filter by Operation Status</option>
          {operationStatuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={filter.orderedBy}
          onChange={(e) => setFilter({ ...filter, orderedBy: e.target.value })}
          className="text-sm px-4 py-2 border border-accent rounded-md w-full text-accent bg-background max-w-48"
        >
          <option value="">Filter by Ordered by</option>
          {orderedByOptions.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Project Table */}
      <div className="overflow-x-auto mt-10">
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className="bg-secondary text-white text-[16px] border border-white">
              {tableHeaders.map((head, i) => (
                <th
                  key={head}
                  className={`px-2 py-3 border border-white ${i === 0 ? "border-x" : ""}`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="border-2 border-white">
            {filteredData.length > 0 ? (
              filteredData.map((row, i) => (
                <tr
                  key={i}
                  className="odd:bg-primary even:bg-primary/70 text-white text-sm hover:bg-primary/80 transition-all duration-300 ease-in-out transform"
                >
                  <td className="px-2 py-3 border-r border-secondary font-primary font-normal">{row.date}</td>
                  <td className="px-2 py-3 border-r border-secondary font-primary font-normal">{row.account}</td>
                  <td className="px-2 py-3 border-r border-secondary font-primary font-normal">{row.clientName}</td>
                  <td className="px-2 py-3 border-r border-secondary font-primary font-normal">{row.operationStatus}</td>
                  <td className="px-2 py-3 border-r border-secondary font-primary font-normal">{row.sheetLink}</td>
                  <td className="px-2 py-3 border-r border-secondary font-primary font-normal">{row.orderedBy}</td>
                  <td className="px-2 py-3 border-r border-secondary font-primary font-normal">{row.deliveryLastDate}</td>
                  <td className="px-2 py-3 border-r border-secondary font-primary font-normal">{row.profileStatus}</td>
                  <td className="px-2 py-3 border-r border-secondary font-primary font-normal">{row.afterFiverr}</td>
                  <td className="px-2 py-3 border-r border-secondary font-primary font-normal">{row.tips}</td>
                  <td className="px-2 py-3 border-r border-secondary font-primary font-normal">{row.rating}</td>
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

      {/* Add New Project Button and Modal */}
      <div className="mb-4 mt-6">
        <button
          onClick={toggleModal}
          className="bg-primary hover:bg-secondary text-accent font-normal px-4 py-2 rounded text-xl transition duration-300"
        >
          Add New Projects
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Add New Project</h2>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[ 
                  { label: "Date", type: "date" },
                  { label: "Account" },
                  { label: "Client Name" },
                  { label: "Operation-Status" },
                  { label: "Sheet link", type: "url" },
                  { label: "Ordered by" },
                  { label: "Delivery Last Date", type: "date" },
                  { label: "Profile Status" },
                  { label: "After Fiverr" },
                  { label: "Bonus", type: "number" },
                  { label: "Stars", type: "number", props: { min: 1, max: 5 } },
                ].map(({ label, type = "text", props = {} }) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      type={type}
                      {...props}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    />
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
