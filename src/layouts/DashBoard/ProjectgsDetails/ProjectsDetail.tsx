import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import { useFetchData } from "../../../hooks/useFetchData";
import { FaStar } from "react-icons/fa";

const ProjectsDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const { data, loading: fetchLoading } = useFetchData(
    `https://mtsbackend20-production.up.railway.app/api/project/getall/${id}`
  );

  useEffect(() => {
    if (data?.project) {
      const fixedData = {
        ...data.project,
        rating: parseFloat(parseFloat(data.project.rating ?? 0).toFixed(1)),
      };
      setUser(fixedData);
      setEditedUser(fixedData);
    }
  }, [data]);

  const handleInputChange = (field, value, source) => {
    if (!editedUser || source !== "user") return;
    const parsedValue = field === "rating"
      ? Math.min(5, parseFloat(value || 0))
      : value;

    setEditedUser((prev) => ({
      ...prev,
      [field]: parsedValue,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("core");
      const updatedData = {};
      allFields.forEach(({ field, source }) => {
        if (source === "user" && editableFields.includes(field)) {
          updatedData[field] =
            field === "rating"
              ? parseFloat(parseFloat(editedUser?.[field] ?? 0).toFixed(1))
              : editedUser?.[field];
        }
      });
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
      setUser((prev) => ({ ...prev, ...updatedData }));
      setIsEditing(false);
      toast.success("Project updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update project. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const Info = ({ label, field, value, source, editable = false, onChange }) => (
    <div className="flex border-b border-accent/40 pb-2 items-center mb-4">
      <strong className="text-sm pr-2 text-accent">{label} :</strong>
      {editable ? (
        <input
          type={field === "rating" ? "number" : "text"}
          value={value ?? ""}
          step="0.1"
          min="0"
          max="5"
          onChange={(e) => onChange(field, e.target.value, source)}
          className="border p-2 rounded w-full max-w-xs text-accent"
        />
      ) : (
        <span className="text-accent">{value ?? "-"}</span>
      )}
    </div>
  );

  if (fetchLoading || loading || !user) return <Loading />;

  const editableFields = [
    "project_name",
    "order_id",
    "sheet_link",
    "order_amount",
    "bonus",
    "rating",
  ];

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
    { label: "Project Requirements", field: "project_requirements", source: "department" },
    { label: "Team Name", field: "team_name", source: "team" },
  ];

  const groupedFields = [
    allFields.slice(0, 5),
    allFields.slice(5, 10),
    allFields.slice(10, 17),
  ];

  return (
    <section className="py-6 sm:py-8 md:py-12">
      <div className="w-full max-w-9xl mx-auto bg-card p-4 sm:p-6 md:p-8 rounded-xl shadow-md shadow-primary">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between flex-wrap">
          <div className="mb-6 sm:mb-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-primary text-primary font-bold py-2">
              {user.project_name}
            </h2>
            <p className="text-accent text-sm font-secondary pb-2">{user.order_id}</p>

            {/* ✅ Partial Gradient Rating Stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => {
                const fillPercent = Math.min(100, Math.max(0, (user.rating - index) * 100));
                return (
                  <div key={index} className="relative w-4 h-4 text-base">
                    <FaStar className="text-gray-300 absolute inset-0" />
                    <FaStar
                      className="text-yellow-400 absolute inset-0"
                      style={{
                        clipPath: `inset(0 ${100 - fillPercent}% 0 0)`
                      }}
                    />
                  </div>
                );
              })}
              <span className="ml-2 text-sm text-accent font-secondary">
                ({parseFloat(user.rating).toFixed(1)})
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center flex-wrap gap-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center relative py-2 px-6 sm:px-8 md:px-10 lg:px-12 text-background text-base sm:text-lg font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
            >
              {isEditing ? "Cancel" : "Edit Info"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="flex items-center relative py-2 px-6 sm:px-8 md:px-10 lg:px-12 text-background text-base sm:text-lg font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 mt-8">
          {groupedFields.map((group, colIdx) => (
            <div key={colIdx}>
              {group.map(({ label, field, source }) => {
                const value =
                  source === "user"
                    ? editedUser?.[field]
                    : source === "department"
                    ? editedUser?.department?.[field]
                    : editedUser?.team?.[field];

                return (
                  <Info
                    key={field}
                    label={label}
                    field={field}
                    source={source}
                    value={value}
                    editable={isEditing && editableFields.includes(field)}
                    onChange={handleInputChange}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsDetail;