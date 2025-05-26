// import axios from "axios";
// import Cookies from "js-cookie";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query"; // Import useQuery
// import { useContext } from "react"; // Import useContext
// import { AuthContext } from "../context/AuthProvider"; // Assuming AuthContext path

// // Re-added imports for design and loading component
// import Tippy from "@tippyjs/react";
// import { FaStar } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";
// import "tippy.js/dist/tippy.css";
// import Loading from "../../../components/Loading/Loading";


// // Define interfaces for better type safety and understanding of data structure
// interface Department {
//   id: number;
//   department_name: string;
//   created_date: string;
//   department_target: number | null;
// }

// interface Team {
//   team_name?: string;
// }

// interface Project {
//   id: number;
//   created_date: string;
//   profile_name: string;
//   order_amount: number | null;
//   bonus_amount: number | null;
//   order_count: number | null;
//   rank: number | null;
//   cancel_count: number | null;
//   complete_count: number | null;
//   no_rating: number | null;
//   profile_target: number | null;
//   department_id: number | null;
//   repeat_order: number | null;
//   total_rating: number | null;
//   project_name: string;
//   revision: number | null;
//   order_id: string;
//   sheet_link: string;
//   bonus: number | null;
//   rating: number | null;
//   date: string;
//   ops_status: string;
//   deli_last_date: string;
//   after_fiverr_amount: number | null;
//   after_Fiverr_bonus: number | null;
//   project_requirements: string | number;
//   client_login_info_link: string | null;
//   client_login_info_username: string | null;
//   client_login_info_password: string | null;
//   user_login_info_link: string | null;
//   user_login_info_username: string | null;
//   user_login_info_password: string | null;
//   cpanel_link: string | null;
//   cpanel_username: string | null;
//   cpanel_password: string | null;
//   branch: string | null;
//   department?: Department[];
//   team?: Team;
// }

// // Info Component moved OUTSIDE ProjectsDetail and memoized
// const Info = React.memo(({ label, field, value, source, editable = false, onChange }: {
//   label?: string;
//   field: string;
//   value: any;
//   source: string;
//   editable?: boolean;
//   onChange: (field: string, value: string | number, source: string) => void;
// }) => {
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (editable && inputRef.current) {
//       // Only focus if the input isn't already focused
//       if (document.activeElement !== inputRef.current) {
//         inputRef.current.focus();
//         // Select all text in the input field when it gains focus
//         inputRef.current.select();
//       }
//     }
//   }, [editable, value]); // Added 'value' to dependencies

//   let content;
//   let inputType = "text";

//   if (field === "rating" || field.includes("amount") || field.includes("bonus") || field.includes("revision")) { // Added bonus to number type
//     inputType = "number";
//   } else if (field.includes("date")) {
//     inputType = "date";
//   }

//   if (editable) {
//     content = (
//       <input
//         key={field} // Keep key for input element itself
//         ref={inputRef}
//         type={inputType}
//         value={value ?? ""} // Use nullish coalescing to ensure controlled input is never undefined
//         step={field === "rating" ? "0.1" : (inputType === "number" ? "1" : undefined)}
//         min={field === "rating" ? "0" : undefined}
//         max={field === "rating" ? "5" : undefined}
//         onChange={(e) => onChange(field, e.target.value, source)} // Pass source to handleInputChange
//         className="font-secondary text-accent w-full rounded border p-2 sm:w-auto"
//       />
//     );
//   } else if (field.includes("_link") && value) {
//     content = (
//       <Tippy content={value} placement="bottom">
//         <a
//           href={value}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="font-secondary break-words text-blue-500 underline"
//         >
//           {value.length > 30 ? `${value.substring(0, 30)}...` : value}
//         </a>
//       </Tippy>
//     );
//   } else if (field === "project_requirements" && value) {
//     content = (
//       <Tippy content={value} placement="bottom">
//         <span className="font-secondary text-accent max-w-[200px] cursor-pointer truncate text-base">
//           {value.length > 30 ? `${value.substring(0, 30)}...` : value}
//         </span>
//       </Tippy>
//     );
//   } else {
//     content = (
//       <Tippy content={value || "-"} placement="bottom">
//         <span className="text-accent font-secondary text-base break-words">
//           {value && value.length > 30 ? `${value.substring(0, 30)}...` : value || "-"}
//         </span>
//       </Tippy>
//     );
//   }

//   return (
//     <div className="border-accent/40 mb-2 flex flex-wrap items-center gap-x-2 border-b pb-2">
//       {label && (
//         <strong className="text-accent font-secondary text-base whitespace-nowrap">
//           {label}:
//         </strong>
//       )}
//       {content}
//     </div>
//   );
// }); // Memoize the Info component


// /**
//  * useFetchData hook provided by the user
//  * @param {string} url - API endpoint
//  * @param {string} method - HTTP method (default: "GET")
//  * @param {object|null} body - request body (optional)
//  * @param {object} options - react-query options like refetchInterval, retry etc.
//  */
// export function useFetchData(url: string, method = "GET", body: object | null = null, options = {}) {
//   const { isLoading: authLoading } = useContext(AuthContext);
//   const token = Cookies.get("core");

//   const isTokenAvailable = !!token && !authLoading;

//   const fetchData = async () => {
//     const headers = {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     };

//     try {
//       const response = await axios(url, {
//         method,
//         headers,
//         ...(body && { data: body }),
//       });

//       return response.data;
//     } catch (error: any) { // Added any type for error
//       const status = error?.response?.status;
//       const message = error?.response?.data?.message || "Something went wrong";

//       if (status === 401 || status === 403) {
//         toast.warning(
//           "⚠️ Session expired or unauthorized. Please login again.",
//         );
//       } else if (status === 404) {
//         return { data: [] }; // Return an empty array for 404
//       } else {
//         toast.error(message);
//       }

//       throw new Error(message);
//     }
//   };

//   const {
//     data,
//     isLoading: loading,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: [url, method, body],
//     queryFn: fetchData,
//     enabled: isTokenAvailable,
//     refetchOnWindowFocus: false,
//     retry: false,
//     ...options,
//   });

//   return {
//     data,
//     loading,
//     error: error?.message || null,
//     refetch,
//   };
// }


// const ProjectsDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const [user, setUser] = useState<Project | null>(null);
//   const [loading, setLoading] = useState(false); // For local loading states (save operations)
  
//   // Reverted to separate editing states
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedUser, setEditedUser] = useState<Project | null>(null);

//   const [isEditingClient, setIsEditingClient] = useState(false);
//   const [isEditingUser, setIsEditingUser] = useState(false);
//   const [isEditingCpanel, setIsEditingCpanel] = useState(false);


//   const loginEditableFields = {
//     client: ["client_login_info_link", "client_login_info_username", "client_login_info_password"],
//     user: ["user_login_info_link", "user_login_info_username", "user_login_info_password"],
//     cpanel: ["cpanel_link", "cpanel_username", "cpanel_password", "branch"],
//   };

//   // Use useFetchData hook to fetch project data
//   const { data: fetchedData, loading: fetchLoading, refetch: refetchProject } = useFetchData(
//     `https://mtsbackend20-production.up.railway.app/api/project/getall/${id}`
//   );

//   // Initialize user and editedUser states when data is fetched by useFetchData
//   useEffect(() => {
//     if (fetchedData?.project) {
//       const fixedData: Project = {
//         ...fetchedData.project,
//         rating: parseFloat(parseFloat(fetchedData.project.rating ?? 0).toFixed(1)),
//         project_requirements: fetchedData.project.project_requirements ?? ""
//       };
//       setUser(fixedData);
//       setEditedUser(fixedData);
//       // console.log("Initial data loaded:", fixedData);
//     } else if (fetchedData && !fetchedData.project) {
//         // Handle cases where data is fetched but project is null/undefined (e.g., 404 from API)
//         setUser(null);
//         setEditedUser(null);
//     }
//   }, [fetchedData]);


//   // Updated handleInputChange for all editable fields
//   const handleInputChange = useCallback((field: keyof Project | keyof Department | keyof Team, value: string | number, source: string) => {
//     setEditedUser((prev) => {
//       // Defensive check: If prev is null, return null to prevent errors
//       if (!prev) return null;

//       // Create a new object to ensure immutability
//       const newEditedUser = { ...prev };

//       // Handle nested properties if they exist (though your current setup uses flat properties for editing)
//       // This is a more robust way to handle potential nested structures for future expansion
//       if (source === "department") {
//         if (newEditedUser.department && newEditedUser.department.length > 0) {
//           newEditedUser.department = [{ ...newEditedUser.department[0], [field]: value }];
//         } else {
//           // Fallback: if department array doesn't exist, create a dummy one
//           newEditedUser.department = [{ id: 0, department_name: value as string, created_date: "", department_target: null }];
//         }
//       } else if (source === "team") {
//         newEditedUser.team = { ...newEditedUser.team, [field]: value };
//       } else {
//         // For 'user' source or direct properties, update directly
//         // Special handling for rating to ensure it's a number and capped at 5
//         if (field === "rating") {
//           newEditedUser[field as keyof Project] = Math.min(5, parseFloat(value as string || "0"));
//         } else if (field === "project_requirements") {
//           newEditedUser[field as keyof Project] = value;
//         } else if (typeof value === 'string' && (field.includes("amount") || field.includes("bonus") || field.includes("revision"))) {
//           newEditedUser[field as keyof Project] = value === "" ? null : parseFloat(value || "0");
//         }
//         else {
//           newEditedUser[field as keyof Project] = value;
//         }
//       }
//       return newEditedUser;
//     });
//   }, []); // No dependencies needed when using functional update form of setEditedUser


//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       const token = Cookies.get("core");
//       const updatedData: Partial<Project> = {};
      
//       // Collect only the fields that are meant to be editable and belong to the 'user' source
//       editableFields.forEach((field) => {
//         if (editedUser && Object.prototype.hasOwnProperty.call(editedUser, field)) {
//           updatedData[field] =
//             field === "rating"
//               ? parseFloat(parseFloat(editedUser[field] as string ?? "0").toFixed(1))
//               : editedUser[field];
//         }
//       });

//       console.log("Sending update request for main section with data:", updatedData); // Debugging log
//       await axios.put(
//         `https://mtsbackend20-production.up.railway.app/api/project/${id}`,
//         updatedData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       // After successful save, refetch the project data to ensure UI is updated with latest from backend
//       refetchProject(); 
//       setIsEditing(false); // Exit editing mode for the main section
//       toast.success("Project updated successfully!"); // Toast message added
//       console.log("Main project updated successfully."); // Debugging log
//     } catch (error) {
//       console.error("Update error for main section:", error);
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || "Failed to update project. Try again.");
//       } else {
//         toast.error("Failed to update project. Try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSectionSave = async (section: 'client' | 'user' | 'cpanel', toggleEdit: React.Dispatch<React.SetStateAction<boolean>>) => {
//     try {
//       setLoading(true);
//       const token = Cookies.get("core");
//       const updatedData: Partial<Project> = {};

//       loginEditableFields[section].forEach((field) => {
//         if (editedUser && Object.prototype.hasOwnProperty.call(editedUser, field)) {
//           updatedData[field as keyof Project] = editedUser[field as keyof Project];
//         }
//       });

//       console.log(`Sending update request for ${section} section with data:`, updatedData); // Debugging log
//       await axios.put(
//         `https://mtsbackend20-production.up.railway.app/api/project/${id}`,
//         updatedData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // After successful save, refetch the project data to ensure UI is updated with latest from backend
//       refetchProject(); 
//       toggleEdit(false); // Exit editing mode for the specific section
//       toast.success(`${section === 'client' ? 'Client' : section === 'user' ? 'User' : 'cPanel'} info updated successfully!`); // Toast message added
//       console.log(`${section} section updated successfully.`); // Debugging log
//     } catch (err) {
//       console.error(`Section Update Error for ${section}:`, err);
//       if (axios.isAxiosError(err)) {
//         toast.error(err.response?.data?.message || "Update failed!");
//       } else {
//         toast.error("Update failed!");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetchLoading || loading || !user) return <Loading />; // Using imported Loading component

//   // Define fields that can be edited in the main 'Edit Info' section
//   // These are the fields you explicitly mentioned should be editable via the main "Edit Info" button
//   const editableFields: string[] = [ 
//     "project_name", 
//     "bonus", 
//     "rating", 
//     "order_id", 
//     "sheet_link", 
//     "order_amount"
//   ];
  
//   // All fields definition, including their source (user, department, team)
//   const allFields = [
//     { label: "Project Name", field: "project_name", source: "user" },
//     { label: "Total Revision", field: "revision", source: "user" },
//     { label: "Order ID", field: "order_id", source: "user" },
//     { label: "Sheet Link", field: "sheet_link", source: "user" },
//     { label: "Order Amount", field: "order_amount", source: "user" },
//     { label: "Bonus", field: "bonus", source: "user" },
//     { label: "Rating", field: "rating", source: "user" },
//     { label: "Date", field: "date", source: "user" },
//     { label: "Ops Status", field: "ops_status", source: "user" },
//     { label: "Delivery Last Date", field: "deli_last_date", source: "user" },
//     { label: "After Fiverr Amount", field: "after_fiverr_amount", source: "user" },
//     { label: "After Fiverr Bonus", field: "after_Fiverr_bonus", source: "user" },
//     { label: "Department Name", field: "department_name", source: "department" },
//     { label: "Project Requirements", field: "project_requirements", source: "user" }, // Changed source to "user" as per your right code snippet
//     { label: "Team Name", field: "team_name", source: "team" },
//   ];

//   // Group fields for layout purposes
//   const groupedFields = [
//     allFields.slice(0, 5),
//     allFields.slice(5, 10),
//     allFields.slice(10, 15) // Adjusted slice end to cover all 15 fields
//   ];

//   return (
//     <div className="bg-primary min-h-screen"> {/* Reverted to bg-primary */}
//       <ToastContainer />
//       {/* Top Project Info Section */}
//       <section className="py-6 sm:py-8 md:py-12">
//         <div className="max-w-9xl bg-card shadow-primary mx-auto w-full rounded-xl p-4 shadow-md sm:p-6 md:p-8"> {/* Reverted to bg-card, shadow-primary */}
//           <div className="flex flex-col flex-wrap sm:flex-row sm:items-center sm:justify-between">
//             <div className="mb-6 sm:mb-0">
//               <h2 className="font-primary text-primary py-2 text-xl font-bold sm:text-2xl md:text-3xl"> {/* Reverted to text-primary */}
//                 {user.project_name}
//               </h2>
//               <p className="text-accent font-secondary pb-2 text-sm"> {/* Reverted to text-accent */}
//                 {user.order_id}
//               </p>

//               {/* Rating Display */}
//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, index) => {
//                   const currentRating = user.rating !== null && user.rating !== undefined ? user.rating : 0;
//                   const fillPercent = Math.min(100, Math.max(0, (currentRating - index) * 100));
//                   return (
//                     <div key={index} className="relative h-4 w-4 text-base">
//                       <FaStar className="absolute inset-0 text-gray-300" /> {/* Using FaStar */}
//                       <FaStar
//                         className="absolute inset-0 text-yellow-400"
//                         style={{ clipPath: `inset(0 ${100 - fillPercent}% 0 0)` }}
//                       />
//                     </div>
//                   );
//                 })}
//                 <span className="text-accent font-secondary ml-2 text-sm"> {/* Reverted to text-accent */}
//                   ({parseFloat(user.rating !== null && user.rating !== undefined ? user.rating.toString() : "0").toFixed(1)})
//                 </span>
//               </div>
//             </div>

//             {/* Edit Controls for main section */}
//             <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row">
//               <button
//                 onClick={() => setIsEditing(!isEditing)}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors"
//               >
//                 {isEditing ? "Cancel" : "Edit Info"}
//               </button>
//               {isEditing && (
//                 <button
//                   onClick={handleSave}
//                   className="px-6 py-2 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors"
//                 >
//                   Save Changes
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Project Details Display/Edit */}
//           <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {groupedFields.map((group, colIdx) => (
//               <div key={`group-${colIdx}`}>
//                 {group.map(({ label, field, source }) => {
//                   let value;
//                   if (source === "user") {
//                     value = editedUser?.[field as keyof Project];
//                   } else if (source === "department") {
//                     value = editedUser?.department?.[0]?.[field as keyof Department];
//                   } else if (source === "team") {
//                     value = editedUser?.team?.[field as keyof Team];
//                   }

//                   // Determine if the current field is editable based on isEditing and editableFields
//                   const isFieldEditable = isEditing && editableFields.includes(field);

//                   return (
//                     <Info
//                       key={field}
//                       label={label}
//                       field={field}
//                       source={source}
//                       value={value}
//                       editable={isFieldEditable}
//                       onChange={handleInputChange}
//                     />
//                   );
//                 })}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Login Sections (Client, User, cPanel) */}
//       <div className="max-w-9xl mx-auto px-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
//           {/* Client Login Section */}
//           <div className="bg-background rounded-lg p-4 shadow-md border border-accent/30 min-h-[250px]"> {/* Reverted to bg-background, border-accent/30 */}
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg sm:text-xl font-bold font-primary text-accent">👤 Client Login Info</h3> {/* Reverted to text-accent */}
//               <button
//                 onClick={() => setIsEditingClient(!isEditingClient)}
//                 className="px-3 py-1 bg-primary text-white rounded text-sm font-bold hover:bg-primary/90 transition-colors"
//               >
//                 {isEditingClient ? "Cancel" : "Edit"}
//               </button>
//             </div>

//             <div className="space-y-4">
//               <Info
//                 label="Login URL"
//                 field="client_login_info_link"
//                 source="user" // Specify source
//                 value={editedUser?.client_login_info_link}
//                 editable={isEditingClient}
//                 onChange={handleInputChange}
//               />
//               <Info
//                 label="Username"
//                 field="client_login_info_username"
//                 source="user" // Specify source
//                 value={editedUser?.client_login_info_username}
//                 editable={isEditingClient}
//                 onChange={handleInputChange}
//               />
//               <Info
//                 label="Password"
//                 field="client_login_info_password"
//                 source="user" // Specify source
//                 value={editedUser?.client_login_info_password}
//                 editable={isEditingClient}
//                 onChange={handleInputChange}
//               />
//             </div>

//             {isEditingClient && (
//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={() => handleSectionSave('client', setIsEditingClient)}
//                   className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition-colors"
//                 >
//                   Save Client Info
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* User Login Section */}
//           <div className="bg-background rounded-lg p-4 shadow-md border border-accent/30 min-h-[250px]"> {/* Reverted to bg-background, border-accent/30 */}
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg sm:text-xl font-bold font-primary text-accent">🔧 Our/User Login Info</h3> {/* Reverted to text-accent */}
//               <button
//                 onClick={() => setIsEditingUser(!isEditingUser)}
//                 className="px-3 py-1 bg-primary text-white rounded text-sm font-bold hover:bg-primary/90 transition-colors"
//               >
//                 {isEditingUser ? "Cancel" : "Edit"}
//               </button>
//             </div>

//             <div className="space-y-4">
//               <Info
//                 label="Login URL"
//                 field="user_login_info_link"
//                 source="user" // Specify source
//                 value={editedUser?.user_login_info_link}
//                 editable={isEditingUser}
//                 onChange={handleInputChange}
//               />
//               <Info
//                 label="Username"
//                 field="user_login_info_username"
//                 source="user" // Specify source
//                 value={editedUser?.user_login_info_username}
//                 editable={isEditingUser}
//                 onChange={handleInputChange}
//               />
//               <Info
//                 label="Password"
//                 field="user_login_info_password"
//                 source="user" // Specify source
//                 value={editedUser?.user_login_info_password}
//                 editable={isEditingUser}
//                 onChange={handleInputChange}
//               />
//             </div>

//             {isEditingUser && (
//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={() => handleSectionSave('user', setIsEditingUser)}
//                   className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition-colors"
//                 >
//                   Save User Info
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* cPanel Section */}
//           <div className="bg-background rounded-lg p-4 shadow-md border border-accent/30 min-h-[250px]"> {/* Reverted to bg-background, border-accent/30 */}
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg sm:text-xl font-bold font-primary text-accent ">📦 cPanel/Hosting Info</h3> {/* Reverted to text-accent */}
//               <button
//                 onClick={() => setIsEditingCpanel(!isEditingCpanel)}
//                 className="px-3 py-1 bg-primary text-white rounded text-sm font-bold hover:bg-primary/90 transition-colors"
//               >
//                 {isEditingCpanel ? "Cancel" : "Edit"}
//               </button>
//             </div>

//             <div className="space-y-4 text-accent"> {/* Reverted to text-accent */}
//               <Info 
//                 label="C/H URL"
//                 field="cpanel_link"
//                 source="user" // Specify source
//                 value={editedUser?.cpanel_link}
//                 editable={isEditingCpanel}
//                 onChange={handleInputChange}
//               />
//               <Info
//                 label="Username"
//                 field="cpanel_username"
//                 source="user" // Specify source
//                 value={editedUser?.cpanel_username}
//                 editable={isEditingCpanel}
//                 onChange={handleInputChange}
//               />
//               <Info
//                 label="Password"
//                 field="cpanel_password"
//                 source="user" // Specify source
//                 value={editedUser?.cpanel_password}
//                 editable={isEditingCpanel}
//                 onChange={handleInputChange}
//               />
//               <Info
//                 label="Branch"
//                 field="branch"
//                 source="user" // Specify source
//                 value={editedUser?.branch}
//                 editable={isEditingCpanel}
//                 onChange={handleInputChange}
//               />
//             </div>

//             {isEditingCpanel && (
//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={() => handleSectionSave('cpanel', setIsEditingCpanel)}
//                   className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition-colors"
//                 >
//                   Save cPanel Info
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectsDetail;
