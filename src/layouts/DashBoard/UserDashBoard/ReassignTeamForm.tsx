import { useState, useEffect } from "react";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import CustomSelect from "./CustomSelect";
//////shkail monsi code and git hub testing okkkkay
const ReassignTeamForm = ({
  data,
  token,
  tasks,
  teamMembers,
  refreshTasks,
}) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [reassignList, setReassignList] = useState([]);

  // 🔄 Update assigned members when project changes
  useEffect(() => {
    if (!selectedProject) return;

    const currentTask = tasks.find(
      (t) => t.project_id === selectedProject.project_id,
    );
    const currentAssigned = currentTask?.assign || [];

    const preparedList = currentAssigned.map((member) => ({
      old_member_id: member.id,
      old_name: `${member.first_name} ${member.last_name}`,
      new_member_id: null,
    }));

    setAssignedMembers(currentAssigned);
    setReassignList(preparedList);
  }, [selectedProject]);

  // 🧠 Filter unassigned team members (dropdown options)
  const getAvailableMembers = () => {
    const assignedIds = new Set(assignedMembers.map((m) => m.id));
    return teamMembers
      .filter((m) => !assignedIds.has(m.id))
      .map((m) => ({
        value: m.id,
        label: `${m.first_name} ${m.last_name} (${m.email})`,
      }));
  };

  // 📝 Handle dropdown change
  const handleNewMemberChange = (index, option) => {
    const updated = [...reassignList];
    updated[index].new_member_id = parseInt(option.value);
    setReassignList(updated);
  };

  // ❌ Remove row (skip reassignment)
  const handleRemove = (index) => {
    const updated = [...reassignList];
    updated.splice(index, 1);
    setReassignList(updated);
  };

  // 🚀 Submit reassignments
  const handleReassign = async (e) => {
    e.preventDefault();

    for (const reassignment of reassignList) {
      if (!reassignment.new_member_id) continue;

      try {
        await fetch(
          "https://mtsbackend20-production.up.railway.app/api/today-task/replace",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              project_id: selectedProject.project_id,
              old_member_id: reassignment.old_member_id,
              new_member_id: reassignment.new_member_id,
            }),
          },
        );
      } catch (err) {
        console.error("Reassign failed:", err);
      }
    }

    alert("✅ Reassigned successfully!");
    setSelectedProject(null);
    setAssignedMembers([]);
    setReassignList([]);
    refreshTasks();
  };

  return (
    <form onSubmit={handleReassign} className="mb-6">
      <h1 className="text-accent mb-4 text-4xl font-semibold">
        Reassign Team Members
      </h1>

      {/* 🔘 Project Select */}
      <label className="text-accent mb-2 block text-lg font-medium">
        Select Project
      </label>
      <select
        value={selectedProject?.project_id || ""}
        onChange={(e) => {
          const project = data.find(
            (item) => item.project_id === parseInt(e.target.value),
          );
          setSelectedProject(project || null);
        }}
        className="bg-primary border-border-color mb-4 w-150 rounded p-2 py-3"
      >
        <option value="">-- Select a Project --</option>
        {tasks.map((t) => (
          <option key={t.project_id} value={t.project_id}>
            {t.project_id} - {t.client_name}
          </option>
        ))}
      </select>

      {/* 🔁 Show reassign rows */}
      {selectedProject &&
        reassignList.map((item, index) => (
          <div key={index} className="mb-4">
            <label className="text-accent mb-2 block text-lg font-medium">
              {item.old_name}
            </label>
            <div className="flex items-center gap-4">
              <CustomSelect
                options={getAvailableMembers()}
                value={
                  item.new_member_id
                    ? getAvailableMembers().find(
                        (opt) => opt.value === item.new_member_id,
                      )
                    : null
                }
                onChange={(opt) => handleNewMemberChange(index, opt)}
                placeholder="Select new member..."
              />
            </div>
          </div>
        ))}

      {selectedProject && (
        <div className="mt-4 flex justify-start">
          <PrimaryButton>Reassign</PrimaryButton>
        </div>
      )}
    </form>
  );
};

export default ReassignTeamForm;
//                     <div className="flex items-center justify-center py-4">
