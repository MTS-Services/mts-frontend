// ✅ PrefetchWrapper.tsx → একটা কম্পোনেন্ট যা auto prefetch করে
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const PrefetchWrapper = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
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
          const token = localStorage.getItem("core");
          const res = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return res.data;
        },
      });
    });
  }, [queryClient]);

  return null;
};

export default PrefetchWrapper;
