import Tippy from "@tippyjs/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import Loading from "../../../components/Loading/Loading";
import { useFetchData } from "../../../hooks/useFetchData";
const ProjectsDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const { data, loading: fetchLoading } = useFetchData(
    `https://mtsbackend20-production.up.railway.app/api/project/getall/${id}`,
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
    const parsedValue =
      field === "rating" ? Math.min(5, parseFloat(value || 0)) : value;

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
        },
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

  // const Info = ({ label, field, value, source, editable = false, onChange }) => (
  //   <div className="flex break-words whitespace-normal max-w-full border-b border-accent/40 pb-2 items-center mb-4">
  //     <strong className="text-sm pr-2 break-words whitespace-normal max-w-full text-accent">{label} :</strong>
  //     {editable ? (
  //       <input
  //         type={field === "rating" ? "number" : "text"}
  //         value={value ?? ""}
  //         step="0.1"
  //         min="0"
  //         max="5"
  //         onChange={(e) => onChange(field, e.target.value, source)}
  //         className="border p-2 rounded w-full break-words whitespace-normal max-w-full text-accent"
  //       />
  //     ) : (
  //       <span className="text-accent break-words whitespace-normal max-w-full">{value ?? "-"}</span>
  //     )}
  //   </div>
  // );

  const Info = ({
    label,
    field,
    value,
    source,
    editable = false,
    onChange,
  }) => (
    <div className="border-accent/40 mb-2 flex flex-wrap items-center gap-x-2 border-b pb-2">
      <strong className="text-accent font-secondary text-base whitespace-nowrap">
        {label}:
      </strong>

      {editable ? (
        <input
          type={field === "rating" ? "number" : "text"}
          value={value ?? ""}
          step="0.1"
          min="0"
          max="5"
          onChange={(e) => onChange(field, e.target.value, source)}
          className="font-secondary text-accent w-full rounded border p-2 sm:w-auto"
        />
      ) : field === "sheet_link" && value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="font-secondary break-words text-blue-500 underline"
        >
          Click to view
        </a>
      ) : field === "project_requirements" && value ? (
        <Tippy content={value} placement="bottom">
          <span className="font-secondary text-accent max-w-[200px] cursor-pointer truncate text-base">
            {value}
          </span>
        </Tippy>
      ) : (
        <span className="text-accent font-secondary text-base break-words">
          {value ?? "-"}
        </span>
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
    {
      label: "After Fiverr Amount",
      field: "after_fiverr_amount",
      source: "user",
    },
    {
      label: "After Fiverr Bonus",
      field: "after_Fiverr_bonus",
      source: "user",
    },
    {
      label: "Department Name",
      field: "department_name",
      source: "department",
    },
    {
      label: "Project Requirements",
      field: "project_requirements",
      source: "department",
    },
    { label: "Team Name", field: "team_name", source: "team" },
  ];

  const groupedFields = [
    allFields.slice(0, 5),
    allFields.slice(5, 10),
    allFields.slice(10, 17),
  ];

  return (
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

            {/* ✅ Partial Gradient Rating Stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => {
                const fillPercent = Math.min(
                  100,
                  Math.max(0, (user.rating - index) * 100),
                );
                return (
                  <div key={index} className="relative h-4 w-4 text-base">
                    <FaStar className="absolute inset-0 text-gray-300" />
                    <FaStar
                      className="absolute inset-0 text-yellow-400"
                      style={{
                        clipPath: `inset(0 ${100 - fillPercent}% 0 0)`,
                      }}
                    />
                  </div>
                );
              })}
              <span className="text-accent font-secondary ml-2 text-sm">
                ({parseFloat(user.rating).toFixed(1)})
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-background bg-primary relative flex items-center overflow-hidden rounded-full px-6 py-2 text-base font-bold shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-left-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out hover:scale-105 hover:text-white hover:shadow-lg hover:before:left-0 active:scale-90 sm:px-8 sm:text-lg md:px-10 lg:px-12"
            >
              {isEditing ? "Cancel" : "Edit Info"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="text-background bg-primary relative flex items-center overflow-hidden rounded-full px-6 py-2 text-base font-bold shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-left-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out hover:scale-105 hover:text-white hover:shadow-lg hover:before:left-0 active:scale-90 sm:px-8 sm:text-lg md:px-10 lg:px-12"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-10">
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
