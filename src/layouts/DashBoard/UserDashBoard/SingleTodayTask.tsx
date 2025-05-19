import { useTheme } from "@emotion/react";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const SingleTodayTask = ({ item }) => {
  const { theme } = useTheme();
  const token = Cookies.get("core");

  const [opstatus, setOpstatus] = useState(item?.ops_status ?? "nra");
  const [time, setTime] = useState(item?.expected_finish_time || "");
  const [originalTime, setOriginalTime] = useState(
    item?.expected_finish_time || "",
  );

  // Backend update function using axios.put
  const updateTask = async (updatedStatus, updatedTime) => {
    if (!item?.today_task_id) {
      alert("Task ID missing — cannot update");
      return;
    }

    console.log("Updating task ID:", item.today_task_id);

    const payload = {
      ops_status: updatedStatus,
      expected_finish_time: updatedTime,
    };

    try {
      const response = await axios.patch(
        `https://mtsbackend20-production.up.railway.app/api/today-task/update/${item.today_task_id}`,
        payload, // axios handles JSON.stringify automatically
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Update response:", response.data);
      setOriginalTime(updatedTime);
      alert("✅ Status updated successfully");
    } catch (error) {
      console.error("❌ Update failed:", error);
      alert("❌ Update failed — see console.");
    }
  };

  const handleOpStatusChange = (e) => {
    const newStatus = e.target.value;
    setOpstatus(newStatus);
    updateTask(newStatus, time || originalTime);
  };

  const handleTimeChange = (e) => setTime(e.target.value);
  const handleTimeBlur = () => {
    if (time && time !== originalTime) {
      updateTask(opstatus, time);
    }
  };

  const statusObj = {
    revision: "bg-red-500",
    clientupdate: "bg-red-500",
    complete: "bg-green-700",
    wip: "bg-yellow-500",
    delivered: "bg-pink-600",
    submitted: "bg-blue-600",
    nra: "bg-black",
  };

  const clientName = item?.client_name || "N/A";
  const projectId = item?.project_id || "N/A";
  const lastUpdate = item?.last_update
    ? new Date(item.last_update).toLocaleString()
    : "N/A";

  const deliveryLastDate = item?.deli_last_date
    ? new Date(item.deli_last_date).toLocaleDateString()
    : "N/A";

  if (!item || !item.today_task_id) return null;

  return (
    <tr
      className={`${
        theme === "light-mode" ? "even:bg-primary/92" : "even:bg-primary/20"
      } odd:bg-primary`}
    >
      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <p className="p-2">{clientName}</p>
        <p className="p-2">#{projectId}</p>
      </td>

      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <p className="p-2">{lastUpdate}</p>
      </td>

      {/* Keep your original assign field value */}
      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <p className="p-2">{item.first_name}</p>
      </td>

      {/* Editable Time */}
      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <div className="p-2">
          <input
            type="time"
            value={time}
            onChange={handleTimeChange}
            onBlur={handleTimeBlur}
            className="w-full border-none bg-transparent p-1 text-white outline-none"
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
            }}
          />
        </div>
      </td>

      {/* Editable Status */}
      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <select
          className={`${statusObj[opstatus]} w-full p-6 text-white focus:outline-none`}
          onChange={handleOpStatusChange}
          value={opstatus}
        >
          {Object.keys(statusObj).map((status) => (
            <option key={status} value={status}>
              {status.toUpperCase()}
            </option>
          ))}
        </select>
      </td>

      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <p className="p-2">{deliveryLastDate}</p>
      </td>
    </tr>
  );
};

export default SingleTodayTask;
