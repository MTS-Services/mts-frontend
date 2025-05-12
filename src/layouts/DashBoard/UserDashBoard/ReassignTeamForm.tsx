import { useState, useEffect } from "react";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import CustomSelect from "./CustomSelect";

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

  // ✅ Load assigned members when project changes
  useEffect(() => {
    if (!selectedProject) return;

    const currentTask = tasks.find(
      (t) => t.project_id === selectedProject.project_id,
    );
    const currentAssigned = currentTask?.assign || [];

    const preparedList = currentAssigned
      .filter((m) => m.first_name && m.last_name)
      .map((member) => ({
        old_member_id: member.id,
        old_name: `${member.first_name} ${member.last_name}`,
        new_member_id: null,
      }));

    setAssignedMembers(currentAssigned);
    setReassignList(preparedList);
  }, [selectedProject]);

  // ✅ Generate reusable dropdown options once
  const assignedIds = new Set(assignedMembers.map((m) => m.id));
  const availableMembers = teamMembers
    .filter((m) => !assignedIds.has(m.id))
    .map((m) => ({
      value: m.id,
      label: `${m.first_name} ${m.last_name} (${m.email})`,
    }));

  // ✅ Handle dropdown change
  const handleNewMemberChange = (index, option) => {
    const updated = [...reassignList];
    updated[index] = {
      ...updated[index],
      new_member_id: parseInt(option.value),
    };
    setReassignList(updated);
  };

  // ✅ Submit reassignment
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

      {/* Project Selection */}
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

      {/* Assigned Members to Reassign */}
      {selectedProject &&
        reassignList.map((item, index) => {
          const selectedOption = item.new_member_id
            ? availableMembers.find((opt) => opt.value === item.new_member_id)
            : null;

          return (
            <div key={item.old_member_id} className="mb-4">
              <label className="text-accent mb-2 block text-lg font-medium">
                {item.old_name}
              </label>
              <CustomSelect
                options={availableMembers}
                value={selectedOption}
                onChange={(opt) => handleNewMemberChange(index, opt)}
                placeholder="Select new member..."
              />
            </div>
          );
        })}

      {selectedProject && (
        <div className="mt-4 flex justify-start">
          <PrimaryButton>Reassign</PrimaryButton>
        </div>
      )}
    </form>
  );
};

export default ReassignTeamForm;
