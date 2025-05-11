import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-toastify";

/**
 * Custom hook to update a project by ID.
 * Provides loading, success, and error state.
 */
export const useUpdateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = Cookies.get("core");

  const updateProject = async (projectId, data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.put(
        `https://mtsbackend20-production.up.railway.app/api/project/${parseInt(projectId)}`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!(data.opsleader_comments || data.sales_comments)) {
        setSuccess(true);
      }
    } catch (err) {
      toast.warning("Erro: Check console");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setError(null);
  };

  return {
    updateProject,
    loading,
    error,
    success,
    reset, // return it
  };
};
