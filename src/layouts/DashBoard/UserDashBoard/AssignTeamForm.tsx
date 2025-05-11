import { useState } from "react";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import CustomSelect from "./CustomSelect";

const AssignTeamForm = ({ data, token, tasks, teamMembers, refreshTasks }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedProject || selectedMembers.length === 0) return;

    const teamIds = selectedMembers.map((m) => parseInt(m.value));

    try {
      const res = await fetch(
        "https://mtsbackend20-production.up.railway.app/api/today-task/assign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            project_id: selectedProject.project_id,
            team_member_ids: teamIds,
          }),
        },
      );
      const data = await res.json();
      alert(data.message || "Team members assigned!");
      setSelectedProject(null);
      setSelectedMembers([]);
      refreshTasks(); // <-- Refetch data to update table
    } catch (err) {
      console.error("Assign failed:", err);
    }
  };

  const getUnassignedMembers = () => {
    const assignedIds = new Set(
      (
        tasks.find((t) => t.project_id === selectedProject?.project_id)
          ?.assign || []
      ).map((a) => a.id),
    );
    return teamMembers.filter((member) => !assignedIds.has(member.id));
  };

  const memberOptions = getUnassignedMembers().map((member) => ({
    value: member.id,
    label: `${member.first_name} ${member.last_name} (${member.email})`,
  }));

  return (
    <form onSubmit={handleAssign} className="mb-6">
      <h1 className="text-accent mb-4 text-4xl font-semibold">
        Assign Team Members
      </h1>

      <label className="text-accent mb-2 block text-lg font-medium">
        Select Project
      </label>
      <select
        value={selectedProject?.project_id || ""}
        onChange={(e) => {
          const selected = data.find(
            (item) => item.project_id === parseInt(e.target.value),
          );
          setSelectedProject(selected || null);
          setSelectedMembers([]);
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

      {selectedProject && (
        <>
          <label className="text-accent mb-2 block text-lg font-medium">
            Select Team Members
          </label>

          <CustomSelect
            isMulti
            options={memberOptions}
            value={selectedMembers}
            onChange={setSelectedMembers}
            placeholder="Select team members..."
          />

          <div className="mt-4 flex justify-start">
            <PrimaryButton>Assign</PrimaryButton>
          </div>
        </>
      )}
    </form>
  );
};

export default AssignTeamForm;
