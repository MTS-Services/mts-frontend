import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Loading/Loading";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        const res = await axios.get(
          `https://mtsbackend20-production.up.railway.app/api/teamMember/${id}`,
        );
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
        "first_name",
        "last_name",
        "email",
        "number",
        "permanent_address",
        "present_address",
        "gender",
        "blood_group",
        "relationship",
        "education",
        "guardian_relation",
        "guardian_number",
        "guardian_address",
        "religion",
        "role",
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filteredData),
        },
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
      setMessage("An error occurred while saving the data. Please try again.");
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

  const Info = ({ label, field, value, editable = false, onChange }) => (
    <p className="text-accent font-secondary border-accent/20 mb-2 flex items-center border-b pr-1 pb-1 text-base font-light">
      <strong className="pr-1">{label}:</strong>
      {editable ? (
        <input
          type="text"
          value={editedUser[field] || ""}
          onChange={(e) => onChange(field, e.target.value)}
          className="rounded-md border p-1"
        />
      ) : (
        value
      )}
    </p>
  );

  return (
    <section className="py-8 lg:py-12">
      <div className="bg-card shadow-primary mx-auto max-w-6xl rounded-xl p-8 shadow-md">
        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row">
            <img
              className="shadow-box-style h-20 w-20 rounded-full"
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
              className="text-background bg-primary rounded-full px-6 py-2 text-base font-bold shadow-md transition-all hover:scale-105"
            >
              {isEditing ? "Cancel" : "Edit User Info"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="text-background bg-primary rounded-full px-6 py-2 text-base font-bold shadow-md transition-all hover:scale-105"
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
            <h3 className="font-primary border-accent/40 text-primary mb-4 border-b pb-1 text-2xl text-shadow-md">
              Personal Info
            </h3>
            {[
              "Email",
              "Number",
              "Present Address",
              "Permanent Address",
              "Gender",
              "Blood Group",
              "relationship",
              "Education",
              "Religion",
            ].map((label) => (
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
            <h3 className="font-primary border-accent/40 text-primary mb-4 border-b pb-1 text-2xl text-shadow-md">
              Work Details
            </h3>
            {[
              "Department_name",
              "Role",
              "Location",
              "Manager",
              "Status",
              "Joined",
              "Last Login",
              "Access Level",
            ].map((label) => (
              <Info
                key={label}
                label={label}
                field={label.toLowerCase().replace(/ /g, "_")}
                value={user[label.toLowerCase().replace(/ /g, "_")]}
                editable={
                  isEditing &&
                  label !== "Department_name" &&
                  label !== "Joined" &&
                  label !== "Last Login"
                }
                onChange={handleInputChange}
              />
            ))}
          </div>

          <div>
            <h3 className="font-primary border-accent/40 text-primary mb-4 border-b pb-1 text-2xl text-shadow-md">
              Guardian Info
            </h3>
            {["Guardian Relation", "Guardian Number", "Guardian Address"].map(
              (label) => (
                <Info
                  key={label}
                  label={label}
                  field={label.toLowerCase().replace(/ /g, "_")}
                  value={user[label.toLowerCase().replace(/ /g, "_")]}
                  editable={isEditing}
                  onChange={handleInputChange}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInformation;
