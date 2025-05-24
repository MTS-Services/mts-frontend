import axios from "axios";
import Cookies from "js-cookie";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; // Import useQuery
import { useContext } from "react"; // Import useContext
import { AuthContext } from "../../../context/AuthProvider";

// Problematic imports (now corrected for FaStar)
// import Tippy from "@tippyjs/react"; // Assuming you might not use Tippy
import { FaStar } from "react-icons/fa"; // THIS LINE IS UNCOMMENTED AND NOW ACTIVE
import "react-toastify/dist/ReactToastify.css";
// import "tippy.js/dist/tippy.css"; // Only if you use Tippy
// import Loading from "../../../components/Loading/Loading"; // Replaced with LoadingComponent below
// import { useFetchData } = "../../../hooks/useFetchData"; // This hook is now defined below

// Define interfaces for better type safety and understanding of data structure
interface Department {
  id: number;
  department_name: string;
  created_date: string;
  department_target: number | null;
}

interface Team {
  team_name?: string;
}

interface Project {
  id: number;
  created_date: string;
  profile_name: string;
  order_amount: number | null;
  bonus_amount: number | null;
  order_count: number | null;
  rank: number | null;
  cancel_count: number | null;
  complete_count: number | null;
  no_rating: number | null;
  profile_target: number | null;
  department_id: number | null;
  repeat_order: number | null;
  total_rating: number | null;
  project_name: string;
  revision: number | null;
  order_id: string;
  sheet_link: string;
  bonus: number | null;
  rating: number | null;
  date: string;
  ops_status: string;
  deli_last_date: string;
  after_fiverr_amount: number | null;
  after_Fiverr_bonus: number | null;
  project_requirements: string | number;
  client_login_info_link: string | null;
  client_login_info_username: string | null;
  client_login_info_password: string | null;
  user_login_info_link: string | null;
  user_login_info_username: string | null;
  user_login_info_password: string | null;
  cpanel_link: string | null;
  cpanel_username: string | null;
  cpanel_password: string | null;
  branch: string | null; // Keep this in interface as it might be present in fetched data, even if not displayed/edited
  department?: Department[];
  team?: Team;
}

// Info Component moved OUTSIDE ProjectsDetail and memoized
const Info = React.memo(({ label, field, value, source, editable = false, onChange }: {
  label?: string;
  field: string;
  value: any;
  source: string;
  editable?: boolean;
  onChange: (field: string, value: string | number, source: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasFocused = useRef(false); // New ref to track if focus has been set

  useEffect(() => {
    // console.log(`Info component for field '${field}': editable changed to ${editable}. hasFocused: ${hasFocused.current}`);
    if (editable && inputRef.current) {
      // Only focus if it's editable AND it hasn't been focused in this editable session yet
      if (!hasFocused.current) {
        // console.log(`Info component for field '${field}': Focusing input for the first time in this editable session.`);
        inputRef.current.focus();
        inputRef.current.select();
        hasFocused.current = true; // Set flag to true
      } else {
        // console.log(`Info component for field '${field}': Input already editable and focused once.`);
      }
    } else if (!editable) {
      // Reset hasFocused when not editable, so it can focus again if it becomes editable later
      // Only reset if the input is not currently focused, to prevent focus loss while typing
      if (hasFocused.current && document.activeElement !== inputRef.current) {
        // console.log(`Info component for field '${field}': Resetting hasFocused flag.`);
        hasFocused.current = false;
      }
    }
  }, [editable]); // Removed 'field' from dependencies as it's static for a given Info instance

  let content;
  let inputType = "text";

  if (field === "rating" || field.includes("amount") || field.includes("bonus") || field.includes("revision")) { // Added bonus to number type
    inputType = "number";
  } else if (field.includes("date")) {
    inputType = "date";
  }

  if (editable) {
    content = (
      <input
        key={field} // Keep key for input element itself
        ref={inputRef}
        type={inputType}
        value={value ?? ""}
        step={field === "rating" ? "0.1" : (inputType === "number" ? "1" : undefined)}
        min={field === "rating" ? "0" : undefined}
        max={field === "rating" ? "5" : undefined}
        onChange={(e) => onChange(field, e.target.value, source)}
        className="font-secondary text-accent w-full rounded border p-2 sm:w-auto"
      />
    );
  } else if (field.includes("_link") && value) {
    content = (
      // Replaced Tippy with simple span + title for tooltip functionality
      <span title={value} className="font-secondary break-words text-blue-500 underline cursor-pointer">
        {value.length > 30 ? `${value.substring(0, 30)}...` : value}
      </span>
    );
  } else if (field === "project_requirements" && value) {
    content = (
      // Replaced Tippy with simple span + title for tooltip functionality
      <span title={value} className="font-secondary text-accent max-w-[200px] cursor-pointer truncate text-base">
        {value.length > 30 ? `${value.substring(0, 30)}...` : value}
      </span>
    );
  } else {
    content = (
      // Replaced Tippy with simple span + title for tooltip functionality
      <span title={value || "-"} className="text-accent font-secondary text-base break-words">
        {value && value.length > 30 ? `${value.substring(0, 30)}...` : value || "-"}
      </span>
    );
  }

  return (
    <div className="border-accent/40 mb-2 flex flex-wrap items-center gap-x-2 border-b pb-2">
      {label && (
        <strong className="text-accent font-secondary text-base whitespace-nowrap">
          {label}:
        </strong>
      )}
      {content}
    </div>
  );
}); // Memoize the Info component

// Simple Loading Component replacement (also moved outside)
const LoadingComponent = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-gray-500">Loading...</p>
    </div>
);

/**
 * useFetchData hook provided by the user
 * @param {string} url - API endpoint
 * @param {string} method - HTTP method (default: "GET")
 * @param {object|null} body - request body (optional)
 * @param {object} options - react-query options like refetchInterval, retry etc.
 */
export function useFetchData(url: string, method = "GET", body: object | null = null, options = {}) {
  const { isLoading: authLoading } = useContext(AuthContext);
  const token = Cookies.get("core");

  const isTokenAvailable = !!token && !authLoading;

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
    } catch (error: any) { // Added any type for error
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "Something went wrong";

      if (status === 401 || status === 403) {
        toast.warning(
          "⚠️ Session expired or unauthorized. Please login again.",
        );
      } else if (status === 404) {
        return { data: [] }; // Return an empty array for 404
      } else {
        toast.error(message);
      }

      throw new Error(message);
    }
  };

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: [url, method, body],
    queryFn: fetchData,
    enabled: isTokenAvailable,
    refetchOnWindowFocus: false,
    retry: false,
    ...options,
  });

  return {
    data,
    loading,
    error: error?.message || null,
    refetch,
  };
}


const ProjectsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false); // For local loading states (save operations)
  
  // Use useFetchData hook to fetch project data
  const { data: fetchedData, loading: fetchLoading, refetch: refetchProject } = useFetchData(
    `https://mtsbackend20-production.up.railway.app/api/project/getall/${id}`
  );

  // Combined state for active editing section for better synchronization
  const [activeEditSection, setActiveEditSection] = useState<'main' | 'client' | 'user' | 'cpanel' | null>(null);

  // Use editedUser as the single source of truth for editable data
  const [editedUser, setEditedUser] = useState<Project | null>(null);

  const loginEditableFields = {
    client: ["client_login_info_link", "client_login_info_username", "client_login_info_password"],
    user: ["user_login_info_link", "user_login_info_username", "user_login_info_password"],
    cpanel: ["cpanel_link", "cpanel_username", "cpanel_password"], // 'branch' field removed from here
  };

  // Initialize user and editedUser states when data is fetched by useFetchData
  useEffect(() => {
    if (fetchedData?.project) {
      const fixedData: Project = {
        ...fetchedData.project,
        rating: parseFloat(parseFloat(fetchedData.project.rating ?? 0).toFixed(1)),
        project_requirements: fetchedData.project.project_requirements ?? ""
      };
      setUser(fixedData);
      setEditedUser(fixedData);
      // console.log("Initial data loaded:", fixedData);
    } else if (fetchedData && !fetchedData.project) {
        // Handle cases where data is fetched but project is null/undefined (e.g., 404 from API)
        setUser(null);
        setEditedUser(null);
    }
  }, [fetchedData]);


  const handleInputChange = useCallback((field: keyof Project | keyof Department | keyof Team, value: string | number, source: string) => {
    // console.log(`handleInputChange called for field: ${String(field)}, value: ${value}, source: ${source}`);
    setEditedUser((prev) => {
      if (!prev) {
        // console.warn("handleInputChange: prev state is null.");
        return null;
      }

      const newEditedUser = { ...prev };

      if (source === "department") {
        if (newEditedUser.department && newEditedUser.department.length > 0) {
          newEditedUser.department = [{ ...newEditedUser.department[0], [field]: value }];
        } else {
          // Fallback: if department array doesn't exist, create a dummy one
          newEditedUser.department = [{ id: 0, department_name: value as string, created_date: "", department_target: null }];
        }
      } else if (source === "team") {
        newEditedUser.team = { ...newEditedUser.team, [field]: value };
      } else {
        // Ensure value is correctly parsed for numbers, especially for empty strings
        if (typeof value === 'string' && (field === "rating" || field.includes("amount") || field.includes("bonus") || field.includes("revision"))) {
            newEditedUser[field as keyof Project] = value === "" ? null : (field === "rating" ? Math.min(5, parseFloat(value || "0")) : parseFloat(value || "0"));
        } else if (field === "project_requirements") { // Handle project_requirements as string
            newEditedUser[field as keyof Project] = value;
        }
        else { // Default handling for other direct fields
            newEditedUser[field as keyof Project] = value;
        }
      }
      // console.log("newEditedUser after update:", newEditedUser);
      return newEditedUser;
    });
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("core");
      const updatedData: Partial<Project> = {};

      editableFields.forEach((field) => {
        if (editedUser && Object.prototype.hasOwnProperty.call(editedUser, field)) {
          // Special handling for nested 'department' and 'team' if they are in editableFields
          if (field === 'department_name') {
            if (editedUser.department?.[0]?.department_name !== user?.department?.[0]?.department_name) {
                // Assuming API expects department_name as a direct field for update
                updatedData.department_name = editedUser.department?.[0]?.department_name;
            }
          } else if (field === 'team_name') {
            if (editedUser.team?.team_name !== user?.team?.team_name) {
                // Assuming API expects team_name as a direct field for update
                updatedData.team_name = editedUser.team?.team_name;
            }
          } else {
            updatedData[field] =
              field === "rating"
                ? parseFloat(parseFloat(editedUser[field] as string ?? "0").toFixed(1))
                : editedUser[field];
          }
        }
      });
      
      console.log("Sending update request for main section with data:", updatedData); // Debugging log
      await axios.put(
        `https://mtsbackend20-production.up.railway.app/api/project/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // After successful save, refetch the project data to ensure UI is updated with latest from backend
      refetchProject(); 
      setActiveEditSection(null); // Exit editing mode for the main section
      toast.success("Project updated successfully!"); // Toast message added
      console.log("Main project updated successfully."); // Debugging log
    } catch (error) {
      console.error("Update error for main section:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to update project. Try again.");
      } else {
        toast.error("Failed to update project. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSectionSave = async (section: 'client' | 'user' | 'cpanel') => {
    try {
      setLoading(true);
      const token = Cookies.get("core");
      const updatedData: Partial<Project> = {};

      loginEditableFields[section].forEach((field) => {
        if (editedUser && Object.prototype.hasOwnProperty.call(editedUser, field)) {
          updatedData[field as keyof Project] = editedUser[field as keyof Project];
        }
      });

      console.log(`Sending update request for ${section} section with data:`, updatedData); // Debugging log
      await axios.put(
        `https://mtsbackend20-production.up.railway.app/api/project/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // After successful save, refetch the project data to ensure UI is updated with latest from backend
      refetchProject(); 
      setActiveEditSection(null); // Exit editing mode for the specific section
      toast.success(`${section === 'client' ? 'Client' : section === 'user' ? 'User' : 'cPanel'} info updated successfully!`); // Toast message added
      console.log(`${section} section updated successfully.`); // Debugging log
    } catch (err) {
      console.error(`Section Update Error for ${section}:`, err);
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Update failed!");
      } else {
        toast.error("Update failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading || loading || !user) return <LoadingComponent />;

  // Define fields that can be edited in the main 'Edit Info' section
  // These are the fields you explicitly mentioned should be editable via the main "Edit Info" button
  const editableFields: string[] = [ 
    "project_name", 
    "bonus", 
    "rating", 
    "order_id", 
    "sheet_link", 
    "order_amount"
  ];
  
  // All fields definition, including their source (user, department, team)
  const allFields = [
    { label: "Project Name", field: "project_name", source: "user" },
    { label: "Total Revision", field: "revision", source: "user" },
    { label: "Order ID", field: "order_id", source: "user" },
    { label: "Sheet Link", field: "sheet_link", source: "user" },
    { label: "Order Amount", field: "order_amount", source: "user" },
    { label: "Bonus", field: "bonus", source: "user" },
    { label: "Rating", field: "rating", source: "user" },
    { label: "Date", field: "date", source: "user" },
    { label: "Ops Status", field: "ops_status", source: "user" },
    { label: "Delivery Last Date", field: "deli_last_date", source: "user" },
    { label: "After Fiverr Amount", field: "after_fiverr_amount", source: "user" },
    { label: "After Fiverr Bonus", field: "after_Fiverr_bonus", source: "user" },
    { label: "Department Name", field: "department_name", source: "department" },
    { label: "Project Requirements", field: "project_requirements", source: "user" },
    { label: "Team Name", field: "team_name", source: "team" },
    // { label: "Branch", field: "branch", source: "user" }, // 'Branch' field removed from here
  ];

  // Group fields for layout purposes
  const groupedFields = [
    allFields.slice(0, 5),
    allFields.slice(5, 10),
    allFields.slice(10, 15) // This slice remains the same, but the content will be fewer if 'Branch' is removed
  ];

  return (
    <div className="bg-background min-h-screen">
      <ToastContainer />
      {/* Top Project Info Section */}
      <section className="py-6 sm:py-8 md:py-12">
        <div className="max-w-9xl bg-card shadow-primary mx-auto w-full rounded-xl p-4 shadow-md sm:p-6 md:p-8">
          <div className="flex flex-col flex-wrap sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-6 sm:mb-0">
              <h2 className="font-primary text-primary py-2 text-xl font-bold sm:text-2xl md:text-3xl">
                {user.project_name}
              </h2>
              <p className="text-accent font-secondary pb-2 text-sm">
                {user.order_id}
              </p>

              {/* Rating Display - NOW USING FASTAR */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => {
                  const currentRating = user.rating !== null && user.rating !== undefined ? user.rating : 0;
                  const fillPercent = Math.min(100, Math.max(0, (currentRating - index) * 100));
                  return (
                    <div key={index} className="relative h-4 w-4 text-base">
                      {/* FaStar for grey background */}
                      <FaStar className="absolute inset-0 text-gray-300" />
                      {/* FaStar for yellow fill with clipPath for partial fill */}
                      <FaStar
                        className="absolute inset-0 text-yellow-400 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - fillPercent}% 0 0)` }}
                      />
                    </div>
                  );
                })}
                <span className="text-accent font-secondary ml-2 text-sm">
                  ({parseFloat(user.rating !== null && user.rating !== undefined ? user.rating.toString() : "0").toFixed(1)})
                </span>
              </div>
            </div>

            {/* Edit Controls for main section */}
            <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row">
              <button
                onClick={() => setActiveEditSection(activeEditSection === 'main' ? null : 'main')}
                className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors"
              >
                {activeEditSection === 'main' ? "Cancel" : "Edit Info"}
              </button>
              {activeEditSection === 'main' && (
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Project Details Display/Edit */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groupedFields.map((group, colIdx) => (
              <div key={`group-${colIdx}`}>
                {group.map(({ label, field, source }) => {
                  let value;
                  if (source === "user") {
                    value = editedUser?.[field as keyof Project];
                  } else if (source === "department") {
                    value = editedUser?.department?.[0]?.[field as keyof Department];
                  } else if (source === "team") {
                    value = editedUser?.team?.[field as keyof Team];
                  }

                  // Determine if the current field is editable based on activeEditSection and editableFields
                  const isFieldEditable = activeEditSection === 'main' && editableFields.includes(field);

                  const infoProps = {
                    label: label,
                    field: field,
                    source: source,
                    value: value,
                    editable: isFieldEditable,
                    onChange: handleInputChange
                  };

                  return (
                    <Info
                      key={field}
                      {...infoProps} // Spreading the props object
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Sections (Client, User, cPanel) */}
      <div className="max-w-9xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          {/* Client Login Section */}
          <div className="bg-background rounded-lg p-4 shadow-md border border-accent/30 min-h-[250px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-bold font-primary text-accent">👤 Client Login Info</h3>
              <button
                onClick={() => setActiveEditSection(activeEditSection === 'client' ? null : 'client')}
                className="px-3 py-1 bg-primary text-white rounded text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                {activeEditSection === 'client' ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="space-y-4">
              {(() => { // Using an IIFE to define props object
                const infoProps = {
                  label: "Login URL",
                  field: "client_login_info_link",
                  source: "user",
                  value: editedUser?.client_login_info_link,
                  editable: activeEditSection === 'client',
                  onChange: handleInputChange
                };
                return <Info {...infoProps} />;
              })()}
              {(() => {
                const infoProps = {
                  label: "Username",
                  field: "client_login_info_username",
                  source: "user",
                  value: editedUser?.client_login_info_username,
                  editable: activeEditSection === 'client',
                  onChange: handleInputChange
                };
                return <Info {...infoProps} />;
              })()}
              {(() => {
                const infoProps = {
                  label: "Password",
                  field: "client_login_info_password",
                  source: "user",
                  value: editedUser?.client_login_info_password,
                  editable: activeEditSection === 'client',
                  onChange: handleInputChange
                };
                return <Info {...infoProps} />;
              })()}
            </div>

            {activeEditSection === 'client' && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleSectionSave('client')}
                  className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition-colors"
                >
                  Save Client Info
                </button>
              </div>
            )}
          </div>

          {/* User Login Section */}
          <div className="bg-background rounded-lg p-4 shadow-md border border-accent/30 min-h-[250px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-bold font-primary text-accent">🔧 Our/User Login Info</h3>
              <button
                onClick={() => setActiveEditSection(activeEditSection === 'user' ? null : 'user')}
                className="px-3 py-1 bg-primary text-white rounded text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                {activeEditSection === 'user' ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="space-y-4">
              {(() => {
                const infoProps = {
                  label: "Login URL",
                  field: "user_login_info_link",
                  source: "user",
                  value: editedUser?.user_login_info_link,
                  editable: activeEditSection === 'user',
                  onChange: handleInputChange
                };
                return <Info {...infoProps} />;
              })()}
              {(() => {
                const infoProps = {
                  label: "Username",
                  field: "user_login_info_username",
                  source: "user",
                  value: editedUser?.user_login_info_username,
                  editable: activeEditSection === 'user',
                  onChange: handleInputChange
                };
                return <Info {...infoProps} />;
              })()}
              {(() => {
                const infoProps = {
                  label: "Password",
                  field: "user_login_info_password",
                  source: "user",
                  value: editedUser?.user_login_info_password,
                  editable: activeEditSection === 'user',
                  onChange: handleInputChange
                };
                return <Info {...infoProps} />;
              })()}
            </div>

            {activeEditSection === 'user' && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleSectionSave('user')}
                  className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition-colors"
                >
                  Save User Info
                </button>
              </div>
            )}
          </div>

          {/* cPanel Section */}
          <div className="bg-background rounded-lg p-4 shadow-md border border-accent/30 min-h-[250px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-bold font-primary text-accent ">📦 cPanel/Hosting Info</h3>
              <button
                onClick={() => setActiveEditSection(activeEditSection === 'cpanel' ? null : 'cpanel')}
                className="px-3 py-1 bg-primary text-white rounded text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                {activeEditSection === 'cpanel' ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="space-y-4 text-accent">
              {(() => {
                const infoProps = {
                  label: "C/H URL",
                  field: "cpanel_link",
                  source: "user",
                  value: editedUser?.cpanel_link,
                  editable: activeEditSection === 'cpanel',
                  onChange: handleInputChange
                };
                return <Info {...infoProps} />;
              })()}
              {(() => {
                const infoProps = {
                  label: "Username",
                  field: "cpanel_username",
                  source: "user",
                  value: editedUser?.cpanel_username,
                  editable: activeEditSection === 'cpanel',
                  onChange: handleInputChange
                };
                return <Info {...infoProps} />;
              })()}
              {(() => {
                const infoProps = {
                  label: "Password",
                  field: "cpanel_password",
                  source: "user",
                  value: editedUser?.cpanel_password,
                  editable: activeEditSection === 'cpanel',
                  onChange: handleInputChange
                };
                return <Info {...infoProps} />;
              })()}
              {/* Branch field removed from here */}
              {/* {(() => {
                const infoProps = {
                  label: "Branch",
                  field: "branch",
                  source: "user",
                  value: editedUser?.branch,
                  editable: activeEditSection === 'cpanel',
                  onChange: handleInputChange
                };
                return <Info {...infoProps} />;
              })()} */}
            </div>

            {activeEditSection === 'cpanel' && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleSectionSave('cpanel')}
                  className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition-colors"
                >
                  Save cPanel Info
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDetail;