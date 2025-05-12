// useApiRequest.js
import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useApiRequest({
  url,
  method = "GET",
  body = null,
  autoFetch = true,
}) {
  const token = Cookies.get("core");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0); // For refetch trigger

  const execute = useCallback(
    async (overrideBody = null, overrideUrl = null, overrideMethod = null) => {
      setLoading(true);
      setError(null);

      try {
        const headers = {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        const response = await axios({
          url: overrideUrl || url,
          method: overrideMethod || method,
          headers,
          data: overrideBody || body,
        });

        setData(response.data);
        return response.data;
      } catch (err) {
        if (err.response?.status === 401 || err.message.includes("401")) {
          Cookies.remove("core");
          toast.warning("Invalid or expired token. Please login again.");
        } else {
          toast.error("API request failed.");
        }

        setError(err);
        throw err; // allow further error handling if needed
      } finally {
        setLoading(false);
      }
    },
    [url, method, body, token],
  );

  useEffect(() => {
    if (autoFetch) {
      execute();
    }
  }, [execute, version, autoFetch]);

  const refetch = () => setVersion((v) => v + 1);

  return { data, loading, error, refetch, execute };
}
