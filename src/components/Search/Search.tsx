import { useState, useRef, useEffect, useCallback } from "react";
import { FiSearch } from "react-icons/fi";

// Define types for props and state
interface ClientData {
  uniqueClientNames: string[];
}

const Search: React.FC = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [clientSuggestions, setClientSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to display client suggestions
  const displayClientSuggestions = (clients: string[]): void => {
    setClientSuggestions(clients);
  };

  // Function to fetch client suggestions from the API
  const fetchClientSuggestions = useCallback(
    async (query: string): Promise<void> => {
      if (!query.trim()) {
        setClientSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `http://192.168.10.47:3000/api/project/clientSuggestions/?query=${query}`,
        );
        const data: ClientData = await response.json();

        if (data.uniqueClientNames && data.uniqueClientNames.length > 0) {
          displayClientSuggestions(data.uniqueClientNames);
        } else {
          setClientSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    },
    [],
  );

  // Function to simulate fetching projects by client
  const fetchProjectsByClient = (client: string): void => {
    console.log(`Fetching projects for ${client}`);
  };

  // Effect hook to trigger fetching when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim()) {
      fetchClientSuggestions(searchQuery);
    } else {
      setClientSuggestions([]);
    }
  }, [searchQuery, fetchClientSuggestions]);

  return (
    <div className="relative w-full sm:w-96" ref={containerRef}>
      {/* Search input container */}
      <div className="font-secondary relative">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsHidden(false)}
          onBlur={() => setTimeout(() => setIsHidden(true), 100)}
          className="border-accent focus:ring-primary focus:border-primary text-accent from-secondary w-full transform rounded-full border bg-gradient-to-r py-2 pr-4 pl-12 text-sm shadow-md transition duration-400 ease-in-out hover:scale-105 hover:shadow-xl focus:ring-2 focus:outline-none sm:text-base"
        />
        <FiSearch className="text-primary absolute top-1/2 left-4 -translate-y-1/2 text-xl" />
      </div>

      {/* Display suggestions if not hidden and there are results */}
      {!isHidden && searchQuery && (
        <div className="bg-accent text-background absolute z-10 mt-2 max-h-48 w-full overflow-auto rounded-xl p-2 shadow-lg">
          <ul id="result-list" className="space-y-2">
            {clientSuggestions.length > 0 ? (
              clientSuggestions.map((client, index) => (
                <li
                  key={index}
                  className="hover:bg-primary hover:text-background border-secondary flex items-center justify-between rounded-lg border px-6 py-2"
                  onClick={() => {
                    setSearchQuery(client);
                    setClientSuggestions([]);
                    fetchProjectsByClient(client);
                  }}
                >
                  {client}
                  <button className="border-primary bg-background text-accent cursor-pointer rounded-xl border px-8 py-1">
                    Add
                  </button>
                </li>
              ))
            ) : (
              <div className="p-2">No matching clients found.</div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
