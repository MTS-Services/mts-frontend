import { useEffect, useState } from "react";

function SpecialOrderPage() {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    profile: "",
    amount: "",
    deliveryDate: "",
    clientname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrders((prev) => [...prev, formData]);
    setFormData({ profile: "", amount: "", deliveryDate: "", clientname: "" });
  };

  const handleDelete = (index) => {
    const updated = [...orders];
    updated.splice(index, 1);
    setOrders(updated);
  };

  const handleEdit = (index) => {
    const selected = orders[index];
    setFormData(selected);
    handleDelete(index);
  };

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(() => {});
  }, []);

  return (
    <div className="bg-background font-primary flex min-h-screen flex-col items-center justify-center space-y-10 p-4 md:p-6">
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
              name="profile"
              value={formData.profile}
              onChange={handleChange}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              required
            >
              <option value="">Select Profile</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>

          <div>
            <label className="text-accent font-primary mb-2 block">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
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
              name="deliveryDate"
              value={formData.deliveryDate}
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
              name="clientname"
              value={formData.clientname}
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

      {/* Full-width Order List */}
      <div className="bg-secondary border-primary w-full max-w-7xl rounded-lg border p-4 shadow-md md:p-6">
        <h3 className="text-primary font-primary mb-4 text-center text-xl font-bold md:text-2xl">
          Order List
        </h3>
        {orders.length === 0 ? (
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
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="odd:bg-secondary even:bg-background text-accent"
                  >
                    <td className="border-primary border px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {order.profile}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {order.amount}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {order.deliveryDate}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {order.clientname}
                    </td>
                    <td className="border-primary space-x-2 border px-4 py-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="rounded bg-blue-500 px-3 py-1 text-white transition duration-150 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
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
