// useFetchData.js
import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
const cache = {};

export function useFetchData(url, method = "GET", body = null) {
  const token = Cookies.get("core");
  const [data, setData] = useState(null);
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
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
      
      cache[url] = response.data;
      setData(response.data);
      console.log("res:", response);
    } catch (error) {
      Cookies.remove("core");
      toast.warning("Invalid or expired token. Please login again.");
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, token]);

  useEffect(() => {
    fetchData();
    
  }, [fetchData, version]);

  const refetch = () => setVersion((v) => v + 1);

  return { data, loading, refetch };
}