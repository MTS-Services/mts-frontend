import axios from "axios";
import { use } from "react";

const cache = {};

export function useFetchData(url, method = "GET", body = null) {
  async function fetchData(retries = 3) {
    if (cache[url]) {
      return cache[url];
    }

    try {
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
        ...(body && { data: body }),
      };

      const response = await axios(url, options);
      cache[url] = response.data;
      return response.data;
    } catch (error) {
      if (retries > 0) {
        console.warn(`Retrying... attempts left: ${retries}`);
        return await fetchData(retries - 1);
      } else {
        console.error("API error after retries:", error);
        throw error;
      }
    }
  }

  const data = use(fetchData());
  return data;
}
