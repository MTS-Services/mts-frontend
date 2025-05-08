import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import SingleTodayTask from "../SingleTodayTask";

const TeamMemberTasks = () => {
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("core");

  useEffect(() => {
    const fetchAssignedTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://mtsbackend20-production.up.railway.app/api/today-task/assigned",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await response.json();
        setAssignedTasks(result.tasks || []);
      } catch (error) {
        console.error("❌ Error fetching team-member assigned tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedTasks();
  }, [token]);

  return (
    <div className="font-secondary w-full overflow-x-auto p-4">
      {loading ? (
        <div>Loading...</div>
      ) : assignedTasks.length > 0 ? (
        assignedTasks.map((task, index) => (
          <SingleTodayTask key={index} item={task} />
        ))
      ) : (
        <p>No tasks assigned yet.</p>
      )}
    </div>
  );
};

export default TeamMemberTasks;
