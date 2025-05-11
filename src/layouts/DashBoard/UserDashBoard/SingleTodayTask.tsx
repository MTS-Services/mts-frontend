import { useTheme } from "@emotion/react";
import { useState } from "react";

const SingleTodayTask = ({ item, index, onTimeChange }) => {
  const { theme } = useTheme();

  const initialStatus = item.assign?.[0]?.ops_status || "revision";
  const [opstatus, setOpStatus] = useState(initialStatus);
  const [time, setTime] = useState(
    item.expected_finish_time?.split(" ")[0] || "",
  );
  const [period, setPeriod] = useState(
    item.expected_finish_time?.split(" ")[1] || "AM",
  );

  const handleOpStatusChange = (e) => {
    setOpStatus(e.target.value);
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setTime(value);
    onTimeChange && onTimeChange(index, `${value} ${period}`);
  };

  const handlePeriodChange = (e) => {
    const value = e.target.value;
    setPeriod(value);
    onTimeChange && onTimeChange(index, `${time} ${value}`);
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

          <td className="border text-left text-sm font-semibold whitespace-nowrap">
            <div className="p-2">
              <input
                type="time"
                value={time}
                onChange={handleTimeChange}
                className="w-full border-none bg-transparent p-1 text-white outline-none"
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                }}
              />
            </div>
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
      )}
    </>
  );
};

export default SingleTodayTask;
