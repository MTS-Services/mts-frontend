import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { RiAddBoxFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { debounce } from "../utility/debounce";

function ProjectSearchBox({ refetch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef();
  const token = Cookies.get("core");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const fetchSuggestions = debounce(async (input) => {
    if (!input.trim()) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const url = `https://mtsbackend20-production.up.railway.app/api/project/clientSuggestions/?query=${input}`;
      const res = await axios.get(url, { headers });
      setSuggestions(res?.data?.uniqueClientNames || []);
    } catch (err) {
      console.error("Error fetching suggestions", err);
      toast.error("Failed to fetch suggestions.");
    } finally {
      setLoading(false);
    }
  }, 500);

  const addProjectHandler = async (id) => {
    try {
      const response = await fetch(
        `https://mtsbackend20-production.up.railway.app/api/project/updateRevision/${id}`,
        {
          method: "PUT",
          headers: headers,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update revision");
      }

      refetch();
      toast.success("Revision updated successfully! 🎉");
    } catch (error) {
      console.error("Error updating revision:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchSuggestions(query);
  }, [query]);

  // Handle click outside to close suggestion box
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={inputRef} className="font-primary relative w-60">
      <div className="border-border-color bg-secondary flex items-center justify-between gap-3 rounded border-2 p-2 duration-150 hover:scale-95">
        <div className="border-border-color/30 flex w-full items-center rounded border bg-white px-2 py-1">
          <input
            type="text"
            placeholder="Search project..."
            value={query}
            onFocus={() => setShowSuggestions(true)}
            onChange={(e) => setQuery(e.target.value)}
            className="text-primary w-full bg-transparent text-sm outline-none"
          />
        </div>
        <div className="border-accent/30 flex items-center gap-2 border-l pl-3">
          <IoSearchSharp className="cursor-pointer text-lg" />
        </div>
      </div>

      {showSuggestions && (
        <ul className="bg-primary font-primary absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded border shadow-lg">
          {loading && (
            <li className="flex items-center justify-center p-2">
              Searching...
            </li>
          )}

          {!loading && suggestions.length === 0 && query.trim() !== "" && (
            <li className="p-2">No project found</li>
          )}

          {!loading &&
            suggestions.map((item) => (
              <li
                key={item.id}
                className="border-accent/40 hover:bg-secondary/20 flex items-center justify-between border-1 p-2"
              >
                <div
                  onClick={() => {
                    setQuery("");
                    setSuggestions([]);
                    setShowSuggestions(false);
                  }}
                  className="cursor-pointer"
                >
                  <p>{item.clientName}</p>
                  <p>{item.order_id}</p>
                </div>

                <RiAddBoxFill
                  onClick={(e) => {
                    e.stopPropagation();
                    addProjectHandler(item.id);
                  }}
                  className="h-8 w-8 cursor-pointer transition-transform duration-150 hover:scale-110"
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectSearchBox;
