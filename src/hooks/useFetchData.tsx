// useFetchData.js
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const cache = {};

export function useFetchData(url, method = "GET", body = null) {
  const [data, setData] = useState(null);
  const [version, setVersion] = useState(0); // trigger for reload
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
        ...(body && { data: body }),
      };

      const response = await axios(url, options);
      cache[url] = response.data;
      setData(response.data);
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  }, [url, method, body]);

  useEffect(() => {
    fetchData();
  }, [fetchData, version]);

  const refetch = () => setVersion((v) => v + 1);

  return { data, loading, refetch };
}
