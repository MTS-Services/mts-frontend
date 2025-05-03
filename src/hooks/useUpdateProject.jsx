import axios from "axios";
import { useState } from "react";

/**
 * Custom hook to update a project by ID.
 * Provides loading, success, and error state.
 */
export const useUpdateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateProject = async (projectId, data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.put(
        `http://192.168.10.47:3000/api/project/${parseInt(projectId)}`,
        data,
      );

      if (!(data.opsleader_comments || data.sales_comments)) {
        setSuccess(true);
      }

      console.log("Update success:", response.data);
    } catch (err) {
      console.error("Update failed:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProject,
    loading,
    error,
    success,
  };
};
