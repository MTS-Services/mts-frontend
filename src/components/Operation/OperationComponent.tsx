import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import {
  MdAccessTime,
  MdAttachMoney,
  MdCheckCircle,
  MdEdit,
} from "react-icons/md";
import { PiMicrosoftTeamsLogoLight } from "react-icons/pi";

interface MtsTarget {
  title: string;
  amount: string;
  icon: React.ReactNode;
}

interface ProjectRow {
  clientName: string;
  amount: string;
  timeline: string | null;
  assign: string;
  finishTime: string;
  opsStatus: string;
}

const mtsTargets: MtsTarget[] = [
  { title: "Today Delivery :", amount: "0", icon: <MdAttachMoney size={24} /> },
  { title: "Today Revision :", amount: "8", icon: <MdEdit size={24} /> },
  { title: "Submitted :", amount: "2", icon: <MdCheckCircle size={24} /> },
  { title: "Short Time :", amount: "7", icon: <MdAccessTime size={24} /> },
  {
    title: "Meeting :",
    amount: "5",
    icon: <PiMicrosoftTeamsLogoLight size={24} />,
  },
];

const teamMembers = ["John", "Sarah", "Alex", "Emma", "Kamrul"];

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<ProjectRow[]>([]);

  const fetchProjects = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.id) {
        console.warn("User ID not found in localStorage.");
        return;
      }

      const res = await fetch(
        `https://mtsbackend20-production.up.railway.app/api/project/showallStatusRevisionProjects/${user.id}`,
      );
      const data = await res.json();
      console.log("API Response:", data);

      interface ApiProject {
        clientName?: string;
        after_fiverr_amount?: string;
        delivery_date?: string;
        ops_status?: string;
      }

      const mapped = data.projects.map((p: ApiProject) => ({
        clientName: p.clientName || "",
        amount: p.after_fiverr_amount || "",
        timeline: p.delivery_date
          ? new Date(p.delivery_date).toLocaleDateString("en-US")
          : null,
        assign: "",
        finishTime: "",
        opsStatus: p.ops_status || "Pending",
      }));
      setProjects(mapped);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (
    index: number,
    field: keyof ProjectRow,
    value: string | null,
  ) => {
    const updated = [...projects];
    updated[index][field] = value || "";
    setProjects(updated);
  };

  const todayDate = new Date().toLocaleDateString("en-US");

  const todayDeliveryAmount = projects
    .filter((p) => p.timeline === todayDate && p.opsStatus === "delivered")
    .reduce((sum, p) => sum + parseFloat(p.amount || "0"), 0)
    .toFixed(2);

  const getStatusColor = (status: string) => {
    const base = "w-full rounded p-2";
    switch (status.toLowerCase()) {
      case "done":
      case "delivered":
        return `${base} bg-green-500 text-white`;
      case "pending":
        return `${base} bg-yellow-500 text-white`;
      case "wip":
        return `${base} bg-blue-500 text-white`;
      default:
        return `${base} bg-gray-400 text-white`;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="bg-background min-h-screen w-full px-4 py-8 sm:px-6 md:px-10 lg:px-14">
        {/* Stats Display */}
        <div className="mb-8 flex flex-wrap gap-4">
          {mtsTargets.map(({ title, amount, icon }, i) => (
            <div
              key={i}
              className="bg-primary flex h-28 w-full flex-col justify-between rounded-sm border-2 p-4 sm:w-[48%] md:w-[30%] lg:w-[20%] xl:w-[14%]"
            >
              <div className="flex items-center gap-2">
                {icon}
                <h2 className="text-sm md:text-xl">{title}</h2>
              </div>
              <h2 className="text-sm md:text-xl">
                {title === "Today Delivery :" && todayDeliveryAmount !== "0"
                  ? `$${todayDeliveryAmount}`
                  : amount}
              </h2>
            </div>
          ))}
        </div>

        {/* Project Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="bg-secondary text-accent border-border-color border text-[16px]">
                {[
                  "Client Name",
                  "Amount",
                  "Timeline",
                  "Assign",
                  "Expect Finish Time",
                  "Ops Status",
                ].map((head, i) => (
                  <th key={i} className="border-border-color border px-2 py-3">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr
                  key={i}
                  className="text-accent odd:bg-primary even:bg-primary/70 hover:bg-primary/80 text-sm transition-all"
                >
                  {/* Client Name */}
                  <td className="border-secondary border-r px-2 py-3">
                    <input
                      type="text"
                      value={p.clientName}
                      onChange={(e) =>
                        handleChange(i, "clientName", e.target.value)
                      }
                      placeholder="Client Name"
                      className="w-full rounded p-2 text-black"
                    />
                  </td>

                  {/* Amount */}
                  <td className="border-secondary border-r px-2 py-3">
                    <input
                      type="text"
                      value={p.amount}
                      onChange={(e) =>
                        handleChange(i, "amount", e.target.value)
                      }
                      placeholder="Amount"
                      className="w-full rounded p-2 text-black"
                    />
                  </td>

                  {/* Timeline */}
                  <td className="border-secondary border-r px-2 py-3">
                    <DatePicker
                      value={p.timeline ? new Date(p.timeline) : null}
                      onChange={(date) =>
                        handleChange(
                          i,
                          "timeline",
                          date?.toLocaleDateString("en-US") ?? null,
                        )
                      }
                      slotProps={{
                        textField: { size: "small", fullWidth: true },
                      }}
                    />
                  </td>

                  {/* Assign */}
                  <td className="border-secondary border-r px-2 py-3">
                    <select
                      value={p.assign}
                      onChange={(e) =>
                        handleChange(i, "assign", e.target.value)
                      }
                      className="bg-primary w-full rounded px-2 py-1 text-white"
                    >
                      <option value="">Select Team Member</option>
                      {teamMembers.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Finish Time */}
                  <td className="border-secondary border-r px-2 py-3">
                    <input
                      type="time"
                      value={p.finishTime}
                      onChange={(e) =>
                        handleChange(i, "finishTime", e.target.value)
                      }
                      className="w-full rounded p-2 text-black"
                    />
                  </td>

                  {/* Ops Status */}
                  <td className="border-border-color border-r px-2 py-3">
                    <select
                      value={p.opsStatus}
                      onChange={(e) =>
                        handleChange(i, "opsStatus", e.target.value)
                      }
                      className={getStatusColor(p.opsStatus)}
                    >
                      <option value="Select Status">Select Status</option>
                      <option value="delivered">Delivered</option>
                      <option value="pending">Pending</option>
                      <option value="wip">WIP</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Dashboard;
