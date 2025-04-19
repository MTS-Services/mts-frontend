import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Loading/Loading";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserInformation = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://192.168.10.47:3000/api/teamMember/${id}`);
        const fetchedUser = res.data.teamMember;

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
          
          status: fetchedUser.status || "Active",
          joined: fetchedUser.joining_date || "N/A",
          last_login: fetchedUser.last_login || "N/A",
          access_level: fetchedUser.access_level || "User",
        };

        setUser(userData);
        setEditedUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const allowedFields = [
        "first_name", "last_name", "email", "number",
        "permanent_address", "present_address", "gender",
        "blood_group", "relationship", "education", "guardian_relation",
        "guardian_number", "guardian_address", "religion",
        "role"
      ];

      const filteredData = {};
      for (const key of allowedFields) {
        if (key in editedUser) {
          filteredData[key] = editedUser[key];
        }
      }

      const response = await fetch(`http://192.168.10.47:3000/api/teamMember/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredData),
      });

      if (response.ok) {
  setUser({ ...user, ...filteredData });
  setIsEditing(false);
  toast.success("User information updated successfully!");
} else {
  toast.error("Failed to update user information. Please try again.");
}


    } catch (error) {
      console.error("Save error", error);
      setMessage("An error occurred while saving the data. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl text-accent"><Loading /></div>;
  }

  if (!user) {
    return <div className="text-center mt-10 text-red-500">Data not found</div>;
  }

  const Info = ({ label, field, value, editable = false, onChange }) => (
    <p className="text-base font-light text-accent mb-2 pr-1 font-secondary border-b pb-1 border-accent/20 flex items-center">
      <strong className="pr-1">{label}:</strong>
      {editable ? (
        <input
          type="text"
          value={editedUser[field] || ""}
          onChange={(e) => onChange(field, e.target.value)}
          className="border p-1 rounded-md"
        />
      ) : (
        value
      )}
    </p>
  );

  return (
    <section className="min-h-screen p-10">
      <div className="max-w-6xl mx-auto bg-card p-8 rounded-xl shadow-md shadow-primary">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <img
              className="w-20 h-20 shadow-box-style rounded-full"
              src={user.dp || "/assits/Rewardspage/profileImg.jpg"}
              alt="avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assits/Rewardspage/profileImg.jpg";
              }}
            />
            <div>
              <h2 className="text-2xl font-primary text-primary text-shadow-md">
                {user.first_name} <span>{user.last_name}</span>
              </h2>
              <p className="text-accent text-sm capitalize font-secondary">{user.role}</p>
            </div>
          </div>

          <div className="flex justify-center flex-wrap gap-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="py-2 px-6 text-background text-base font-bold rounded-full bg-primary shadow-md hover:scale-105 transition-all"
            >
              {isEditing ? "Cancel" : "Edit User Info"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="py-2 px-6 text-background text-base font-bold rounded-full bg-primary shadow-md hover:scale-105 transition-all"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {message && (
          <div className={`text-center mt-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </div>
        )}





        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
          <div>
            <h3 className="text-2xl font-primary border-b pb-1 border-accent/40 text-primary text-shadow-md mb-4">
              Personal Info
            </h3>
            {["Email", "Number", "Present Address", "Permanent Address", "Gender", "Blood Group", "relationship", "Education", "Religion"].map((label) => (
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
            <h3 className="text-2xl font-primary border-b pb-1 border-accent/40 text-primary text-shadow-md mb-4">
              Work Details
            </h3>
            {["Department_name", "Role", "Location", "Manager", "Status", "Joined", "Last Login", "Access Level"].map((label) => (
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

          <div>
            <h3 className="text-2xl font-primary border-b pb-1 border-accent/40 text-primary text-shadow-md mb-4">
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

export default UserInformation;
