import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthProvider";
import PrimaryButton from "../../components/Button/PrimaryButton";

// ডেট ফরম্যাট করার জন্য একটি সহায়ক ফাংশন
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString;
  }
};

function AddOtherCost() {
  const { isLoading: authLoading } = useContext(AuthContext);
  const token = Cookies.get("core");

  // নতুন এন্ট্রি যোগ করার জন্য ফর্ম ডেটা
  const [formData, setFormData] = useState({
    cost_amount: "",
    details: "",
  });

  // টেবিলের জন্য কস্ট লিস্ট এবং ইনলাইন এডিটের জন্য স্টেট
  const [costList, setCostList] = useState([]);
  const [editRowId, setEditRowId] = useState(null); // টেবিলের যে রো এডিট হচ্ছে তার ID
  const [editFormData, setEditFormData] = useState({ // ইনলাইন এডিটের জন্য ডেটা
    cost_amount: "",
    details: "",
  });

  const [loading, setLoading] = useState(false); // লোডিং স্টেট যোগ করা হয়েছে

  // কস্ট লিস্ট ফেচ করার ফাংশন
  const fetchCosts = async () => {
    setLoading(true); // ডেটা ফেচ শুরু
    try {
      const res = await axios.get(
        "https://mtsbackend20-production.up.railway.app/api/profile/other-cost",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCostList(res.data?.data || []);
    } catch (err) {
      console.error("❌ Fetch failed", err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        toast.warning("⚠️ Session expired or unauthorized. Please log in again.");
      } else {
        toast.error("Failed to load cost entries.");
      }
    } finally {
      setLoading(false); // ডেটা ফেচ শেষ
    }
  };

  // কম্পোনেন্ট মাউন্ট হলে ডেটা ফেচ করার জন্য useEffect
  useEffect(() => {
    if (token) { // টোকেন থাকলে তবেই ডেটা ফেচ করুন
      fetchCosts();
    }
  }, [token]); // টোকেন পরিবর্তন হলে useEffect আবার চলবে

  // নতুন এন্ট্রি যোগের জন্য সাবমিট (উপরের ফর্ম)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // সাবমিট শুরু

    if (authLoading || !token) {
      toast.warning("🔐 Please login to submit data.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        cost_amount: parseFloat(formData.cost_amount), // সংখ্যায় রূপান্তর
        details: formData.details,
        created_date: new Date().toISOString(), // তৈরি হওয়ার ডেট যোগ
        update_at: new Date().toISOString(), // আপডেটেড ডেট যোগ
      };

      await axios.post(
        "https://mtsbackend20-production.up.railway.app/api/profile/other-cost/create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("✅ Cost added successfully");
      setFormData({ cost_amount: "", details: "" }); // ফর্ম রিসেট
      fetchCosts(); // তালিকা রিফ্রেশ করুন
    } catch (err) {
      console.error("❌ Submit failed", err);
      const errorMessage = err.response?.data?.message || "Something went wrong!";
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        toast.warning("⚠️ Session expired or unauthorized. Please log in again.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false); // সাবমিট শেষ
    }
  };

  // টেবিলের রো এডিট শুরু
  const handleEditClick = (item) => {
    setEditRowId(item.id);
    setEditFormData({
      cost_amount: String(item.cost_amount), // ইনপুটের জন্য স্ট্রিং হিসেবে
      details: item.details,
    });
  };

  // ইনপুট চেঞ্জ হ্যান্ডলার ইনলাইন এডিটের জন্য
  const handleEditChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ইনলাইন এডিট বাতিল
  const handleCancelClick = () => {
    setEditRowId(null);
    setEditFormData({ cost_amount: "", details: "" });
  };

  // ইনলাইন এডিট Save (PUT)
  const handleSaveClick = async () => {
    setLoading(true); // সেভ শুরু

    if (authLoading || !token) {
      toast.warning("🔐 Please login first.");
      setLoading(false);
      return;
    }

    try {
      await axios.put(
        `https://mtsbackend20-production.up.railway.app/api/profile/other-cost/${editRowId}`,
        {
          cost_amount: parseFloat(editFormData.cost_amount), // সংখ্যায় রূপান্তর
          details: editFormData.details,
          update_at: new Date().toISOString(), // আপডেটের সময়
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("✅ Cost updated successfully");
      setEditRowId(null); // এডিট মোড থেকে বের হওয়া
      setEditFormData({ cost_amount: "", details: "" }); // ইনলাইন এডিট ফর্ম রিসেট
      fetchCosts(); // তালিকা রিফ্রেশ করুন
    } catch (err) {
      console.error("❌ Update failed", err);
      const errorMessage = err.response?.data?.message || "Failed to update cost.";
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        toast.warning("⚠️ Session expired or unauthorized. Please log in again.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false); // সেভ শেষ
    }
  };

  // ডিলিট ফাংশন
  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this cost?")) return;

    setLoading(true); // ডিলিট শুরু

    if (authLoading || !token) {
      toast.warning("🔐 Please login to delete data.");
      setLoading(false);
      return;
    }

    try {
      await axios.delete(
        `https://mtsbackend20-production.up.railway.app/api/profile/other-cost/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("🗑️ Cost deleted successfully");
      fetchCosts(); // তালিকা রিফ্রেশ করুন
    } catch (err) {
      console.error("❌ Delete failed", err);
      const errorMessage = err.response?.data?.message || "Failed to delete cost.";
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        toast.warning("⚠️ Session expired or unauthorized. Please log in again.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false); // ডিলিট শেষ
    }
  };

  // অথেনটিকেশন লোডিং অবস্থা বা টোকেন না থাকলে UI
  if (authLoading) {
    return (
      <div className="mx-auto max-w-xl rounded-lg bg-[#1e1e1e] p-6 text-white shadow-lg text-center">
        Authenticating...
      </div>
    );
  }

  if (!token) {
    return (
      <div className="mx-auto max-w-xl rounded-lg bg-background p-6 text-white shadow-lg text-center">
        <p className="text-red-400 mb-4 font-secondary ">Please log in to manage other costs.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-background"> {/* মূল div এ ব্যাকগ্রাউন্ড যোগ করা হয়েছে */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
        pauseOnFocusLoss draggable pauseOnHover />

      {/* Add New Cost Form Section */}
      <div className="mx-auto max-w-3xl p-6 bg-background border border-primary rounded-lg text-accent shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 ">Add New Cost</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block mb-1 text-accent">Amount</label>
            <input
              type="number"
              className="w-full rounded border  border-accent/30 bg-background p-2 text-accent"
              placeholder="Enter amount"
              value={formData.cost_amount}
              onChange={(e) => setFormData({ ...formData, cost_amount: e.target.value })}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-1 text-accent">Details</label>
            <textarea
              rows={3}
              className="w-full rounded border border-gray-600 bg-background p-2 text-accent"
              placeholder="Enter details"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              required
              disabled={loading}
            />
          </div>
          <PrimaryButton
            type="submit"
            className=""
            disabled={loading || authLoading || !token}
          >
            Add Cost
          </PrimaryButton>
        </form>
      </div>

      {/* Cost Entries Table Section */}
      <div className="mx-auto max-w-[1200px] p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-accent">📋 Cost Entries</h2>
        <div className="overflow-x-auto"> {/* This div ensures horizontal scrolling only when content overflows */}
          <table className="min-w-full table-auto  text-accent">
            <thead>
              <tr>
                <th className="border border-primary px-4 py-2 text-left font-primary">Amount</th>
                <th className="border border-primary px-4 py-2 text-left font-primary p-2 ">Details</th>
                <th className="border border-primary px-4 py-2 text-left font-primary">Created Date</th>
                <th className="border border-primary px-4 py-2 text-left font-primary">Updated At</th>
                <th className="border border-primary px-4 py-2 text-left font-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {costList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-accent/30 font-primary  hover:bg-secondary"> {/* colSpan 5 করা হয়েছে */}
                    No cost entries found.
                  </td>
                </tr>
              ) : (
                costList.map((item) => (
                  <tr
                    key={item.id}
                    className="odd:bg-secondary even:bg-background text-accent"
                  >
                    <td className="border border-primary px-4 py-2 font-primary">
                      {editRowId === item.id ? (
                        <input
                          type="number"
                          value={editFormData.cost_amount}
                          onChange={(e) => handleEditChange("cost_amount", e.target.value)}
                          className="w-full rounded border border-gray-600 bg-[#1a1a1a] p-2 text-white"
                          disabled={loading}
                        />
                      ) : (
                        `💵 ${item.cost_amount}`
                      )}
                    </td>

                    {/* Details কলাম: টেক্সট সংক্ষিপ্ত করে দেখাবে এবং হোভার করলে সম্পূর্ণ দেখাবে */}
                    <td className="border border-primary px-4 py-2 font-primary relative group max-w-[200px]">
                      {editRowId === item.id ? (
                        <textarea
                          rows={2}
                          value={editFormData.details}
                          onChange={(e) => handleEditChange("details", e.target.value)}
                          className="w-full rounded border border-gray-600 bg-[#1a1a1a] p-2 text-accent"
                          disabled={loading}
                        />
                      ) : (
                        <>
                          <div className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
                            📝 {item.details}
                          </div>

                          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1  max-w-xs rounded-lg bg-gray-800 text-sm p-3 text-white opacity-0 group-hover:opacity-100
                  transition-all duration-300 z-50 whitespace-normal shadow-xl pointer-events-none
                  before:absolute before:-top-1 before:left-1/2 before:-translate-x-1/2 before:w-3 before:h-3 before:bg-gray-800 w-full overflow-auto py-4  before:rotate-45">
                            {item.details}
                          </div>
                        </>
                      )}
                    </td>

                    {/* Created Date কলাম যোগ করা হয়েছে */}
                    <td className="border border-primary px-4 py-2 font-primary">
                      {formatDate(item.created_date)}
                    </td>
                    {/* Updated At কলাম যোগ করা হয়েছে */}
                    <td className="border border-primary px-4 py-2 font-primary">
                      {formatDate(item.update_at)}
                    </td>

                    <td className="border border-primary px-4 py-2  items-center justify-center flex gap-6">
                      {editRowId === item.id ? (
                        <>
                          <button
                            onClick={handleSaveClick}
                            className="bg-primary hover:bg-primary/70  rounded px-3 py-1 text-sm text-white transition-all font-primary"
                            disabled={loading}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelClick}
                            className="bg-primary hover:bg-primary/70 rounded px-3 py-1 text-sm text-white transition-all font-primary"
                            disabled={loading}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(item)}
                            className="bg-primary hover:bg-primary/70  rounded px-3 py-1 text-sm text-white transition-all font-primary"
                            disabled={loading}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item.id)}
                            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddOtherCost;