import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../../context/SocketContext";
import { useFetchData } from "../../hooks/useFetchData";
import { useProfileNames } from "../../hooks/useSocketDataUtils";
import EditablePromotionRow from "./EditablePromotionRow";

function Promotion() {
  const socket = useSocket();
  const profiles = useProfileNames(socket);

  const { data, refetch, loading, error } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/profile/promotion/",
  );

  const today = new Date().toISOString().split("T")[0];
  const submittedProfileNamesToday = (data?.data || [])
    .filter((entry) => entry.created_date?.startsWith(today))
    .map((entry) => entry.profile.profile_name);

  const [formData, setFormData] = useState({
    profileName: "",
    impressions: "",
    clicks: "",
    promotionAmount: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profileName) {
      toast.error("Please select a profile");
      return;
    }
    if (!formData.impressions || isNaN(formData.impressions)) {
      toast.error("Please enter a valid impression number");
      return;
    }
    if (!formData.clicks || isNaN(formData.clicks)) {
      toast.error("Please enter a valid click number");
      return;
    }
    if (!formData.promotionAmount || isNaN(formData.promotionAmount)) {
      toast.error("Please enter a valid promo amount");
      return;
    }

    const payload = {
      profileName: formData.profileName,
      impressions: Number(formData.impressions),
      clicks: Number(formData.clicks),
      promotionAmount: Number(formData.promotionAmount),
    };

    try {
      const token = Cookies.get("core");
      await axios.post(
        "https://mtsbackend20-production.up.railway.app/api/profile/promotion/create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Promotion info submitted successfully");

      setFormData({
        profileName: "",
        impressions: "",
        clicks: "",
        promotionAmount: "",
      });

      if (refetch) refetch();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit promotion info");
    }
  };

  console.log("Profiles from useProfileNames:", profiles);
  console.log("Socket connected?", socket?.connected);

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-start p-6">
      <div className="bg-background border-primary w-full max-w-3xl rounded-lg border p-8 shadow-lg">
        <h2 className="text-accent font-primary mb-6 text-center text-3xl font-bold">
          Promotion Setup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Name */}
          <div>
            <label className="text-accent font-primary mb-2 block">
              Profile Name
            </label>
            <select
              name="profileName"
              value={formData.profileName}
              onChange={(e) => handleChange("profileName", e.target.value)}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              required
            >
              <option value="">Select Profile</option>
              {(profiles || [])
                .filter(
                  (prof) =>
                    !submittedProfileNamesToday.includes(prof.profile_name),
                )
                .map((prof) => (
                  <option key={prof.id} value={prof.profile_name}>
                    {prof.profile_name}
                  </option>
                ))}
            </select>
          </div>

          {/* Impressions */}
          <div>
            <label className="text-accent mb-1 block">Impression Number</label>
            <input
              type="number"
              value={formData.impressions}
              onChange={(e) => handleChange("impressions", e.target.value)}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              placeholder="Enter impression number"
              required
              min={0}
            />
          </div>

          {/* Clicks */}
          <div>
            <label className="text-accent mb-1 block">Click Number</label>
            <input
              type="number"
              value={formData.clicks}
              onChange={(e) => handleChange("clicks", e.target.value)}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              placeholder="Enter click number"
              required
              min={0}
            />
          </div>

          {/* Promo Amount */}
          <div>
            <label className="text-accent mb-1 block">Promo Amount</label>
            <input
              type="number"
              value={formData.promotionAmount}
              onChange={(e) => handleChange("promotionAmount", e.target.value)}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              placeholder="Enter promo amount"
              required
              min={0}
              step="0.01"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-blue-600 py-3 font-semibold text-white transition duration-200 hover:scale-95 hover:bg-blue-700"
          >
            Submit Promotion Info
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="mt-10 w-full max-w-7xl">
        <h3 className="text-accent font-primary mb-4 text-center text-xl font-semibold">
          Existing Promotion Records
        </h3>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : data?.data?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="border-primary text-accent w-full table-auto border text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="border-primary border px-4 py-2 text-left">
                    Created Date
                  </th>
                  <th className="border-primary border px-4 py-2 text-left">
                    Update Date
                  </th>
                  <th className="border-primary border px-4 py-2 text-left">
                    Profile Name
                  </th>
                  <th className="border-primary border px-4 py-2 text-left">
                    Impressions
                  </th>
                  <th className="border-primary border px-4 py-2 text-left">
                    Clicks
                  </th>
                  <th className="border-primary border px-4 py-2 text-left">
                    Promo Amount
                  </th>
                  <th className="border-primary border px-4 py-2 text-left">
                    Actual Amount
                  </th>
                  <th className="border-primary border px-4 py-2 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item, index) => (
                  <EditablePromotionRow
                    refetch={refetch}
                    key={index}
                    item={item}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No promotion data found.</p>
        )}
      </div>
    </div>
  );
}

export default Promotion;
