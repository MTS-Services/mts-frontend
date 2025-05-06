import { useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import ResetButton from "../../../components/Button/ResetButton";
import SecondaryButton from "../../../components/Button/SecondaryButton";
import Search from "../../../components/Search/Search";
import ProjectsUplodeForm from "./ProjectsUplodeForm";

const Projects = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filter, setFilter] = useState({
    account: "",
    operationStatus: "",
    orderedBy: "",
  });
  const [editRowId, setEditRowId] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  // const toggleModal = () => setIsOpen(!isOpen);

  const mtsTargets = [
    { title: "Total Order", amount: "$30000" },
    { title: "Total delivered", amount: "$2500" },
    { title: "Total Target", amount: "$50000" },
    { title: "Cancels ", amount: "$1000" },
    { title: "Total sales", amount: "$20000" },
    { title: "Total operation", amount: "$25000", note: "mr" },
  ];

  const tableHeaders = [
    "Date",
    "Account",
    "Client Name",
    "Operation-Status",
    "Sheet link",
    "Ordered by",
    "Delivery Last Date",
    "Profile Status",
    "After Fiverr",
    "Bonus",
    "Rating",
    "Actions",
  ];

  useEffect(() => {
    const socket = io("https://mtsbackend20-production.up.railway.app/");

    socket.on("projectUpdated", (project) => {
      console.log("Project updated:", project);
      setTableData((prevData) =>
        prevData.map((row) =>
          row.id === project.id ? { ...row, ...project } : row,
        ),
      );
    });

    socket.on("projectCreated", (project) => {
      if (!project) return;

      // Flatten in case it's deeply nested
      let fixedProject;

      if (Array.isArray(project)) {
        fixedProject = project.flat(Infinity)[0];
        fixedProject = project;
      }

      if (typeof fixedProject !== "object" || fixedProject === null) return;

      console.log("✅ Adding project:", fixedProject);

      setTableData((prevData) => {
        const updated = [...prevData, fixedProject];
        console.log("📋 Updated table data:", updated);
        return updated;
      });
    });

    const fetchData = async () => {
      const socket = io("https://mtsbackend20-production.up.railway.app/");

      socket.on("projectUpdated", (project) => {
        console.log("Project updated:", project);

        // Update the tableData to only modify the updated project, leaving the others intact
        setTableData((prevData) =>
          prevData.map(
            (row) =>
              row.id === project.id
                ? { ...row, ...project } // Merge the updated project data into the existing row
                : row, // Keep other rows unchanged
          ),
        );
      });

      try {
        const response = await fetch(
          "https://mtsbackend20-production.up.railway.app/api/project",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ page: "1", limit: "100" }),
          },
        );

        const data = await response.json();
        if (Array.isArray(data?.projects)) {
          setTableData(data.projects);
          console.log(data);
        } else {
          setTableData([]);
        }
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = tableData.filter((row) => {
    const accountNames =
      row?.team_member?.profile?.map((p) => p.profile_name) || [];
    const accountMatch = filter.account
      ? accountNames.includes(filter.account)
      : true;
    const statusMatch = filter.operationStatus
      ? row.ops_status === filter.operationStatus
      : true;
    const orderedByMatch = filter.orderedBy
      ? `${row?.team_member?.first_name} ${row?.team_member?.last_name}`.trim() ===
        filter.orderedBy
      : true;
    return accountMatch && statusMatch && orderedByMatch;
  });

  const resetFilters = () => {
    setFilter({ account: "", operationStatus: "", orderedBy: "" });
  };

  const uniqueAccounts = [
    ...new Set(
      tableData.flatMap(
        (row) => row?.team_member?.profile?.map((p) => p.profile_name) || [],
      ),
    ),
  ];

  const operationStatuses = ["Wip", "Completed", "Pending"];
  const profileStatuses = ["Active", "Inactive", "Revision", "Pending"];

  const orderedByOptions = [
    ...new Set(
      tableData.map((row) =>
        `${row?.team_member?.first_name || ""} ${
          row?.team_member?.last_name || ""
        }`.trim(),
      ),
    ),
  ];

  const handleEditClick = (row) => {
    if (editRowId === row.id) {
      console.log(row.id);

      return; // already editing this row
    }

    setEditRowId(row.id);
    setEditedRow({
      ops_status: row.ops_status || "",
      deli_last_date: row.deli_last_date?.split("T")[0] || "",
      status: row.status || "",
      bonus: row.bonus || 0,
      rating: row.rating || "",
    });
  };

  const handleInputChange = (field, value) => {
    setEditedRow((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (id) => {
    try {
      const payload = {
        ...editedRow,
        deli_last_date: editedRow.deli_last_date
          ? new Date(editedRow.deli_last_date).toISOString()
          : null,
      };

      const response = await fetch(
        `https://mtsbackend20-production.up.railway.app/api/project/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        const updatedData = tableData.map((item) =>
          item.id === id ? { ...item, ...payload } : item,
        );
        toast.success("Update Successfuly");
        setTableData(updatedData);
        setEditRowId(null);
        setEditedRow({});
      } else {
        console.error("Failed to update");
      }
    } catch (error) {
      console.error("Save error", error);
      toast.warning("Update Failed");
    }
  };

  const handleOpsStatusChange = async (newStatus, id) => {
    try {
      setTableData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ops_status: newStatus } : item,
        ),
      );

      await fetch(
        `https://mtsbackend20-production.up.railway.app/api/project/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ops_status: newStatus }),
        },
      );

      toast.success("Operation Status updated successfully.");
    } catch (error) {
      console.log(error);
      toast.warning("Failed to update Operation status:");
    }
  };

  const handleStatusChange = async (newStatus, id) => {
    try {
      setTableData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item,
        ),
      );

      await fetch(
        `https://mtsbackend20-production.up.railway.app/api/project/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      toast.success("Profile Status updated successfully.");
    } catch (error) {
      console.log(error);
      toast.warning("Failed to update Profile status.");
    }
  };

  const isLastMonth = (dateStr) => {
    if (!dateStr) return false;

    const inputDate = new Date(dateStr);
    const today = new Date();

    // Check if date is **before** the first day of the current month
    const firstOfCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    );

    return inputDate < firstOfCurrentMonth;
  };

  return (
    <div className="bg-background min-h-screen w-full overflow-x-auto px-6 py-10 sm:px-4 md:px-10 lg:px-14">
      {/* Summary Cards */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        {mtsTargets.map(({ title, amount, note }, idx) => (
          <div
            key={idx}
            className="bg-primary border-border-color relative w-full rounded-sm border-2 p-4 text-white md:w-[30%] lg:h-28 lg:w-[20%] xl:w-[14%]"
          >
            <h2 className="text-sm md:text-xl">{title}</h2>
            <h2 className="text-sm md:text-xl">{amount}</h2>
            <div className="group absolute top-2 right-2">
              <MdInfoOutline className="text-xl" />
              {note && (
                <div className="pointer-events-none absolute top-6 right-0 z-10 w-40 rounded bg-black p-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                  {note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="my-4 mt-10 flex justify-between">
        <div>
          <div className="flex gap-4">
            <select
              value={filter.account}
              onChange={(e) =>
                setFilter({ ...filter, account: e.target.value })
              }
              className="border-accent text-accent bg-background w-full max-w-48 rounded-md border px-4 py-2 text-sm"
            >
              <option value="">Filter by Account</option>
              {uniqueAccounts.map((account, index) => (
                <option key={index} value={account}>
                  {account}
                </option>
              ))}
            </select>

            <select
              value={filter.operationStatus}
              onChange={(e) =>
                setFilter({ ...filter, operationStatus: e.target.value })
              }
              className="border-accent text-accent bg-background w-full max-w-48 rounded-md border px-4 py-2 text-sm"
            >
              <option value="">Filter by Operation Status</option>
              {operationStatuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={filter.orderedBy}
              onChange={(e) =>
                setFilter({ ...filter, orderedBy: e.target.value })
              }
              className="border-accent text-accent bg-background w-full max-w-48 rounded-md border px-4 py-2 text-sm"
            >
              <option value="">Filter by Ordered by</option>
              {orderedByOptions.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <ResetButton onClick={resetFilters}>Reset</ResetButton>
          </div>
        </div>
        {/* Search */}
        <div>
          <Search />
        </div>
      </div>

      {/* Table */}
      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className="bg-secondary border border-white text-[16px] text-white">
              {tableHeaders.map((head) => (
                <th key={head} className="border border-white px-2 py-3">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="border-2 border-white">
            {filteredData.length > 0 ? (
              filteredData.map((row, i) => (
                <tr
                  key={i}
                  className="odd:bg-primary even:bg-primary/70 hover:bg-primary/80 text-sm text-white transition-all"
                >
                  <td className="border-secondary border-r px-2 py-3">
                    {row?.date}
                  </td>
                  <td className="border-secondary border-r px-2 py-3">
                    {row?.team_member?.profile
                      ?.map((p) => p.profile_name)
                      .join(", ")}
                  </td>
                  <td className="border-secondary border-r px-2 py-3">
                    {row?.clientName}
                  </td>

                  {/* test selects*********************************  */}
                  <td className="border-secondary border-r px-2 py-3">
                    {editRowId === row.id ? (
                      <select
                        value={editedRow.ops_status}
                        onChange={(e) =>
                          handleInputChange("ops_status", e.target.value)
                        }
                        className="w-full rounded px-2 py-1 text-black"
                      >
                        <option value="">Select status</option>
                        {operationStatuses.map((status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      row?.ops_status
                    )}
                  </td>

                  {/* test selectes************************* */}

                  <td className="border-secondary border-r px-2 py-3">
                    {row?.sheet_link}
                  </td>

                  <td className="border-secondary border-r px-2 py-3 capitalize">
                    {`${row?.team_member?.first_name || ""} ${
                      row?.team_member?.last_name || ""
                    }`}
                  </td>
                  {/* last date */}
                  <td className="border-secondary border-r px-2 py-3">
                    {editRowId === row.id ? (
                      <input
                        type="date"
                        value={editedRow.deli_last_date || ""}
                        onChange={(e) =>
                          handleInputChange("deli_last_date", e.target.value)
                        }
                        className="rounded px-2 py-1 text-black"
                      />
                    ) : row?.deli_last_date ? (
                      new Date(row.deli_last_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    ) : (
                      ""
                    )}
                  </td>

                  <td className="border-secondary border-r px-2 py-3">
                    {editRowId === row.id ? (
                      <select
                        value={editedRow.status}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                        className="w-full rounded px-2 py-1 text-black"
                      >
                        <option value="">Select status</option>
                        {profileStatuses.map((status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      row?.status
                    )}
                  </td>
                  {/* After Fiverr */}
                  <td className="border-secondary border-r px-2 py-3">
                    {Number(row?.after_fiverr_amount).toFixed(2)}
                  </td>

                  {/* Bonus */}
                  <td className="border-secondary border-r px-2 py-3">
                    {editRowId === row.id ? (
                      <input
                        type="number"
                        value={editedRow.bonus}
                        onChange={(e) =>
                          handleInputChange("bonus", e.target.value)
                        }
                        className="rounded px-2 py-1 text-black"
                      />
                    ) : (
                      row?.bonus
                    )}
                  </td>
                  {/* Ratting */}
                  <td className="border-secondary border-r px-2 py-3">
                    {editRowId === row.id ? (
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={editedRow.rating}
                        onChange={(e) =>
                          handleInputChange(
                            "rating",
                            parseInt(e.target.value, 10),
                          )
                        }
                        className="rounded px-2 py-1 text-black"
                      />
                    ) : (
                      row?.rating
                    )}
                  </td>
                  {/* Actioin   buttone  */}

                  <Link
                    to="/dashboard/projectsdetails"
                    className="m-auto rounded-lg px-3 py-2 text-white shadow-md hover:scale-105"
                  >
                    Details
                  </Link>

                  <td className="border-secondary border-r px-2 py-3">
                    {editRowId === row.id ? (
                      // <button
                      //   className="rounded bg-green-500 px-2 py-1 text-white"
                      //   onClick={() => handleSave(row.id)}
                      // >
                      //   Save
                      // </button>
                      <SecondaryButton onClick={() => handleSave(row.id)}>
                        Save
                      </SecondaryButton>
                    ) : (
                      // <button
                      //   className="rounded bg-yellow-500 px-2 py-1 text-white"
                      //   onClick={() => handleEditClick(row)}
                      // >
                      //   Edit
                      // </button>
                      <SecondaryButton onClick={() => handleEditClick(row)}>
                        Edit
                      </SecondaryButton>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={tableHeaders.length}
                  className="text-accent py-4 text-center"
                >
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ProjectsUplodeForm />
    </div>
  );
};

export default Projects;
