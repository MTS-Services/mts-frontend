import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../../context/SocketContext";
import { useFetchData } from "../../hooks/useFetchData";
import { useProfileNames } from "../../hooks/useSocketDataUtils";

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
    profile_id: "",
    special_order_amount: "",
    delivery_date: "",
    client_name: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = Cookies.get("core");
      await axios.post(
        "https://mtsbackend20-production.up.railway.app/api/profile/projectSpecialOrder/create",
        formData,
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
        profile_id: "",
        special_order_amount: "",
        delivery_date: "",
        client_name: "",
      });
    } catch (error) {
      toast.error("Failed to add special order");
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = Cookies.get("core");
      await axios.delete(
        `https://mtsbackend20-production.up.railway.app/api/profile/projectSpecialOrder/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Order deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete order");
      console.error(error);
    }
  };

  const handleEdit = (order: any) => {
    setFormData({
      profile_id: order.profile?.id || "",
      special_order_amount: order.special_order_amount || "",
      delivery_date: order.delivery_date || "",
      client_name: order.client_name || "",
    });
  };

  return (
    <div className="bg-background font-primary flex min-h-screen flex-col items-center justify-center space-y-10 p-4 md:p-6">
      <ToastContainer />
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
              name="profile_id"
              value={formData.profile_id}
              onChange={handleChange}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              required
            >
              <option value="">Select Profile</option>
              {profiles.map((prof) => (
                <option key={prof.id} value={prof.id}>
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
            className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700"
          >
            Submit Order
          </button>
        </form>
      </div>

      <div className="bg-secondary border-primary w-full max-w-7xl rounded-lg border p-4 shadow-md md:p-6">
        <h3 className="text-primary font-primary mb-4 text-center text-xl font-bold md:text-2xl">
          Order List
        </h3>
        {loading ? (
          <p className="text-primary text-center">Loading...</p>
        ) : !Array.isArray(datas) || datas.length === 0 ? (
          <p className="text-primary text-center">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="border-primary w-full table-auto border text-sm md:text-base">
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
                      {order.profile?.profile_name ?? "N/A"}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {order.special_order_amount}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {order.delivery_date}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {order.client_name}
                    </td>
                    <td className="border-primary space-x-2 border px-4 py-2">
                      <button
                        onClick={() => handleEdit(order)}
                        className="rounded bg-blue-500 px-3 py-1 text-white transition duration-150 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="rounded bg-red-500 px-3 py-1 text-white transition duration-150 hover:bg-red-600"
                      >
                        Delete
                      </button>
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
