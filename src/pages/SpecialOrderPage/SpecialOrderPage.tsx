import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../../context/SocketContext";
import { useFetchData } from "../../hooks/useFetchData";
import { useProfileNames } from "../../hooks/useSocketDataUtils";

// useCurrentTime হুক: local midnight হিসেবে date ধরে, নেগেটিভ দিন ও ঘণ্টাও দেখাবে
function useCurrentTime(targetDateString) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });

  useEffect(() => {
    if (!targetDateString) return;

    const [year, month, day] = targetDateString.split("-").map(Number);
    if (!year || !month || !day) {
      setTimeLeft({ days: 0, hours: 0 });
      return;
    }
    const targetDate = new Date(year, month - 1, day);

    const updateCountdown = () => {
      const now = new Date();
      const diffMs = targetDate.getTime() - now.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      const days = Math.floor(diffHours / 24);
      const hours = Math.floor(diffHours % 24);

      setTimeLeft({ days, hours });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, [targetDateString]);

  return timeLeft;
}

const CountdownDisplay = ({ targetDate }) => {
  const { days, hours } = useCurrentTime(targetDate);
  const isNegative = days < 0 || hours < 0;

  return (
    <span
      className={`block px-4 py-1 text-sm ${isNegative ? "text-red-600" : ""}`}
    >
      {days}d {hours}h left
    </span>
  );
};

function SpecialOrderPage() {
  const [datas, setDatas] = useState([]);
  const socket = useSocket();
  const profiles = useProfileNames(socket);
  const { data, loading, refetch } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/profile/projectSpecialOrder/",
  );

  useEffect(() => {
    const fetchedOrders = Array.isArray(data) ? data : (data?.orders ?? []);
    setDatas(fetchedOrders);
  }, [data]);

  const [formData, setFormData] = useState({
    profile_name: "",
    special_order_amount: "",
    delivery_date: "",
    client_name: "",
  });

  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    profile_name: "",
    special_order_amount: "",
    delivery_date: "",
    client_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.profile_name) {
        toast.error("Please select a profile");
        return;
      }
      const payload = {
        profileName: formData.profile_name,
        special_order_amount: Number(formData.special_order_amount),
        delivery_date: formData.delivery_date,
        client_name: formData.client_name,
      };
      const token = Cookies.get("core");
      await axios.post(
        "https://mtsbackend20-production.up.railway.app/api/profile/projectSpecialOrder/create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Special order added successfully");
      refetch();
      setFormData({
        profile_name: "",
        special_order_amount: "",
        delivery_date: "",
        client_name: "",
      });
    } catch (error) {
      toast.error("Failed to add special order");
      console.error(error);
    }
  };

  const handleEditClick = (order) => {
    setEditRowId(order.id);
    setEditFormData({
      profile_name: order.profile?.profile_name || "",
      special_order_amount: order.special_order_amount || "",
      delivery_date: order.delivery_date?.split("T")[0] || "",
      client_name: order.client_name || "",
    });
  };

  const handleSaveEdit = async () => {
    try {
      if (!editFormData.profile_name) {
        toast.error("Please select a profile");
        return;
      }
      const payload = {
        profileName: editFormData.profile_name,
        special_order_amount: Number(editFormData.special_order_amount),
        delivery_date: editFormData.delivery_date,
        client_name: editFormData.client_name,
      };
      const token = Cookies.get("core");
      await axios.put(
        `https://mtsbackend20-production.up.railway.app/api/profile/projectSpecialOrder/${editRowId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Order updated successfully");
      setEditRowId(null);
      refetch();
    } catch (error) {
      toast.error("Failed to update order");
      console.error(error);
    }
  };

  const handleCancelEdit = () => setEditRowId(null);

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get("core");
      await axios.delete(
        `https://mtsbackend20-production.up.railway.app/api/profile/projectSpecialOrder/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Order deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete order");
      console.error(error);
    }
  };

  return (
    <div className="bg-background font-primary flex min-h-screen flex-col items-center justify-center space-y-10 p-4 md:p-6">
      <ToastContainer />

      {/* Add Form */}
      <div className="bg-background border-primary w-full max-w-2xl rounded-lg border p-6 shadow-lg md:p-8">
        <h2 className="text-accent font-primary mb-6 text-center text-2xl font-bold md:text-3xl">
          Create Special Order
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-accent font-primary mb-2 block">
              Profile
            </label>
            <select
              name="profile_name"
              value={formData.profile_name}
              onChange={handleChange}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              required
            >
              <option value="">Select Profile</option>
              {profiles.map((prof) => (
                <option key={prof.id} value={prof.profile_name}>
                  {prof.profile_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-accent font-primary mb-2 block">
              Amount
            </label>
            <input
              type="number"
              name="special_order_amount"
              value={formData.special_order_amount}
              onChange={handleChange}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              required
            />
          </div>
          <div>
            <label className="text-accent font-primary mb-2 block">
              Delivery Date
            </label>
            <input
              type="date"
              name="delivery_date"
              value={formData.delivery_date}
              onChange={handleChange}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className="text-accent font-primary mb-2 block">
              Client Name
            </label>
            <input
              type="text"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-blue-600 py-3 font-semibold text-white transition duration-200 hover:scale-95 hover:bg-blue-700"
          >
            Submit Order
          </button>
        </form>
      </div>

      {/* Order List */}
      <div className="bg-secondary border-primary w-full max-w-7xl rounded-lg border p-4 shadow-md md:p-6">
        <h3 className="text-primary font-primary mb-4 text-center text-xl font-bold md:text-2xl">
          Order List
        </h3>
        {loading ? (
          <p className="text-primary text-center">Loading...</p>
        ) : datas.length === 0 ? (
          <p className="text-primary text-center">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="border-primary font-primary w-full table-auto border text-sm md:text-base">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="border-primary border px-4 py-2 text-left">
                    #
                  </th>
                  <th className="border-primary border px-4 py-2 text-left">
                    Profile
                  </th>
                  <th className="border-primary border px-4 py-2 text-left">
                    Amount
                  </th>
                  <th className="border-primary border px-4 py-2 text-left">
                    Delivery Date
                  </th>
                  <th className="border-primary border px-4 py-2 text-left">
                    Client Name
                  </th>
                  <th className="border-primary border px-4 py-2 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.map((order, index) => (
                  <tr
                    key={order.id}
                    className="odd:bg-secondary even:bg-background text-accent"
                  >
                    <td className="border-primary border px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {editRowId === order.id ? (
                        <select
                          name="profile_name"
                          value={editFormData.profile_name}
                          onChange={handleEditChange}
                          className="w-full rounded border p-2"
                        >
                          <option value="">Select Profile</option>
                          {profiles.map((prof) => (
                            <option key={prof.id} value={prof.profile_name}>
                              {prof.profile_name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        order.profile?.profile_name || "N/A"
                      )}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {editRowId === order.id ? (
                        <input
                          type="number"
                          name="special_order_amount"
                          value={editFormData.special_order_amount}
                          onChange={handleEditChange}
                          className="w-full rounded border p-2"
                        />
                      ) : (
                        order.special_order_amount
                      )}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {editRowId === order.id ? (
                        <input
                          type="date"
                          name="delivery_date"
                          value={
                            editFormData.delivery_date
                              ? new Date(editFormData.delivery_date)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={handleEditChange}
                          className="w-full rounded border p-2"
                        />
                      ) : (
                        <>
                          <span className="border-primary/10 block w-full border-b px-4 py-1">
                            {new Date(order.delivery_date).toLocaleDateString()}
                          </span>
                          <CountdownDisplay
                            targetDate={order.delivery_date?.split("T")[0]}
                          />
                        </>
                      )}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {editRowId === order.id ? (
                        <input
                          type="text"
                          name="client_name"
                          value={editFormData.client_name}
                          onChange={handleEditChange}
                          className="w-full rounded border p-2"
                        />
                      ) : (
                        order.client_name
                      )}
                    </td>
                    <td className="border-primary space-x-2 border px-4 py-2">
                      {editRowId === order.id ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            className="cursor-pointer rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="cursor-pointer rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(order)}
                            className="cursor-pointer rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="cursor-pointer rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpecialOrderPage;
