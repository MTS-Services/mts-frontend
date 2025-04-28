import React, { JSX, useState } from "react";
import {
  MdAttachMoney,
  MdCheckCircle,
  MdEdit,
  MdAccessTime,
  MdArrowCircleDown,
} from "react-icons/md";
import { PiMicrosoftTeamsLogoLight } from "react-icons/pi";
import ProjectsUploadForm from "../../layouts/DashBoard/UserDashBoard/ProjectsUplodeForm";

// StatsDisplay Part
interface MtsTarget {
  title: string;
  amount: string;
  icon: JSX.Element;
}

const mtsTargets: MtsTarget[] = [
  {
    title: "Today Delivery :",
    amount: "1000",
    icon: <MdAttachMoney size={24} />,
  },
  { title: "Today Submit :", amount: "4", icon: <MdCheckCircle size={24} /> },
  { title: "Today Revision :", amount: "8", icon: <MdEdit size={24} /> },
  { title: "Submited :", amount: "2", icon: <MdArrowCircleDown size={24} /> },
  { title: "Short Time :", amount: "7", icon: <MdAccessTime size={24} /> },
  {
    title: "Meeting :",
    amount: "5",
    icon: <PiMicrosoftTeamsLogoLight size={24} />,
  },
];

// ProjectTable Part
interface ProjectRow {
  projectName: string;
  timeline: string;
  assign: string;
  finishTime: string;
  status: string;
}

const teamMembers = ["John", "Sarah", "Alex", "Emma"];
const statusOptions = ["Done", "Pending", "WIP"];

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<ProjectRow[]>([
    { projectName: "", timeline: "", assign: "", finishTime: "", status: "" },
    { projectName: "", timeline: "", assign: "", finishTime: "", status: "" },
    { projectName: "", timeline: "", assign: "", finishTime: "", status: "" },
  ]);

  const handleChange = (
    index: number,
    field: keyof ProjectRow,
    value: string,
  ) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  return (
    <div className="bg-background min-h-screen w-full overflow-x-auto px-6 py-10 sm:px-4 md:px-10 lg:px-14">
      {/* Stats Section */}
      <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
        {mtsTargets.map(({ title, amount, icon }, idx) => (
          <div
            key={idx}
            className="bg-primary border-border-color relative w-full rounded-sm border-2 p-4 text-white md:w-[30%] lg:h-28 lg:w-[20%] xl:w-[14%]"
          >
            <div className="flex items-center gap-2">
              {icon}
              <h2 className="text-sm md:text-xl">{title}</h2>
            </div>
            <h2 className="text-sm md:text-xl">{amount}</h2>
          </div>
        ))}
      </div>

      {/* Project Table Section */}
      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className="bg-secondary border-border-color border text-[16px] text-white">
              <th className="border border-white px-2 py-3">
                Project Name/Client Name
              </th>
              <th className="border-border-color border px-2 py-3">
                Timeline/Last Update
              </th>
              <th className="border border-white px-2 py-3">Assign</th>
              <th className="border border-white px-2 py-3">
                Expect Finish Time
              </th>
              <th className="border border-white px-2 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="border-2 border-white">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <tr
                  key={index}
                  className="odd:bg-primary even:bg-primary/70 hover:bg-primary/80 text-sm text-white transition-all"
                >
                  <td className="border-secondary border-r px-2 py-3">
                    <input
                      type="text"
                      value={project.projectName}
                      onChange={(e) =>
                        handleChange(index, "projectName", e.target.value)
                      }
                      placeholder="Project Name"
                      className="w-full rounded border p-2 text-black"
                    />
                  </td>
                  <td className="border-secondary border-r px-2 py-3">
                    <input
                      type="text"
                      value={project.timeline}
                      onChange={(e) =>
                        handleChange(index, "timeline", e.target.value)
                      }
                      placeholder="Timeline"
                      className="w-full rounded p-2 text-black"
                    />
                  </td>
                  <td className="border-secondary border-r px-2 py-3">
                    <select
                      value={project.assign}
                      onChange={(e) =>
                        handleChange(index, "assign", e.target.value)
                      }
                      className="w-full rounded border p-2 text-black"
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
                      className="text-primary w-full rounded border p-2"
                    />
                  </td>
                  <td className="border-border-color border-r px-2 py-3">
                    <select
                      value={project.status}
                      onChange={(e) =>
                        handleChange(index, "status", e.target.value)
                      }
                      className="w-full rounded border p-2 text-black"
                    >
                      <option value="">Select Status</option>
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-accent py-6 text-center">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Projects Upload Form */}
      <div className="mt-10">
        <ProjectsUploadForm />
      </div>
    </div>
  );
};

export default Dashboard;
