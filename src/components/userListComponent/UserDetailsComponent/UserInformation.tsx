import axios from "axios";
import React, { useEffect, useState, useRef, memo } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Loading from "../../Loading/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Info Component (আলাদাভাবে সংজ্ঞায়িত এবং memoized)
const Info = memo(({ label, field, value, editable = false, onChange, editedUser }) => {
  const inputRef = useRef(null);

  // Effect to focus input when it becomes editable
  useEffect(() => {
    console.log(`[Info Component - ${field}] useEffect triggered. Editable: ${editable}, Current ref:`, inputRef.current);
    if (editable && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
      console.log(`[Info Component - ${field}] Input focused and selected.`);
    }
  }, [editable, field]); // Dependency on 'field' to re-focus if field changes

  // Console log for rendering Info component
  console.log(`[Info Component - ${field}] Rendering with value: "${value}", editedUser value: "${editedUser?.[field] ?? ""}", Editable: ${editable}`);


  let inputType = "text";
  if (field.includes("number")) {
    inputType = "tel";
  } else if (field.includes("email")) {
    inputType = "email";
  }

  return (
    <div className="flex flex-wrap items-start border-b border-accent/20 pb-2 mb-2">
      <strong className="text-base text-accent font-primary mr-2 whitespace-nowrap">
        {label}:
      </strong>

      {editable ? (
        <input
          ref={inputRef}
          type={inputType}
          name={field}
          autoComplete="off"
          value={editedUser?.[field] ?? ""}
          onChange={(e) => {
            console.log(`[Info Component - ${field}] onChange triggered. New value: "${e.target.value}"`);
            onChange(field, e.target.value);
          }}
          className="text-base rounded-md border p-1 font-secondary w-full sm:w-auto bg-background focus:outline-none"
        />
      ) : (
        <span className="text-base text-accent break-words whitespace-normal font-secondary">
          {value}
        </span>
      )}
    </div>
  );
});


const UserInformation = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const token = Cookies.get("core");

  useEffect(() => {
    console.log("[UserInformation] Fetching user data...");
    const fetchUserData = async () => {
      setLoading(true);
      setMessage("");
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const res = await axios.get(
          `https://mtsbackend20-production.up.railway.app/api/teamMember/${id}`,
          { headers }
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
          department_name: fetchedUser?.department?.department_name || "",
          role: fetchedUser.role || "N/A",
        };

        console.log("this is department part", userData.department_name);
        console.log("this is a testing data in the field and user ", userData);

        setUser(userData);
        setEditedUser(userData);
        console.log("[UserInformation] User data fetched and states set.");
      } catch (error) {
        console.error("[UserInformation] Error fetching user details:", error);
        toast.error("Error fetching user details. Please try again.");
      } finally {
        setLoading(false);
        console.log("[UserInformation] Loading finished.");
      }
    };

    fetchUserData();
  }, [id, token]);

  const handleInputChange = (field, value) => {
    console.log(`[UserInformation] handleInputChange: field=${field}, value=${value}`);
    setEditedUser((prev) => {
      const newState = { ...prev, [field]: value };
      console.log("[UserInformation] setEditedUser - New state:", newState);
      return newState;
    });
  };

  const handleSave = async () => {
    console.log("[UserInformation] handleSave triggered.");
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
      console.log("[UserInformation] Data to save:", filteredData);

      const response = await fetch(
        `https://mtsbackend20-production.up.railway.app/api/teamMember/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(filteredData),
        }
      );

      if (response.ok) {
        setUser((prevUser) => ({ ...prevUser, ...filteredData }));
        setIsEditing(false);
        toast.success("User information updated successfully!");
        console.log("[UserInformation] Save successful.");
      } else {
        const errorData = await response.json();
        console.error("[UserInformation] Save failed. Response:", errorData);
        toast.error(errorData.message || "Failed to update user information. Please try again.");
      }
    } catch (error) {
      console.error("[UserInformation] An error occurred during save:", error);
      toast.error("An error occurred while saving the data. Please try again.");
    }
  };

  // Console log for UserInformation component rendering
  console.log("[UserInformation] Rendering component. isEditing:", isEditing, "editedUser:", editedUser);


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
              onClick={() => {
                console.log("[UserInformation] Toggle Edit button clicked. isEditing was:", isEditing);
                setIsEditing(!isEditing);
              }}
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
                editedUser={editedUser}
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
                  editable={isEditing && label !== "Department_name"}
                  onChange={handleInputChange}
                  editedUser={editedUser}
                />
              ))}
            </div>
          </div>

          <div>
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
                editedUser={editedUser}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInformation;