import { useState, useRef, useEffect, useCallback } from "react";
import { FiSearch } from "react-icons/fi";

// Define types for props and state
interface ClientData {
  uniqueClientNames: string[];
}

const Search: React.FC = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true); // Manage visibility of suggestions
  const [searchQuery, setSearchQuery] = useState<string>(""); // Controlled input query
  const [clientSuggestions, setClientSuggestions] = useState<string[]>([]); // Array of client names
  const containerRef = useRef<HTMLDivElement>(null); // Ref for container

  // Function to display client suggestions
  const displayClientSuggestions = (clients: string[]): void => {
    setClientSuggestions(clients); // Set the client suggestions in the state
  };

  // Function to fetch client suggestions from the API
  const fetchClientSuggestions = useCallback(async (query: string): Promise<void> => {
    if (!query.trim()) {
      setClientSuggestions([]); // Clear suggestions if query is empty
      return;
    }

    try {
      const response = await fetch(`http://192.168.10.47:3000/api/project/clientSuggestions/?query=${query}`);
      const data: ClientData = await response.json(); // Ensure we are getting the expected data format

      if (data.uniqueClientNames && data.uniqueClientNames.length > 0) {
        displayClientSuggestions(data.uniqueClientNames); // Update the client suggestions list
      } else {
        setClientSuggestions([]); // No results found, clear the list
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error); // Handle any errors
    }
  }, []); // Empty dependency ensures this function doesn't depend on any state or props

  // Function to simulate fetching projects by client
  const fetchProjectsByClient = (client: string): void => {
    console.log(`Fetching projects for ${client}`); // This should be replaced with actual fetching logic
  };

  // Effect hook to trigger fetching when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim()) {
      fetchClientSuggestions(searchQuery); // Fetch client suggestions if there is a query
    } else {
      setClientSuggestions([]); // Clear suggestions if the search query is empty
    }
  }, [searchQuery, fetchClientSuggestions]); // Dependencies ensure this effect runs on changes to searchQuery

  return (
    <div className="relative w-full sm:w-96" ref={containerRef}>
      {/* Search input container */}
      <div className="relative font-secondary">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery} // Bind input value to state
          onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
          onFocus={() => setIsHidden(false)} // Show suggestions on focus
          onBlur={() => setTimeout(() => setIsHidden(true), 100)} // Hide suggestions after blur
          className="w-full pl-12 pr-4 py-2 text-sm sm:text-base rounded-full shadow-md border border-accent focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-400 text-accent bg-background"
        />
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl" />
      </div>

      {/* Display suggestions if not hidden and there are results */}
      {!isHidden && searchQuery && (
        <div className="absolute w-full bg-accent rounded-xl p-2 mt-2 z-10 shadow-lg text-background max-h-48 overflow-auto">
          <ul id="result-list" className="space-y-2">
            {clientSuggestions.length > 0 ? (
              clientSuggestions.map((client, index) => (
                <li
                  key={index}
                  className="cursor-pointer py-2 px-4 rounded-lg hover:bg-primary hover:text-background"
                  onClick={() => {
                    setSearchQuery(client); // Set selected client name in the search query
                    setClientSuggestions([]); // Clear suggestions after selection
                    fetchProjectsByClient(client); // Fetch projects for selected client
                  }}
                >
                  {client}
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
