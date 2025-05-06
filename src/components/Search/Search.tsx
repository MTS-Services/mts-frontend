import { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import SecondaryButton from "../Button/SecondaryButton";
import PrimaryButton from "./../Button/PrimaryButton";
import ResetButton from "./../Button/ResetButton";

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
          `https://mtsbackend20-production.up.railway.app/api/project/clientSuggestions/?query=${query}`,
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
    setProjects([]);

    try {
      const response = await fetch(
        `https://mtsbackend20-production.up.railway.app/api/project/byClient?clientName=${client}`,
      );
      const data = await response.json();

      if (data.projects && data.projects.length > 0) {
        setProjects(data.projects);
      } else {
        setProjects([]);
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
      setClientSuggestions([]);
    }
  }, [searchQuery, fetchClientSuggestions]);

  // Open the modal for adding revision
  const openModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setRevisionComments("");
    setDeliveryDate("");
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
        `https://mtsbackend20-production.up.railway.app/api/project/updateRevision/${selectedProjectId}`,
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

  // Reset the page state
  const resetPage = () => {
    setSearchQuery("");
    setClientSuggestions([]);
    setProjects([]);
    setRevisionComments("");
    setDeliveryDate("");
    setIsHidden(true);
  };

  return (
    <div className="max-w-3xl rounded-lg text-white shadow-lg">
      {/* Search input container */}
      <div className="font-secondary relative">
        <input
          type="text"
          placeholder="Search for a client..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsHidden(false)}
          onBlur={() => setTimeout(() => setIsHidden(true), 100)}
          className="border-accent focus:ring-primary focus:border-primary text-accent from-secondary w-130 transform rounded-full border bg-gradient-to-r py-2 pr-4 pl-12 text-sm shadow-md transition duration-400 ease-in-out hover:scale-105 hover:shadow-xl focus:ring-2 focus:outline-none sm:text-base"
        />
        <FiSearch className="text-primary absolute top-1/2 left-4 -translate-y-1/2 text-xl" />
      </div>

      {/* Display suggestions if not hidden and there are results */}
      {!isHidden && searchQuery && (
        <div className="bg-background text-accent absolute mt-2 mb-4 max-h-72 w-130 overflow-auto rounded-lg border p-4 shadow-md">
          <ul className="space-y-2">
            {clientSuggestions.map((client, index) => (
              <li
                key={index}
                className="hover:text-accent hover:bg-secondary flex items-center justify-between rounded-md p-2"
                onClick={() => {
                  setSearchQuery(client);
                  setClientSuggestions([]);
                  fetchProjectsByClient(client);
                }}
              >
                {client}

                <SecondaryButton
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the li click
                    fetchProjectsByClient(client); // Fetch projects when "Add" is clicked
                  }}
                >
                  Add
                </SecondaryButton>
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
                  className="bg-background text-accent mb-4 rounded-lg border p-4 shadow-md"
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
                  <div className="flex items-center justify-between">
                    <SecondaryButton onClick={() => openModal(project.id)}>
                      Add Revision
                    </SecondaryButton>
                    {/* Reset Button */}
                    <ResetButton onClick={resetPage}>Reset</ResetButton>
                  </div>
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
              className="text-accent bg-background mb-4 w-full rounded-lg border border-gray-300 p-2"
            />

            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="text-accent bg-background mb-4 w-full rounded-lg border border-gray-300 p-2"
            />

            <PrimaryButton onClick={submitRevision}>Submit</PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
