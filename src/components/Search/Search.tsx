import { useState, useEffect, useCallback } from "react";
import { FiSearch } from "react-icons/fi";

// Define types for props and state
interface ClientData {
  uniqueClientNames: string[];
}

interface Project {
  id: string;
  project_name: string;
  order_id: string;
  status: string;
  sales_comments: string;
  opsleader_comments: string;
  order_amount: number;
  sheet_link: string;
}

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [clientSuggestions, setClientSuggestions] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [revisionComments, setRevisionComments] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");

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
          setClientSuggestions(data.uniqueClientNames);
        } else {
          setClientSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    },
    [],
  );

  // Fetch projects for the selected client
  const fetchProjectsByClient = async (client: string) => {
    setProjects([]); // Clear the project list before fetching new ones

    try {
      const response = await fetch(
        `http://192.168.10.47:3000/api/project/byClient?clientName=${client}`,
      );
      const data = await response.json();

      if (data.projects && data.projects.length > 0) {
        setProjects(data.projects);
      } else {
        setProjects([]); // No projects found
        alert("No projects found for this client.");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Trigger fetching client suggestions when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim()) {
      fetchClientSuggestions(searchQuery);
    } else {
      setClientSuggestions([]); // Clear suggestions if query is empty
    }
  }, [searchQuery, fetchClientSuggestions]);

  // Open the modal for adding revision
  const openModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setShowModal(true); // Show the modal
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setRevisionComments(""); // Clear previous input
    setDeliveryDate(""); // Clear previous input
  };

  // Handle the submission of the revision
  const submitRevision = async () => {
    if (!revisionComments || !deliveryDate) {
      alert("Please provide both Revision Comments and Delivery Date.");
      return;
    }

    const payload = {
      revision_comments: revisionComments,
      delivery_date: deliveryDate,
    };

    try {
      const response = await fetch(
        `http://192.168.10.47:3000/api/project/updateRevision/${selectedProjectId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();
      if (response.ok) {
        alert("Revision added successfully.");
        closeModal(); // Close the modal after submission
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting revision:", error);
      alert("Failed to add revision.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-black p-6 text-white shadow-lg">
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
        <div className="absolute z-10 mt-2 max-h-48 w-full overflow-auto rounded-xl bg-black p-2 shadow-lg">
          <ul id="result-list" className="space-y-2">
            {clientSuggestions.map((client, index) => (
              <li
                key={index}
                className="rounded-md p-2 hover:bg-black hover:text-white"
                onClick={() => {
                  setSearchQuery(client); // Update the search query with the full client name
                  setClientSuggestions([]); // Clear suggestions after selection
                  fetchProjectsByClient(client); // Fetch projects when a client is selected
                }}
              >
                {client}
                <button
                  className="ml-4 cursor-pointer rounded-lg bg-blue-500 px-3 py-1 text-white"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the li click
                    fetchProjectsByClient(client); // Fetch projects when "Add" is clicked
                  }}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Projects */}
      <div>
        {projects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold">Projects:</h3>
            <ul className="space-y-4">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="mb-4 rounded-lg border bg-gray-800 p-4 shadow-md"
                >
                  <strong>Project Name:</strong> {project.project_name} <br />
                  <strong>Order ID:</strong> {project.order_id} <br />
                  <strong>Status:</strong> {project.status} <br />
                  <strong>Sales Comments:</strong>{" "}
                  {project.sales_comments || "—"} <br />
                  <strong>Ops Leader Comments:</strong>{" "}
                  {project.opsleader_comments || "—"} <br />
                  <strong>Order Amount:</strong> ${project.order_amount || 0}{" "}
                  <br />
                  <a
                    href={project.sheet_link}
                    target="_blank"
                    className="text-blue-500"
                  >
                    View Sheet
                  </a>
                  <br />
                  <button
                    onClick={() => openModal(project.id)}
                    className="mt-2 rounded-lg bg-green-500 px-4 py-2 text-white"
                  >
                    Add Revision
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modal for Adding Revision */}
      {showModal && (
        <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
          <div className="modal-content w-3/4 max-w-md rounded-md bg-black p-6">
            <span
              className="close absolute top-2 right-2 cursor-pointer text-xl"
              onClick={closeModal}
            >
              &times;
            </span>
            <h3 className="mb-4 text-xl font-semibold">Add Revision</h3>
            <input
              type="text"
              placeholder="Revision Comments"
              value={revisionComments}
              onChange={(e) => setRevisionComments(e.target.value)}
              className="mb-4 w-full rounded-lg border border-gray-300 bg-black p-2 text-white"
            />
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="mb-4 w-full rounded-lg border border-gray-300 bg-black p-2 text-white"
            />
            <button
              onClick={submitRevision}
              className="w-full rounded-lg bg-green-500 py-2 text-white hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
