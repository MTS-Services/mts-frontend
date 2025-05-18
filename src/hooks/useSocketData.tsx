import { useEffect, useState } from "react";
import { useSocketFetcher } from "./useSocketFetcher";

export const useSocketData = (
  socket,
  departmentId,
  teamId,
  projectItem,
  setProjectStates,
) => {
  const departments = useSocketFetcher(
    socket,
    "getDepartmentNames",
    null,
    "getDepartmentName",
  );

  const departmentIdStr = String(departmentId || "");
  const teams = useSocketFetcher(
    socket,
    "getTeamsForDepartment",
    departmentId,
    `getTeamName:${departmentIdStr}`,
  );

  const salesteams = useSocketFetcher(
    socket,
    "getTeamsForDepartment",
    2,
    `getTeamName:${2}`,
  );

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("getProfilename");

    const handler = (data) => {
      setProfiles(data);
    };

    socket.on("getProfilename", handler);

    return () => {
      socket.off("getProfilename", handler);
    };
  }, [socket]);

  // 🔁 Handle project updates
  useEffect(() => {
    if (!socket || !projectItem?.id || !setProjectStates) return;

    const handleProjectUpdate = (updatedItem) => {
      if (updatedItem.id === projectItem.id) {
        setProjectStates(updatedItem);
      }
    };

    socket.on("projectUpdated", handleProjectUpdate);

    return () => {
      socket.off("projectUpdated", handleProjectUpdate);
    };
  }, [socket, projectItem?.id, setProjectStates]);

  return { departments, teams, profiles, salesteams };
};
