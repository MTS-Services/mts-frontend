// src/hooks/socket/useSocketDataUtils.js
import { useEffect, useState } from "react";

export function useDepartmentNames(socket) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("getDepartmentNames");

    const handle = (data) => {
      setDepartments(Array.isArray(data) ? data : []);
    };

    socket.on("getDepartmentName", handle);

    return () => socket.off("getDepartmentName", handle);
  }, [socket]);

  return departments;
}

export function useProfileNames(socket) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("getProfilename");

    const handle = (data) => {
      setProfiles(Array.isArray(data) ? data : []);
    };

    socket.on("getProfilename", handle);

    return () => socket.off("getProfilename", handle);
  }, [socket]);

  return profiles;
}

export function useSalesMembers(socket, departmentId = 1) {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (!socket || !departmentId) return;

    socket.emit("getTeamMemberByDepartment", departmentId);

    const handle = (data) => {
      setSales(Array.isArray(data) ? data : []);
    };

    socket.on("getTeamMember", handle);

    return () => socket.off("getTeamMember", handle);
  }, [socket, departmentId]);

  console.log(sales);

  return sales;
}
