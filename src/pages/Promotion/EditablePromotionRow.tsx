import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-toastify";

function EditablePromotionRow({ item, refetch }) {
  const [isEditing, setIsEditing] = useState(false);

  const [localData, setLocalData] = useState({
    impressions: item.impressions,
    clicks: item.clicks,
    promotion_amount: item.promotion_amount, // match backend field
  });

  const originalData = {
    impressions: item.impressions,
    clicks: item.clicks,
    promotion_amount: item.promotion_amount,
  };

  const handleChange = (field, value) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSave = async () => {
    const token = Cookies.get("core");
    const now = new Date().toISOString();

    try {
      await axios.put(
        `https://mtsbackend20-production.up.railway.app/api/profile/promotion/${item.id}`,
        {
          profileName: item.profile.profile_name,
          impressions: Number(localData.impressions),
          clicks: Number(localData.clicks),
          promotion_amount: Number(localData.promotion_amount),
          update_at: now,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Promotion updated successfully.");
      setIsEditing(false);
      if (refetch) refetch();
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update promotion info.");
    }
  };

  const handleCancel = () => {
    setLocalData(originalData);
    setIsEditing(false);
  };

  return (
    <tr className="odd:bg-secondary even:bg-background text-accent">
      <td className="border-primary border px-4 py-2 font-primary">
        {formatDate(item.created_date)}
      </td>
      <td className="border-primary font-primary border px-4 py-2">
        {formatDate(item.update_at)}
      </td>
      <td className="border-primary font-primary border px-4 py-2">
        {item.profile?.profile_name}
      </td>

      <td className="border-primary font-primary border px-4 py-2">
        {isEditing ? (
          <input
            type="number"
            value={localData.impressions}
            onChange={(e) => handleChange("impressions", e.target.value)}
            className="w-20 rounded font-primary border border-gray-300 px-2 py-1"
          />
        ) : (
          item.impressions
        )}
      </td>

      <td className="border-primary border px-4 py-2">
        {isEditing ? (
          <input
            type="number"
            value={localData.clicks}
            onChange={(e) => handleChange("clicks", e.target.value)}
            className="w-20 rounded border  font-primary border-gray-300 px-2 py-1"
          />
        ) : (
          item.clicks
        )}
      </td>

      <td className="border-primary border px-4 py-2">
        {isEditing ? (
          <input
            type="number"
            step="0.01"
            value={localData.promotion_amount}
            onChange={(e) => handleChange("promotion_amount", e.target.value)}
            className="w-24 rounded border border-gray-300 px-2 py-1 font-primary"
          />
        ) : (
          item.promotion_amount
        )}
      </td>

      <td className="border-primary border px-4 py-2">
        {item.actual_increase}
      </td>

      <td className="border-primary space-x-2 border px-4 py-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-primary hover:bg-primary/70 rounded px-3 py-1 text-sm text-white transition-all font-primary"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="rounded bg-primary px-3 py-1 text-sm text-white hover:bg-primary/70 font-primary"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-primary hover:bg-primary/70 rounded px-3 py-1 text-sm text-white transition-all font-primary"
          >
            Edit
          </button>
        )}
      </td>
    </tr>
  );
}

export default EditablePromotionRow;
