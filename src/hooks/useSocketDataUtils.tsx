// src/hooks/socket/useSocketDataUtils.js
import { useEffect, useState } from "react";

export function useDepartmentNames(socket) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const emit = () => socket.emit("getDepartmentNames");
    const handle = (data) => {
      setDepartments(Array.isArray(data) ? data : []);
    };

    if (socket.connected) emit();
    else socket.on("connect", emit);

    socket.on("getDepartmentName", handle);

    return () => {
      socket.off("getDepartmentName", handle);
      socket.off("connect", emit);
    };
  }, [socket]);

  return departments;
}

export function useProfileNames(socket) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const fetchProfiles = () => {
      console.log("✅ Emitting getProfilename after socket ready");
      socket.emit("getProfilename");
    };

    const handle = (data) => {
      console.log("✅ Got profiles:", data);
      setProfiles(Array.isArray(data) ? data : []);
    };

    if (socket.connected) {
      fetchProfiles();
    } else {
      socket.once("connect", fetchProfiles); // emit only once when connected
    }

    socket.on("getProfilename", handle);

    return () => {
      socket.off("getProfilename", handle);
      socket.off("connect", fetchProfiles); // clean up
    };
  }, [socket]);

  return profiles;
}

export function useSalesMembers(socket, departmentId = 2) {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (!socket || !departmentId) return;

    const emit = () => socket.emit("getTeamMemberByDepartment", departmentId);
    const handle = (data) => {
      setSales(Array.isArray(data) ? data : []);
    };

    if (socket.connected) emit();
    else socket.on("connect", emit);

    socket.on("getTeamMember", handle);

    return () => {
      socket.off("getTeamMember", handle);
      socket.off("connect", emit);
    };
  }, [socket, departmentId]);

  return sales;
}
