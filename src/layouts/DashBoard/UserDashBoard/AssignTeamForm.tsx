import { useState } from "react";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import CustomSelect from "./CustomSelect";

const AssignTeamForm = ({ token, tasks, teamMembers, refreshTasks }) => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedProject || selectedMembers.length === 0) return;

    try {
      const res = await fetch("/api/today-task/assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          project_id: selectedProject,
          team_member_ids: selectedMembers.map((m) => parseInt(m.value)),
        }),
      });
      const data = await res.json();
      alert(data.message || "Team members assigned!");
      setSelectedProject("");
      setSelectedMembers([]);
      refreshTasks();
    } catch (err) {
      console.error("Assign failed:", err);
    }
  };

  const getUnassignedMembers = () => {
    const assignedIds = new Set(
      (tasks.find((t) => t.project_id === selectedProject)?.assign || [])
        .map((a) => a.id)
        .filter((id) => id !== null),
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
        value={selectedProject}
        onChange={(e) => {
          setSelectedProject(e.target.value);
          setSelectedMembers([]);
        }}
        className="bg-primary border-border-color mb-4 flex w-150 cursor-pointer flex-wrap gap-5 rounded p-2 px-2 py-3"
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

          <div className="flex justify-start">
            <PrimaryButton type="submit">Assign</PrimaryButton>
          </div>
        </>
      )}
    </form>
  );
};

export default AssignTeamForm;
