import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useSocket } from "../../context/SocketContext.js";
import {
  useDepartmentNames,
  useProfileNames,
  useSalesMembers,
} from "../../hooks/useSocketDataUtils.js";

function AddProjectForm({ setShowModal, refetch }) {
  const socket = useSocket();
  const departments = useDepartmentNames(socket);
  const profiles = useProfileNames(socket);
  const sales = useSalesMembers(socket);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    try {
      const token = Cookies.get("core");
      console.log(data);

      const res = await axios.post(
        "https://mtsbackend20-production.up.railway.app/api/project/create",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200 || res.status === 201) {
        toast.success("Project added successfully");
        setShowModal(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to add project");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add New Project</h2>
          <button
            className="text-xl font-bold text-red-500"
            onClick={() => setShowModal(false)}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="order_id"
            placeholder="# Order ID"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="clientName"
            placeholder="Client Name"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            name="orderAmount"
            placeholder="Order Amount"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="sheet_link"
            placeholder="Sheet Link"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="date"
            name="deli_last_date"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Department Select */}
          <select
            name="department"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Department</option>
            {departments?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.department_name}
              </option>
            ))}
            {/* ডায়নামিক ডেটা চাইলে এখানে map করতে পারো */}
          </select>

          {/* Profile Select */}
          <select
            name="profile"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Profile</option>
            {profiles?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.profile_name}
              </option>
            ))}

            {/* ডায়নামিক ডেটা চাইলে এখানে map করতে পারো */}
          </select>

          {/* Ordered By Select */}
          <select
            name="ordered_by"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Ordered By</option>
            {sales?.map((item) => (
              <option key={item.id} value={item.id}>
                {item?.name}
              </option>
            ))}
            {/* ডায়নামিক ডেটা চাইলে এখানে map করতে পারো */}
          </select>

          <p className="text-secondary py-2">Complete Requirements:</p>
          <span className="text-secondary inline-block pb-4">
            Yes
            <input
              className="ml-2 px-2"
              type="radio"
              value="Yes"
              name="project_requirements"
            />
          </span>
          <span className="text-secondary inline-block px-2 pb-4">
            No
            <input
              className="ml-2 px-2"
              type="radio"
              value="No"
              name="project_requirements"
            />
          </span>

          <button
            type="submit"
            className="font-secondary bg-primary w-full rounded px-4 py-2 text-white hover:bg-blue-700"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProjectForm;
