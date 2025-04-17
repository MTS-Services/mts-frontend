import { useState, useEffect } from "react";
import { MdInfoOutline } from "react-icons/md";
import { io } from "socket.io-client";

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filter, setFilter] = useState({
    account: "",
    operationStatus: "",
    orderedBy: "",
  });
  const [editRowId, setEditRowId] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  const toggleModal = () => setIsOpen(!isOpen);

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
    const fetchData = async () => {
      const socket = io("http://192.168.10.47:3000");

      socket.on("projectUpdated", (project) => {
        console.log("Project updated:", project);

        // Update the tableData to only modify the updated project, leaving the others intact
        setTableData((prevData) =>
          prevData.map(
            (row) =>
              row.id === project.id
                ? { ...row, ...project } // Merge the updated project data into the existing row
                : row // Keep other rows unchanged
          )
        );
      });

      try {
        const response = await fetch("http://192.168.10.47:3000/api/project", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page: "1", limit: "10" }),
        });

        const data = await response.json();
        if (Array.isArray(data?.projects)) {
          setTableData(data.projects);
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
        (row) => row?.team_member?.profile?.map((p) => p.profile_name) || []
      )
    ),
  ];

  const operationStatuses = ["Wip", "Completed", "Pending"];

  const orderedByOptions = [
    ...new Set(
      tableData.map((row) =>
        `${row?.team_member?.first_name || ""} ${
          row?.team_member?.last_name || ""
        }`.trim()
      )
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
        `http://192.168.10.47:3000/api/project/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const updatedData = tableData.map((item) =>
          item.id === id ? { ...item, ...payload } : item
        );
        setTableData(updatedData);
        setEditRowId(null);
        setEditedRow({});
      } else {
        console.error("Failed to update");
      }
    } catch (error) {
      console.error("Save error", error);
    }
  };
  return (
    <div className="w-full overflow-x-auto py-10 sm:px-4 bg-background min-h-screen lg:px-14 md:px-10 px-6">
      {/* Summary Cards */}
      <div className="flex flex-wrap justify-between items-start gap-2">
        {mtsTargets.map(({ title, amount, note }, idx) => (
          <div
            key={idx}
            className="relative bg-primary p-4 text-white rounded-sm w-full md:w-[30%] lg:w-[20%] xl:w-[14%] lg:h-28"
          >
            <h2 className="text-sm md:text-xl">{title}</h2>
            <h2 className="text-sm md:text-xl">{amount}</h2>
            <div className="absolute top-2 right-2 group">
              <MdInfoOutline className="text-xl" />
              {note && (
                <div className="absolute top-6 right-0 bg-black text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 w-40 pointer-events-none">
                  {note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="my-4 flex flex-wrap items-center gap-4 mt-10">
        <select
          value={filter.account}
          onChange={(e) => setFilter({ ...filter, account: e.target.value })}
          className="text-sm px-4 py-2 border border-accent rounded-md w-full text-accent bg-background max-w-48"
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
          className="text-sm px-4 py-2 border border-accent rounded-md w-full text-accent bg-background max-w-48"
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
          onChange={(e) => setFilter({ ...filter, orderedBy: e.target.value })}
          className="text-sm px-4 py-2 border border-accent rounded-md w-full text-accent bg-background max-w-48"
        >
          <option value="">Filter by Ordered by</option>
          {orderedByOptions.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button
          onClick={resetFilters}
          className="text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-300"
        >
          Reset Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-10">
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className="bg-secondary text-white text-[16px] border border-white">
              {tableHeaders.map((head) => (
                <th key={head} className="px-2 py-3 border border-white">
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
                  className="odd:bg-primary even:bg-primary/70 text-white text-sm hover:bg-primary/80 transition-all"
                >
                  <td className="px-2 py-3 border-r border-secondary">
                    {row?.date}
                  </td>
                  <td className="px-2 py-3 border-r border-secondary">
                    {row?.team_member?.profile
                      ?.map((p) => p.profile_name)
                      .join(", ")}
                  </td>
                  <td className="px-2 py-3 border-r border-secondary">
                    {row?.clientName}
                  </td>

                  <td className="px-2 py-3 border-r border-secondary">
                    {editRowId === row.id ? (
                      <input
                        value={editedRow.ops_status}
                        onChange={(e) =>
                          handleInputChange("ops_status", e.target.value)
                        }
                        className="text-black px-2 py-1 rounded"
                      />
                    ) : (
                      row?.ops_status
                    )}
                  </td>

                  <td className="px-2 py-3 border-r border-secondary">
                    {row?.sheet_link}
                  </td>

                  <td className="px-2 py-3 border-r border-secondary capitalize">
                    {`${row?.team_member?.first_name || ""} ${
                      row?.team_member?.last_name || ""
                    }`}
                  </td>
                  {/* last date */}
                  <td className="px-2 py-3 border-r border-secondary">
                    {editRowId === row.id ? (
                      <input
                        type="date"
                        value={editedRow.deli_last_date || ""}
                        onChange={(e) =>
                          handleInputChange("deli_last_date", e.target.value)
                        }
                        className="text-black px-2 py-1 rounded"
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

                  <td className="px-2 py-3 border-r border-secondary">
                    {editRowId === row.id ? (
                      <input
                        value={editedRow.status}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                        className="text-black px-2 py-1 rounded"
                      />
                    ) : (
                      row?.status
                    )}
                  </td>
                  {/* After Fiverr */}
                  <td className="px-2 py-3 border-r border-secondary">
                    {Number(row?.after_fiverr_amount).toFixed(2)}
                  </td>

                  {/* Bonus */}
                  <td className="px-2 py-3 border-r border-secondary">
                    {editRowId === row.id ? (
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={editedRow.bonus}
                        onChange={(e) =>
                          handleInputChange("bonus", e.target.value)
                        }
                        className="text-black px-2 py-1 rounded"
                      />
                    ) : (
                      row?.bonus
                    )}
                  </td>
                  {/* Ratting */}
                  <td className="px-2 py-3 border-r border-secondary">
                    {editRowId === row.id ? (
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={editedRow.rating}
                        onChange={(e) =>
                          handleInputChange(
                            "rating",
                            parseInt(e.target.value, 10)
                          )
                        }
                        className="text-black px-2 py-1 rounded"
                      />
                    ) : (
                      row?.rating
                    )}
                  </td>
                  {/* Actioin   buttone  */}
                  <td className="px-2 py-3 border-r border-secondary">
                    {editRowId === row.id ? (
                      <button
                        className="bg-green-500 px-2 py-1 rounded text-white"
                        onClick={() => handleSave(row.id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="bg-yellow-500 px-2 py-1 rounded text-white"
                        onClick={() => handleEditClick(row)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={tableHeaders.length}
                  className="text-center py-4 text-accent"
                >
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
