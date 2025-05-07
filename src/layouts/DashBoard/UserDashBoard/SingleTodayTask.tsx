import { useTheme } from "@emotion/react";
import { useState } from "react";

const SingleTodayTask = ({ item, index, onTimeChange }) => {
  const { theme } = useTheme();

  // Get current op status from assign[0] if exists
  const initialStatus = item.assign?.[0]?.ops_status || "revision";
  const [opstatus, setOpStatus] = useState(initialStatus);

  const handleOpStatusChange = (e) => {
    setOpStatus(e.target.value);
  };

  const handleTimeChange = (e) => {
    onTimeChange && onTimeChange(index, e.target.value);
  };

  const statusObj = {
    revision: "bg-red-500",
    realrevision: "bg-red-500",
    complete: "bg-green-700",
    wip: "bg-yellow-500",
    delivered: "bg-pink-600",
    submitted: "bg-blue-600",
    nra: "bg-black",
  };

  // Extract display fields from API structure
  const clientName = item.client_name || "N/A";
  const projectId = item.project_id || "N/A";
  const lastUpdate = item.last_update
    ? new Date(item.last_update).toLocaleString()
    : "N/A";
  const assignTo = item.assign?.[0]?.first_name
    ? `${item.assign[0].first_name} ${item.assign[0].last_name}`
    : "Unassigned";
  const expectFinishTime = item.expected_finish_time || "";
  const deliveryLastDate = item.deli_last_date
    ? new Date(item.deli_last_date).toLocaleDateString()
    : "N/A";

  return (
    <tr
      className={`$ { theme === "light-mode" ? "even:bg-primary/92" : "even:bg-primary/20" } odd:bg-primary`}
    >
      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <p className="p-2">{clientName}</p>
        <p className="p-2">#{projectId}</p>
      </td>
      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <p className="p-2">{lastUpdate}</p>
      </td>
      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <p className="p-2">{assignTo}</p>
      </td>
      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <input
          type="time"
          value={expectFinishTime}
          onChange={handleTimeChange}
          className="w-full p-2"
        />
      </td>
      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <select
          className={`${statusObj[opstatus]} w-full p-6 focus:outline-none`}
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
