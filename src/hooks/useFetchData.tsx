import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useFetchData(url, method = "GET", body = null) {
  const [data, setData] = useState(null);
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // extra error state if needed

  const fetchData = useCallback(async () => {
    setLoading(true);
    const token = Cookies.get("core");

    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const response = await axios(url, {
        method,
        headers,
        ...(body && { data: body }),
      });

      setData(response.data);
      setError(null);
      console.log("✅ Data fetched:", response.data);
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "Something went wrong";

      console.error("❌ Fetch error:", error);

      if (status === 401 || status === 403) {
        Cookies.remove("core");
        toast.warning("Session expired. Please login again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else if (status === 404) {
        setData({ data: [] }); // Optional: fallback empty array
      } else {
        toast.error(message);
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, version]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => setVersion((v) => v + 1);

  return { data, loading, error, refetch };
}
