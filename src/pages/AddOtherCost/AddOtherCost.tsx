import axios from "axios";
import { useEffect, useState } from "react";

function AddOtherCost() {
  const [formData, setFormData] = useState({
    amount: "",
    details: "",
  });
  const [costList, setCostList] = useState([]);
  const [editId, setEditId] = useState(null);

  // ✅ Fetch all entries
  const fetchCosts = async () => {
    try {
      const res = await axios.get("/api/other-cost");
      setCostList(res.data);
    } catch (err) {
      console.error("❌ Fetch failed", err);
    }
  };

  // ✅ Submit form (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/api/other-cost/${editId}`, formData);
      } else {
        await axios.post("/api/other-cost", formData);
      }
      setFormData({ amount: "", details: "" });
      setEditId(null);
      fetchCosts();
    } catch (err) {
      console.error("❌ Submit failed", err);
    }
  };

  // ✅ Edit handler
  const handleEdit = (item) => {
    setFormData({ amount: item.amount, details: item.details });
    setEditId(item._id);
  };

  useEffect(() => {
    fetchCosts();
  }, []);

  return (
    <div className="mx-auto max-w-xl rounded-lg bg-[#1e1e1e] p-6 text-white shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">
        {editId ? "✏️ Edit Other Cost" : "➕ Add Other Cost"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-gray-300">Amount</label>
          <input
            type="text"
            className="w-full rounded border border-gray-600 bg-[#1a1a1a] p-2 text-white focus:outline-none"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-300">Details</label>
          <textarea
            rows="4"
            className="w-full rounded border border-gray-600 bg-[#1a1a1a] p-2 text-white focus:outline-none"
            placeholder="Enter details"
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, details: e.target.value })
            }
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="rounded bg-[#34D399] px-4 py-2 text-white transition hover:bg-[#059669]"
        >
          {editId ? "Update" : "Add"} Cost
        </button>
      </form>

      {/* 🔽 Entry List */}
      <div className="mt-8">
        <h3 className="mb-3 text-lg font-semibold">📋 Cost Entries</h3>
        <ul className="space-y-3">
          {costList.map((item) => (
            <li
              key={item._id}
              className="flex items-start justify-between rounded bg-[#2a2a2a] p-3"
            >
              <div>
                <p className="text-sm text-white">💵 {item.amount}</p>
                <p className="text-xs text-gray-400">📝 {item.details}</p>
              </div>
              <button
                onClick={() => handleEdit(item)}
                className="text-sm text-blue-400 hover:underline"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddOtherCost;
