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
  const fetchClientSuggestions = useCallback(async (query: string): Promise<void> => {
    if (!query.trim()) {
      setClientSuggestions([]); 
      return;
    }

    try {
      const response = await fetch(`http://192.168.10.47:3000/api/project/clientSuggestions/?query=${query}`);
      const data: ClientData = await response.json(); 

      if (data.uniqueClientNames && data.uniqueClientNames.length > 0) {
        // Filter client suggestions based on exact match of the query
        const filteredClients = data.uniqueClientNames.filter(client => 
          client.toLowerCase() === query.toLowerCase() 
        );
        displayClientSuggestions(filteredClients); 
      } else {
        setClientSuggestions([]); 
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error); 
    }
  }, []); 

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
      <div className="relative font-secondary">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          onFocus={() => setIsHidden(false)} 
          onBlur={() => setTimeout(() => setIsHidden(true), 100)} 
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
                    setSearchQuery(client); 
                    setClientSuggestions([]); 
                    fetchProjectsByClient(client); 
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
