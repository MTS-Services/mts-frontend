import { useState, useEffect } from "react";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import CustomSelect from "./CustomSelect";
import { toast } from "react-toastify";

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
  const [removedIds, setRemovedIds] = useState([]); // NEW ✅

  // ✅ Load assigned members on project select
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
    setRemovedIds([]); // clear old removed IDs
  }, [selectedProject, tasks]);

  // ✅ Track removed members and update assigned list
  const handleAssignedChange = (selectedOptions) => {
    const updated = selectedOptions.map((opt) => ({
      id: opt.value,
      first_name: opt.label,
    }));

    const removed = assignedList.filter(
      (old) => !updated.find((u) => u.id === old.id),
    );
    setRemovedIds(removed.map((r) => r.id));
    setAssignedList(updated);
  };

  // ✅ Build old → new reassignment map
  const handleReassignSelect = (selected) => {
    const selectedIds = selected.map((opt) => parseInt(opt.value));

    const updated = selectedIds.map((newId, index) => ({
      old_member_id: removedIds[index],
      new_member_id: newId,
    }));

    setReassignList(updated);
  };

  const getUnassignedTeamMembers = () => {
    const assignedIds = new Set(assignedList.map((m) => m.id));
    return teamMembers
      .filter((member) => !assignedIds.has(member.id))
      .map((member) => ({
        value: member.id,
        label: `${member.first_name}`,
      }));
  };

  // ✅ Submit reassignment (backend update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = { message: "" };
    for (const item of reassignList) {
      if (!item.old_member_id || !item.new_member_id) continue;
      try {
        const response = await fetch(
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
        result = await response.json();
      } catch (error) {
        console.error("Failed to Reassigned", error);
        toast.error("Failed to Reassigned");
      }
    }

    toast.success(result.message || "Team Members Reassigned Successfully!");
    setSelectedProject(null);
    setAssignedList([]);
    setReassignList([]);
    setRemovedIds([]);
    refreshTasks();
  };

  const projectOptions = data.map((item) => ({
    value: item.project_id,
    label: `${item.project_id} - ${item.client_name}`,
  }));

  return (
    <form onSubmit={handleSubmit} className="border-accent/30 border-b-1 pb-12">
      <h1 className="text-accent mb-4 text-4xl font-semibold">
        Reassign Team Members
      </h1>

      {/* Project Select */}
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

      {/* Assigned Members */}
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
            onChange={handleAssignedChange}
            placeholder={
              assignedList.length > 0
                ? "Assigned team members"
                : "No members assigned to this project"
            }
          />
        </div>
      )}

      {/* Reassigned Team Members */}
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
