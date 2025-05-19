// import axios from "axios";
// import Cookies from "js-cookie";
// import { useCallback, useEffect, useState } from "react";
// import { toast } from "react-toastify";

// export function useFetchData(url, method = "GET", body = null) {
//   const [data, setData] = useState(null);
//   const [version, setVersion] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // extra error state if needed

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     const token = Cookies.get("core");

//     try {
//       const headers = {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),
//       };

//       const response = await axios(url, {
//         method,
//         headers,
//         ...(body && { data: body }),
//       });

//       setData(response.data);
//       setError(null);
//       console.log("✅ Data fetched:", response.data);
//     } catch (error) {
//       const status = error?.response?.status;
//       const message = error?.response?.data?.message || "Something went wrong";

//       console.error("❌ Fetch error:", error);

//       if (status === 401 || status === 403) {
//         Cookies.remove("core");
//         toast.warning("Session expired. Please login again.");
//         setTimeout(() => {
//           window.location.href = "/login";
//         }, 1500);
//       } else if (status === 404) {
//         setData({ data: [] }); // Optional: fallback empty array
//       } else {
//         toast.error(message);
//       }

//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   }, [url, method, body, version]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const refetch = () => setVersion((v) => v + 1);

//   return { data, loading, error, refetch };
// }

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

/**
 * useFetchData
 * @param {string} url - API endpoint
 * @param {string} method - HTTP method (default: "GET")
 * @param {object|null} body - request body (optional)
 * @param {object} options - react-query options like refetchInterval, retry etc.
 */
export function useFetchData(url, method = "GET", body = null, options = {}) {
  const token = Cookies.get("core");

  // Data fetcher function for react-query
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
        Cookies.remove("core");
        toast.warning("Session expired. Please login again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else if (status === 404) {
        return { data: [] }; // Optional fallback for 404
      } else {
        toast.error(message);
      }

      throw new Error(message); // Important for react-query to catch
    }
  };

  // useQuery call with all options injected
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: [url, method, body],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    retry: false,
    ...options, // 🔥 Pass options like refetchInterval here
  });

  console.log("📊 Fetched data:", data);

  return {
    data,
    loading,
    error: error?.message || null,
    refetch,
  };
}
