import { useTheme } from "@emotion/react";
import { useState } from "react";

const SingleTodayTask = ({ item }) => {
  const { theme } = useTheme();

  const initialStatus =
    item.ops_status || item.assign?.[0]?.ops_status || "revision";
  const initialTime = item.expected_finish_time || "";

  const [opstatus, setOpStatus] = useState(initialStatus);
  const [time, setTime] = useState(initialTime);
  const [originalTime, setOriginalTime] = useState(initialTime);

  // ✅ Backend update function
  const updateTask = async (updatedStatus, updatedTime) => {
    if (!item.id) return;

    const payload = {
      id: item.today_task_id,
      ops_status: updatedStatus,
      expected_finish_time: updatedTime,
    };

    console.log("📤 Sending to API:", payload);

    try {
      const res = await fetch(
        "https://mtsbackend20-production.up.railway.app/api/today-task/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      console.log("✅ API response:", data);
      setOriginalTime(updatedTime); // lock new value
    } catch (err) {
      console.error("❌ Update failed:", err);
    }
  };

  // ✅ Handle status change
  const handleOpStatusChange = (e) => {
    const newStatus = e.target.value;
    setOpStatus(newStatus);
    updateTask(newStatus, time || originalTime);
  };

  // ✅ Handle time change + blur
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

  const clientName = item.client_name || "N/A";
  const projectId = item.project_id || "N/A";
  const lastUpdate = item.last_update
    ? new Date(item.last_update).toLocaleString()
    : "N/A";
  const assignTo = Array.isArray(item.assign)
    ? item.assign.map((person) => person.first_name).join(" , ")
    : "N/A";
  const deliveryLastDate = item.deli_last_date
    ? new Date(item.deli_last_date).toLocaleDateString()
    : "N/A";

  return (
    <>
      {item.id && (
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

          <td className="border text-left text-sm font-semibold whitespace-nowrap">
            <p className="p-2">{item.first_name}</p>
          </td>

          {/* ✅ Editable & Fixed Expect Finish Time */}
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

          {/* ✅ Editable Status */}
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
      )}
    </>
  );
};

export default SingleTodayTask;
