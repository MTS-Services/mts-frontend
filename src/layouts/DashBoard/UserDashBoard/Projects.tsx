import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  const mtsTargets = [
    { title: "Total Order", amount: "$30000" },
    { title: "Total delivered", amount: "$2500" },
    { title: "Total Target", amount: "$50000" },
    { title: "Total cancels Amount", amount: "$1000" },
    { title: "Total Required sales", amount: "$20000" },
    { title: "Total Required operation", amount: "$25000", note: "mr" },
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
    "Bonus",
    "Stars",
  ];

  const tableData = [
    "20.10.2025",
    "Web Insider",
    "Darkanat08",
    "Wip",
    "google.com",
    "Rakib",
    "30.10.2025",
    "Working",
    "$160",
    "0",
    "5",
  ];

  return (
    <div className="w-full overflow-x-auto py-10 sm:px-4 bg-background min-h-screen lg:px-14 md:px-10 px-6">
      {/* Dashboard Summary Cards */}
      <div className="flex flex-wrap justify-between items-start gap-2">
        {mtsTargets.map(({ title, amount, note }, idx) => (
          <div
            key={idx}
            className="relative bg-primary p-4 text-white rounded-sm w-full md:w-[30%] lg:w-[20%] xl:w-[14%] w-[10%]"
          >
            <h2 className="text-sm md:text-xl">{title}</h2>
            <h2 className="text-sm md:text-xl">{amount}</h2>
            <div className="absolute top-2 right-2 group">
              <MdInfoOutline className="text-xl" />
              <div className="absolute top-6 right-0 bg-black text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 w-40 pointer-events-none">
                {note}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Table */}
      <div className="overflow-x-auto mt-10">
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className="bg-secondary text-white text-sm rounded-2xl">
              {tableHeaders.map((head, i) => (
                <th
                  key={head}
                  className={`px-2 py-3 border-r border-primary ${
                    i === 0 ? "border-x" : ""
                  } ${i === 10 ? "rounded-tr-sm rounded-br-sm" : ""}`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2].map((_, i) => (
              <tr
                key={i}
                className="bg-primary text-white text-sm rounded-2xl shadow-box-style hover:shadow-box-style hover:shadow-border-color transition-all duration-300 ease-in-out transform"
              >
                {tableData.map((text, idx) => (
                  <td
                    key={idx}
                    className={`px-2 py-3 border-r border-secondary ${
                      idx === 0 ? "border-x" : ""
                    } ${idx === 10 ? "rounded-tr-sm rounded-br-sm" : ""}`}
                  >
                    {text}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Project Button and Modal */}
      <div className="mb-4 mt-6">
        <button
          onClick={toggleModal}
          className="bg-secondary hover:bg-primary text-accent px-4 py-2 rounded text-xl transition duration-300"
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
                  {
                    label: "Stars",
                    type: "number",
                    props: { min: 1, max: 5 },
                  },
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
