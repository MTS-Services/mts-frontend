import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";  // Import the Cookies library
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading/Loading";

const UserProfileComponent = () => {
  const { id } = useParams();  // Get user ID from URL params
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  // Authorization token stored in cookies
  const token = Cookies.get("core");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setMessage("");  // Clear previous message
      try {
        // Authorization header with Bearer token
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Use token for authorization
        };

        const res = await axios.get(
          `https://mtsbackend20-production.up.railway.app/api/teamMember/${id}`,
          { headers }  // Pass the authorization header
        );

        const fetchedUser = res.data.teamMember;

        // Normalize the user data
        const userData = {
          dp: fetchedUser.dp || "/default.jpg",
          first_name: fetchedUser.first_name || "",
          last_name: fetchedUser.last_name || "",
          email: fetchedUser.email || "",
          number: fetchedUser.number || "",
          permanent_address: fetchedUser.permanent_address || "",
          present_address: fetchedUser.present_address || "",
          gender: fetchedUser.gender || "",
          blood_group: fetchedUser.blood_group || "",
          relationship: fetchedUser.relationship || "",
          education: fetchedUser.education || "",
          guardian_relation: fetchedUser.guardian_relation || "",
          guardian_number: fetchedUser.guardian_number || "",
          guardian_address: fetchedUser.guardian_address || "",
          religion: fetchedUser.religion || "",
          department_name: fetchedUser?.team?.department?.department_name || "",
          role: fetchedUser.role || "N/A",
          // status: fetchedUser.status || "Active",
          // joined: fetchedUser.joining_date || "N/A",
          // last_login: fetchedUser.last_login || "N/A",
          // access_level: fetchedUser.access_level || "User",
        };

        console.log("this is a testing data in the fild and user ",userData)
        setUser(userData);
        setEditedUser(userData);  // Initialize the edited user data
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Error fetching user details. Please try again.");
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchUserData();
  }, [id, token]);  // Re-fetch data when `id` or `token` changes

  const handleInputChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const allowedFields = [
        "first_name", "last_name", "email", "number", "permanent_address",
        "present_address", "gender", "blood_group", "relationship", "education",
        "guardian_relation", "guardian_number", "guardian_address", "religion", "role",
      ];

      const filteredData = {};
      for (const key of allowedFields) {
        if (key in editedUser) {
          filteredData[key] = editedUser[key];
        }
      }

      const response = await fetch(
        `https://mtsbackend20-production.up.railway.app/api/teamMember/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  // Authorization with Bearer token
          },
          body: JSON.stringify(filteredData),
        }
      );

      if (response.ok) {
        setUser({ ...user, ...filteredData });
        setIsEditing(false);
        toast.success("User information updated successfully!");
      } else {
        toast.error("Failed to update user information. Please try again.");
      }
    } catch (error) {
      console.error("Save error", error);
      toast.error("An error occurred while saving the data. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-accent mt-10 text-center text-xl">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return <div className="mt-10 text-center text-red-500">Data not found</div>;
  }

//   const Info = ({ label, field, value, editable = false, onChange }) => (
//     <p className="text-accent font-secondary border-accent/20 mb-2  flex items-center border-b pr-1  pb-2 text-xl font-light">
//       <strong className="pr-1 font-primary text-base text-xl">{label}:</strong>
//       {editable ? (
//         // <input
//         //   type="text"
//         //   value={editedUser[field] || ""}
//         //   onChange={(e) => onChange(field, e.target.value)}
//         //   className="rounded-md border p-1 font-secondary"
//         // />


// <input
//   type="text"
//   name={field}
//   autoComplete="off"
//   value={editedUser?.[field] ?? ""}
//   onChange={(e) => {
//     e.stopPropagation(); // 🛑 Prevent parent focus loss
//     onChange(field, e.target.value);
//   }}
//   className="rounded-md border p-1 font-secondary w-full bg-background focus:outline-none"
// />


//       ) : (
//         value
//       )}
//     </p>
//   );
// munshi coding test 

const Info = ({ label, field, value, editable = false, onChange }) => (
  <div className="flex flex-wrap items-start border-b border-accent/20 pb-2 mb-2">
    {/* Label */}
    <strong className="text-base text-accent font-primary mr-2 whitespace-nowrap">
      {label}:
    </strong>

    {/* Value */}
    {editable ? (
      <input
        type="text"
        name={field}
        autoComplete="off"
        value={editedUser?.[field] ?? ""}
        onChange={(e) => onChange(field, e.target.value)}
        className="text-base rounded-md border p-1 font-secondary w-full sm:w-auto bg-background focus:outline-none"
      />
    ) : (
      <span className="text-base text-accent break-words whitespace-normal font-secondary">
        {value}
      </span>
    )}
  </div>
);





  return (
    <section className="py-8 lg:py-12">
      <div className="bg-card shadow-primary mx-auto max-w-6xl rounded-xl p-8 shadow-md">
        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row">
            <img
              className="shadow-box-style  object-cover object-center p-1 h-30 w-30 border border-primary rounded-full"
              src={user.dp || "/assits/Rewardspage/profileImg.jpg"}
              alt="avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assits/Rewardspage/profileImg.jpg";
              }}
            />
            <div>
              <h2 className="font-primary text-primary text-xl text-shadow-md md:text-2xl">
                {user.first_name} <span>{user.last_name}</span>
              </h2>
              <p className="text-accent font-secondary text-sm capitalize">
                {user.role}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center relative py-2 px-6 sm:px-8 md:px-10 lg:px-12 text-background text-base sm:text-lg font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out font-primary before:z-[-1] before:rounded-full hover:before:left-0"
            >
              {isEditing ? "Cancel" : "Edit User Info"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="flex items-center relative py-2 px-6 sm:px-8 md:px-10 lg:px-12 text-background text-base sm:text-lg font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 font-primary before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {message && (
          <div
            className={`mt-4 text-center ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}
          >
            {message}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-primary border-accent/40 text-primary mb-4 border-b pb-1 uppercase text-2xl text-shadow-md">
              Personal Info
            </h3>
            {["Email", "Number", "Present Address", "Permanent Address", "Gender", "Blood Group", "relationship", "Religion"].map((label) => (
              <Info 
                key={label}
                label={label}
                field={label.toLowerCase().replace(/ /g, "_")}
                value={user[label.toLowerCase().replace(/ /g, "_")]}
                editable={isEditing}
                onChange={handleInputChange}
              />
            ))}
          </div>

          <div>
            <h3 className="font-primary border-accent/40 text-primary mb-4 border-b pb-1 text-2xl uppercase  text-shadow-md">
              Work Details
            </h3>
          <div className="text-2xl">
              
            {["Department_name", "Role", "Education"].map((label) => (
              <Info
                key={label}
                label={label}
                field={label.toLowerCase().replace(/ /g, "_")}
                value={user[label.toLowerCase().replace(/ /g, "_")]}
                editable={isEditing && label !== "Department_name" && label !== "Joined" && label !== "Last Login"}
                onChange={handleInputChange}
              />
            ))}
          </div>
          </div>

         <div className="">
  <h3 className="font-primary uppercase border-accent/40 text-primary mb-4 border-b pb-1 text-2xl text-shadow-md">
    Guardian Info
  </h3>
  {["Guardian Relation", "Guardian Number", "Guardian Address"].map((label) => (
    <Info
      key={label}
      label={label}
      field={label.toLowerCase().replace(/ /g, "_")}
      value={user[label.toLowerCase().replace(/ /g, "_")]}
      editable={isEditing}
      onChange={handleInputChange}
    />
  ))}
</div>


        </div>
      </div>
    </section>
  );
};





export default UserProfileComponent;
