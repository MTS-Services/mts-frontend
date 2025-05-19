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

      const result = await res.json();
      alert(result.message || "Team members assigned successfully!");
      setSelectedProject(null);
      setSelectedMembers([]);
      refreshTasks();
    } catch (err) {
      console.error("Assign failed:", err);
    }
  };

  // ✅ Get unassigned team members based on email
  const getUnassignedMembers = () => {
    if (!selectedProject) return [];

    const assignedEmails = new Set();

    tasks
      .filter((task) => task.project_id === selectedProject.project_id)
      .forEach((task) => {
        (task.assign || []).forEach((assignedUser) => {
          if (assignedUser?.email) {
            assignedEmails.add(assignedUser.email.toLowerCase());
          }
        });
      });

    return teamMembers.filter(
      (member) => !assignedEmails.has(member.email.toLowerCase()),
    );
  };

  const memberOptions = getUnassignedMembers().map((member) => ({
    value: member.id,
    label: `${member.first_name} ${member.last_name} (${member.email})`,
  }));

  const projectOptions = Array.from(
    new Map(data.map((item) => [item.project_id, item])).values(),
  ).map((item) => ({
    value: item.project_id,
    label: `${item.project_id} - ${item.client_name}`,
  }));

  return (
    <form onSubmit={handleAssign} className="mb-6">
      <h1 className="text-accent mb-4 text-4xl font-semibold">
        Assign Team Members
      </h1>

      {/* ✅ Select Project */}
      <label className="text-accent mb-2 block text-lg font-medium">
        Select Project
      </label>

      <CustomSelect
        options={projectOptions}
        value={
          selectedProject
            ? {
                value: selectedProject.project_id,
                label: `${selectedProject.project_id} - ${selectedProject.client_name}`,
              }
            : null
        }
        onChange={(selectedOption) => {
          const selected = data.find(
            (item) => item.project_id === selectedOption.value,
          );
          setSelectedProject(selected || null);
          setSelectedMembers([]);
        }}
        placeholder="Search and select a project..."
      />

      {/* ✅ Select Team Members */}
      {selectedProject && (
        <>
          <label className="text-accent mt-4 mb-2 block text-lg font-medium">
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
