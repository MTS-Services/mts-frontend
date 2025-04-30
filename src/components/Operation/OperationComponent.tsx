import React, { useState } from "react";
import {
  MdAttachMoney,
  MdCheckCircle,
  MdEdit,
  MdAccessTime,
} from "react-icons/md";
import { PiMicrosoftTeamsLogoLight } from "react-icons/pi";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Import Adapter for date-fns

// StatsDisplay Part
interface MtsTarget {
  title: string;
  amount: string;
  icon: React.ReactNode;
}

const mtsTargets: MtsTarget[] = [
  {
    title: "Today Delivery :",
    amount: "0",
    icon: <MdAttachMoney size={24} />,
  },
  { title: "Today Revision :", amount: "8", icon: <MdEdit size={24} /> },
  {
    title: "Submitted :",
    amount: "2",
    icon: <MdCheckCircle size={24} />,
  },
  { title: "Short Time :", amount: "7", icon: <MdAccessTime size={24} /> },
  {
    title: "Meeting :",
    amount: "5",
    icon: <PiMicrosoftTeamsLogoLight size={24} />,
  },
];

// ProjectTable Part
interface ProjectRow {
  clientName: string;
  dollarAmount: string;
  timeline: string | null;
  assign: string;
  finishTime: string;
  status: string;
}

const teamMembers = ["John", "Sarah", "Alex", "Emma", "Kamrul"];

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<ProjectRow[]>([
    {
      clientName: "",
      dollarAmount: "",
      timeline: null,
      assign: "",
      finishTime: "",
      status: "Select Status",
    },
    {
      clientName: "",
      dollarAmount: "",
      timeline: null,
      assign: "",
      finishTime: "",
      status: "Select Status",
    },
    {
      clientName: "",
      dollarAmount: "",
      timeline: null,
      assign: "",
      finishTime: "",
      status: "Select Status",
    },
    {
      clientName: "",
      dollarAmount: "",
      timeline: null,
      assign: "",
      finishTime: "",
      status: "Select Status",
    },
    {
      clientName: "",
      dollarAmount: "",
      timeline: null,
      assign: "",
      finishTime: "",
      status: "Select Status",
    },
  ]);

  // Handle change in fields
  const handleChange = (
    index: number,
    field: keyof ProjectRow,
    value: string | null,
  ) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value || "";

    // Extract Dollar from Client Name
    if (field === "clientName" && value) {
      const match = value.match(/(\d+)\$|\$(\d+)/);
      if (match) {
        updatedProjects[index]["dollarAmount"] = match[1] || match[2];
      } else {
        updatedProjects[index]["dollarAmount"] = "";
      }
    }

    setProjects(updatedProjects);
  };

  // Get today's date
  const todayDate = new Date().toLocaleDateString("en-US");

  // Sum of dollar amounts for today's "Done" status
  const todayDeliveryAmount = projects
    .filter(
      (project) => project.timeline === todayDate && project.status === "Done",
    )
    .reduce((sum, project) => sum + parseFloat(project.dollarAmount || "0"), 0)
    .toFixed(2);

  // Function to determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-500 text-white";
      case "Pending":
        return "bg-yellow-500 text-white";
      case "WIP":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="bg-background min-h-screen w-full px-6 py-10 sm:px-4 md:px-10 lg:px-14">
        {/* Stats Section */}
        <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
          {mtsTargets.map(({ title, amount, icon }, idx) => (
            <div
              key={idx}
              className="bg-primary relative w-full rounded-sm border-2 p-4 md:w-[30%] lg:h-28 lg:w-[20%] xl:w-[14%]"
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

        {/* Project Table Section */}
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="bg-secondary text-accent border-border-color border text-[16px]">
                <th className="border-border-color border px-2 py-3">
                  Client Name
                </th>
                <th className="border-border-color border px-2 py-3">Dollar</th>
                <th className="border-border-color border px-2 py-3">
                  Timeline
                </th>
                <th className="border-border-color border px-2 py-3">Assign</th>
                <th className="border-border-color border px-2 py-3">
                  Expect Finish Time
                </th>
                <th className="border-border-color border px-2 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="border-2 border-white">
              {projects.map((project, index) => (
                <tr
                  key={index}
                  className="odd:bg-primary even:bg-primary/70 hover:bg-primary/80 text-accent text-sm transition-all"
                >
                  <td className="border-secondary border-r px-2 py-3">
                    <input
                      type="text"
                      value={project.clientName}
                      onChange={(e) =>
                        handleChange(index, "clientName", e.target.value)
                      }
                      placeholder="Client Name"
                      className="w-full rounded p-2 text-black" // Removed border styling
                    />
                  </td>
                  <td className="border-secondary border-r px-2 py-3">
                    <input
                      type="text"
                      value={project.dollarAmount}
                      onChange={(e) =>
                        handleChange(index, "dollarAmount", e.target.value)
                      }
                      placeholder="Dollar Amount"
                      className="w-full rounded p-2 text-black" // Removed border styling
                    />
                  </td>
                  <td className="border-secondary border-r px-2 py-3">
                    <DatePicker
                      selected={
                        project.timeline ? new Date(project.timeline) : null
                      }
                      onChange={(date) =>
                        handleChange(
                          index,
                          "timeline",
                          date ? date.toLocaleDateString("en-US") : null,
                        )
                      }
                      placeholderText="MM/DD/YYYY"
                      className="w-full rounded p-2"
                    />
                  </td>
                  <td className="border-secondary border-r px-2 py-3">
                    <select
                      value={project.assign}
                      onChange={(e) =>
                        handleChange(index, "assign", e.target.value)
                      }
                      className="bg-primary px-2 py-1 text-white"
                    >
                      <option value="">Select Team Member</option>
                      {teamMembers.map((member) => (
                        <option key={member} value={member}>
                          {member}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border-secondary border-r px-2 py-3">
                    <input
                      type="time"
                      value={project.finishTime}
                      onChange={(e) =>
                        handleChange(index, "finishTime", e.target.value)
                      }
                      className="w-full rounded p-2 text-black"
                    />
                  </td>
                  <td className="border-border-color border-r px-2 py-3">
                    <select
                      value={project.status}
                      onChange={(e) =>
                        handleChange(index, "status", e.target.value)
                      }
                      className={`w-full rounded p-2 ${getStatusColor(project.status)}`}
                    >
                      <option value="Select Status">Select Status</option>
                      <option value="Done">Done</option>
                      <option value="Pending">Pending</option>
                      <option value="WIP">WIP</option>
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
