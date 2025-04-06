import { useState } from "react";

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-between items-center gap-2">
        <div className=" bg-primary p-4  text-white rounded-sm">
          <h2 className="text-xl">Total Order After Fiverr</h2>
          <h2 className="text-xl">$30000</h2>
        </div>
        <div className=" bg-primary p-4  text-white rounded-sm">
          <h2 className="text-xl">Total delivered After Fiverr</h2>
          <h2 className="text-xl">$2500</h2>
        </div>
        <div className=" bg-primary p-4  text-white rounded-sm">
          <h2 className="text-xl">Total Targets</h2>
          <h2 className="text-xl">$20000</h2>
        </div>
        <div className=" bg-primary p-4  text-white rounded-sm">
          <h2 className="text-xl">Total Target After Fiverr</h2>
          <h2 className="text-xl">$50000</h2>
        </div>
        <div className=" bg-primary p-4  text-white rounded-sm">
          <h2 className="text-xl">Total cancels Amount</h2>
          <h2 className="text-xl">$1000</h2>
        </div>
        <div className=" bg-primary p-4  text-white rounded-sm">
          <h2 className="text-xl">Total Required sales</h2>
          <h2 className="text-xl">$20000</h2>
        </div>
        <div className=" bg-primary p-4  text-white rounded-sm">
          <h2 className="text-xl">Total Required operation</h2>
          <h2 className="text-xl">$25000</h2>
        </div>
        <div className=" bg-primary p-4  text-white rounded-sm">
          <h2 className="text-xl">Total Cancele</h2>
          <h2 className="text-xl">5</h2>
        </div>
      </div>

      <table className="w-full min-w-max border-separate border-spacing-y-2 text-left">
        <thead>
          <tr className="bg-secondary text-white text-sm rounded-2xl">
            <th className="px-2 py-3 border-x border-primary">Date</th>
            <th className="px-2 py-3 border-r border-primary">Account</th>
            <th className="px-2 py-3 border-r border-primary">Client Name</th>
            <th className="px-2 py-3 border-r border-primary">
              Operation-Status
            </th>
            <th className="px-2 py-3 border-r border-primary">Sheet link</th>
            <th className="px-2 py-3 border-r border-primary">Ordered by</th>
            <th className="px-2 py-3 border-r border-primary">
              Delivery Last Date
            </th>
            <th className="px-2 py-3 border-r border-primary">
              Profile Status
            </th>
            <th className="px-2 py-3 border-r border-primary">After Fiverr</th>
            <th className="px-2 py-3 border-r border-primary">Bonus</th>
            <th className="px-2 py-3 border-r border-primary rounded-tr-sm rounded-br-sm">
              Stars
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-primary text-white text-sm rounded-2xl shadow-box-style hover:shadow-box-style hover:shadow-border-color transition-all duration-300 ease-in-out transform">
            <td className="px-2 py-3 border-x border-secondary">20.10.2025</td>
            <td className="px-2 py-3 border-r border-secondary">Web Insider</td>
            <td className="px-2 py-3 border-r border-secondary">Darkanat08</td>
            <td className="px-2 py-3 border-r border-secondary">Wip</td>
            <td className="px-2 py-3 border-r border-secondary">google.com</td>
            <td className="px-2 py-3 border-r border-secondary">Rakib</td>
            <td className="px-2 py-3 border-r border-secondary">30.10.2025</td>
            <td className="px-2 py-3 border-r border-secondary">Working</td>
            <td className="px-2 py-3 border-r border-secondary">$160</td>
            <td className="px-2 py-3 border-r border-secondary">0</td>
            <td className="px-2 py-3 border-r border-secondary rounded-tr-sm rounded-br-sm">
              5
            </td>
          </tr>
          <tr className="bg-primary text-white text-sm rounded-2xl shadow-box-style hover:shadow-box-style hover:shadow-border-color transition-all duration-300 ease-in-out transform">
            <td className="px-2 py-3 border-x border-secondary">20.10.2025</td>
            <td className="px-2 py-3 border-r border-secondary">Web Insider</td>
            <td className="px-2 py-3 border-r border-secondary">Darkanat08</td>
            <td className="px-2 py-3 border-r border-secondary">Wip</td>
            <td className="px-2 py-3 border-r border-secondary">google.com</td>
            <td className="px-2 py-3 border-r border-secondary">Rakib</td>
            <td className="px-2 py-3 border-r border-secondary">30.10.2025</td>
            <td className="px-2 py-3 border-r border-secondary">Working</td>
            <td className="px-2 py-3 border-r border-secondary">$160</td>
            <td className="px-2 py-3 border-r border-secondary">0</td>
            <td className="px-2 py-3 border-r border-secondary rounded-tr-sm rounded-br-sm">
              5
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        {/* Button to open modal */}
        <div className="mb-4">
          <button
            onClick={toggleModal}
            className="bg-primary hover:bg-secondary text-accent px-4 py-2 rounded text-xl  transition duration-300"
          >
            Add New Projects
          </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
              {/* Close button */}
              <button
                onClick={toggleModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-4">Add New Project</h2>

              {/* Form */}
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
};

export default Projects;
