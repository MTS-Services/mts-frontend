import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";

const PrefetchWrapper = () => {
  const queryClient = useQueryClient();
  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (isLoading) return;

    const token = Cookies.get("core");

    if (!token || !user) {
      console.warn("⛔ Not logged in or token missing, skipping prefetch.");
      return;
    }

    console.log("🚀 Prefetching started...");

    const routes = [
      {
        url: "https://mtsbackend20-production.up.railway.app/api/profile/reports/all",
        method: "GET",
      },
      {
        url: "https://mtsbackend20-production.up.railway.app/api/profile/projectSpecialOrder/",
        method: "GET",
      },
      {
        url: "https://mtsbackend20-production.up.railway.app/api/today-task/distribution",
        method: "GET",
      },
      {
        url: "https://mtsbackend20-production.up.railway.app/api/team/teamwisechart",
        method: "GET",
      },
    ];

    routes.forEach(({ url }) => {
      queryClient.prefetchQuery({
        queryKey: [url],
        queryFn: async () => {
          // ✅ Use the token we already got from Cookies
          const res = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(`✅ Prefetched: ${url}`);
          return res.data;
        },
        staleTime: Infinity,
      });
    });
  }, [queryClient, user, isLoading]);

  return null;
};

export default PrefetchWrapper;
