import { useState, useEffect } from "react";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import CustomSelect from "./CustomSelect";

const ReassignTeamForm = ({
  data,
  tasks,
  teamMembers,
  token,
  refreshTasks,
}) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [assignedList, setAssignedList] = useState([]);
  const [reassignList, setReassignList] = useState([]);

  // ✅ Load assigned members (email based)
  useEffect(() => {
    if (!selectedProject) {
      setAssignedList([]);
      return;
    }

    const selectedTasks = tasks.filter(
      (task) => task.project_id === selectedProject.project_id,
    );

    const unique = [];
    const emails = new Set();

    selectedTasks.forEach((task) => {
      (task.assign || []).forEach((member) => {
        if (
          member?.id &&
          member?.first_name &&
          member?.email &&
          !emails.has(member.email)
        ) {
          emails.add(member.email);
          unique.push({
            id: member.id,
            first_name: member.first_name,
          });
        }
      });
    });

    setAssignedList(unique);
    setReassignList([]);
  }, [selectedProject]);

  // ✅ Remove assigned member from UI
  const handleRemoveAssigned = (id) => {
    setAssignedList((prev) => prev.filter((m) => m.id !== id));
  };

  // ✅ Get available members (not assigned)
  const getUnassignedTeamMembers = () => {
    const assignedIds = new Set(assignedList.map((m) => m.id));
    return teamMembers
      .filter((member) => !assignedIds.has(member.id))
      .map((member) => ({
        value: member.id,
        label: `${member.first_name}`,
      }));
  };

  // ✅ Handle selection
  const handleReassignSelect = (selected) => {
    const selectedIds = selected.map((opt) => parseInt(opt.value));
    const updated = selectedIds.map((newId, index) => ({
      old_member_id: assignedList[index]?.id,
      new_member_id: newId,
    }));
    setReassignList(updated);
  };

  // ✅ Submit reassignment
  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const item of reassignList) {
      if (!item.old_member_id || !item.new_member_id) continue;
      console.log(`Reassigning ${item.old_member_id} to ${item.new_member_id}`);
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
              old_member_id: item.old_member_id,
              new_member_id: item.new_member_id,
            }),
          },
        );
      } catch (err) {
        console.error("❌ Failed:", err);
      }
    }

    alert("✅ Reassigned successfully!");
    setSelectedProject(null);
    setAssignedList([]);
    setReassignList([]);
    refreshTasks();
  };

  // ✅ Project dropdown
  const projectOptions = data.map((item) => ({
    value: item.project_id,
    label: `${item.project_id} - ${item.client_name}`,
  }));

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h1 className="text-accent mb-4 text-4xl font-semibold">
        Reassign Team Members
      </h1>
      {/*  Project Select */}
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
        onChange={(option) => {
          const selected = data.find((d) => d.project_id === option.value);
          setSelectedProject(selected || null);
        }}
        placeholder="Search and select a project..."
      />
      {/*  Assigned Members -  */}
      {selectedProject && (
        <div className="mt-5">
          <label className="text-accent mb-2 block text-lg font-medium">
            Assigned Team Members
          </label>
          <CustomSelect
            isMulti
            options={assignedList.map((m) => ({
              value: m.id,
              label: m.first_name,
            }))}
            value={assignedList.map((m) => ({
              value: m.id,
              label: m.first_name,
            }))}
            onChange={(selectedOptions) => {
              const updated = selectedOptions.map((opt) => ({
                id: opt.value,
                first_name: opt.label,
              }));
              setAssignedList(updated);
            }}
            placeholder={
              assignedList.length > 0
                ? "Assigned team members"
                : "No members assigned to this project"
            }
          />
        </div>
      )}
      {/*  Reassigned Team Members */}
      {selectedProject && (
        <div className="mt-6">
          <label className="text-accent mb-2 block text-lg font-medium">
            Reassigned Team Members
          </label>
          <CustomSelect
            isMulti
            options={getUnassignedTeamMembers()}
            onChange={handleReassignSelect}
            placeholder="Select unassigned members..."
          />
        </div>
      )}
      {/* Submit Button */}
      {selectedProject && (
        <div className="mt-4 flex items-start">
          <PrimaryButton>Reassign</PrimaryButton>
        </div>
      )}
    </form>
  );
};

export default ReassignTeamForm;
