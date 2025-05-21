import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthProvider";

/**
 * useFetchData
 * @param {string} url - API endpoint
 * @param {string} method - HTTP method (default: "GET")
 * @param {object|null} body - request body (optional)
 * @param {object} options - react-query options like refetchInterval, retry etc.
 */
export function useFetchData(url, method = "GET", body = null, options = {}) {
  const { isLoading: authLoading } = useContext(AuthContext);
  const token = Cookies.get("core");

  const isTokenAvailable = !!token && !authLoading;

  const fetchData = async () => {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      const response = await axios(url, {
        method,
        headers,
        ...(body && { data: body }),
      });

      return response.data;
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "Something went wrong";

      if (status === 401 || status === 403) {
        toast.warning(
          "⚠️ Session expired or unauthorized. Please login again.",
        );
      } else if (status === 404) {
        return { data: [] };
      } else {
        toast.error(message);
      }

      throw new Error(message);
    }
  };

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: [url, method, body],
    queryFn: fetchData,
    enabled: isTokenAvailable,
    refetchOnWindowFocus: false,
    retry: false,
    ...options,
  });

  return {
    data,
    loading,
    error: error?.message || null,
    refetch,
  };
}
