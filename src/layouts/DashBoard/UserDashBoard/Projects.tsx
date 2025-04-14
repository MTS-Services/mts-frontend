import { useState, useEffect } from 'react';
import { MdInfoOutline } from 'react-icons/md';

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filter, setFilter] = useState({
    account: '',
    operationStatus: '',
    orderedBy: '',
  });
  const [editRowId, setEditRowId] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  const toggleModal = () => setIsOpen(!isOpen);

  const mtsTargets = [
    { title: 'Total Order', amount: '$30000' },
    { title: 'Total delivered', amount: '$2500' },
    { title: 'Total Target', amount: '$50000' },
    { title: 'Cancels ', amount: '$1000' },
    { title: 'Total sales', amount: '$20000' },
    { title: 'Total operation', amount: '$25000', note: 'mr' },
  ];

  const tableHeaders = [
<<<<<<< HEAD
    'Date',
    'Account',
    'Client Name',
    'Operation-Status',
    'Sheet link',
    'Ordered by',
    'Delivery Last Date',
    'Profile Status',
    'After Fiverr',
    'Tips',
    'Rating',
=======
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
>>>>>>> 34b3c78358299afa9132064c1339e157a4b9a46b
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch('http://192.168.10.40:3000/api/project', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page: '1', limit: '10' }),
=======
        const response = await fetch("http://192.168.10.47:3000/api/project", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page: "1", limit: "10" }),
>>>>>>> 34b3c78358299afa9132064c1339e157a4b9a46b
        });

        const data = await response.json();
        if (Array.isArray(data?.projects)) {
          setTableData(data.projects);
          console.log(data);
        } else {
          setTableData([]);
        }
      } catch (error) {
        console.error('Fetch failed', error);
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
    setFilter({ account: '', operationStatus: '', orderedBy: '' });
  };

  const uniqueAccounts = [
    ...new Set(
      tableData.flatMap(
        (row) => row?.team_member?.profile?.map((p) => p.profile_name) || []
<<<<<<< HEAD
      )
    ),
  ];
  const operationStatuses = ['Wip', 'Completed', 'Pending'];
  const orderedByOptions = [
    ...new Set(
      tableData.map((row) =>
        `${row?.team_member?.first_name || ''} ${
          row?.team_member?.last_name || ''
        }`.trim()
=======
>>>>>>> 34b3c78358299afa9132064c1339e157a4b9a46b
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
<<<<<<< HEAD
    <div className='w-full overflow-x-auto py-10 sm:px-4 bg-background min-h-screen md:px-10 px-6'>
      {/* Dashboard Summary Cards */}
      <div className='flex flex-wrap justify-between items-start gap-2'>
=======
    <div className="w-full overflow-x-auto py-10 sm:px-4 bg-background min-h-screen lg:px-14 md:px-10 px-6">
      {/* Summary Cards */}
      <div className="flex flex-wrap justify-between items-start gap-2">
>>>>>>> 34b3c78358299afa9132064c1339e157a4b9a46b
        {mtsTargets.map(({ title, amount, note }, idx) => (
          <div
            key={idx}
            className='relative bg-primary p-4 text-white rounded-sm w-full md:w-[30%] lg:w-[20%] xl:w-[14%] lg:h-28'
          >
            <h2 className='text-sm md:text-xl'>{title}</h2>
            <h2 className='text-sm md:text-xl'>{amount}</h2>
            <div className='absolute top-2 right-2 group'>
              <MdInfoOutline className='text-xl' />
              {note && (
                <div className='absolute top-6 right-0 bg-black text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 w-40 pointer-events-none'>
                  {note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

<<<<<<< HEAD
      {/* Filter Dropdowns */}
      <div className='my-4 flex flex-wrap items-center gap-4 mt-10'>
=======
      {/* Filters */}
      <div className="my-4 flex flex-wrap items-center gap-4 mt-10">
>>>>>>> 34b3c78358299afa9132064c1339e157a4b9a46b
        <select
          value={filter.account}
          onChange={(e) => setFilter({ ...filter, account: e.target.value })}
          className='text-sm px-4 py-2 border border-accent rounded-md w-full text-accent bg-background max-w-48'
        >
          <option value=''>Filter by Account</option>
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
<<<<<<< HEAD
          className='text-sm px-4 py-2 border border-accent rounded-md w-full text-accent bg-background max-w-48'
=======
          className="text-sm px-4 py-2 border border-accent rounded-md w-full text-accent bg-background max-w-48"
>>>>>>> 34b3c78358299afa9132064c1339e157a4b9a46b
        >
          <option value=''>Filter by Operation Status</option>
          {operationStatuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={filter.orderedBy}
          onChange={(e) => setFilter({ ...filter, orderedBy: e.target.value })}
          className='text-sm px-4 py-2 border border-accent rounded-md w-full text-accent bg-background max-w-48'
        >
          <option value=''>Filter by Ordered by</option>
          {orderedByOptions.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button
          onClick={resetFilters}
          className='text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-300'
        >
          Reset Filters
        </button>
      </div>

<<<<<<< HEAD
      {/* Project Table */}
      <div className='overflow-x-auto mt-10'>
        <table className='w-full min-w-[1000px] text-left'>
          <thead>
            <tr className='bg-secondary text-white text-[16px] border border-white'>
              {tableHeaders.map((head, i) => (
                <th
                  key={head}
                  className={`px-2 py-3 border border-white ${
                    i === 0 ? 'border-x' : ''
                  }`}
                >
=======
      {/* Table */}
      <div className="overflow-x-auto mt-10">
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className="bg-secondary text-white text-[16px] border border-white">
              {tableHeaders.map((head) => (
                <th key={head} className="px-2 py-3 border border-white">
>>>>>>> 34b3c78358299afa9132064c1339e157a4b9a46b
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='border-2 border-white'>
            {filteredData.length > 0 ? (
              filteredData.map((row, i) => (
                <tr
                  key={i}
<<<<<<< HEAD
                  className='odd:bg-primary even:bg-primary/70 text-white text-sm hover:bg-primary/80 transition-all duration-300 ease-in-out transform'
                >
                  <td className='px-2 py-3 border-r border-secondary'>
                    {row?.date
                      ? new Date(row.date).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })
                      : ''}
                  </td>
                  <td className='px-2 py-3 border-r border-secondary'>
                    {row?.team_member?.profile?.map((profile, index) => (
                      <span key={index}>
                        {profile.profile_name}
                        {index < row?.team_member?.profile?.length - 1 && ', '}
                      </span>
                    ))}
                  </td>
                  <td className='px-2 py-3 border-r border-secondary'>
                    {row?.clientName}
                  </td>
                  <td className='px-2 py-3 border-r border-secondary'>
                    {row?.ops_status}
                  </td>
                  <td className='px-2 py-3 border-r border-secondary'>
                    {row?.sheet_link}
                  </td>
                  <td className='px-2 py-3 border-r border-secondary capitalize'>
                    {`${row?.team_member?.first_name || ''} ${
                      row?.team_member?.last_name || ''
                    }`.trim()}
                  </td>
                  <td className='px-2 py-3 border-r border-secondary'>
                    {row?.deli_last_date
                      ? new Date(row?.deli_last_date).toLocaleDateString(
                          'en-US',
                          {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          }
                        )
                      : ''}
                  </td>
                  <td className='px-2 py-3 border-r border-secondary'>
                    {row?.status}
                  </td>
                  <td className='px-2 py-3 border-r border-secondary'>
                    ${Number(row?.after_fiverr_amount || 0).toFixed(2)}
                  </td>
                  <td className='px-2 py-3 border-r border-secondary'>
                    ${Number(row?.bonus || 0).toFixed(2)}
                  </td>
                  <td className='px-2 py-3 border-r border-secondary'>
                    {row?.rating}
                  </td>
=======
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
                      new Date(row.deli_last_date).toLocaleTimeString("en-US")
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
>>>>>>> 34b3c78358299afa9132064c1339e157a4b9a46b
                </tr>
              ))
            ) : (
              <tr>
<<<<<<< HEAD
                <td colSpan={tableHeaders.length} className='text-center py-4'>
=======
                <td
                  colSpan={tableHeaders.length}
                  className="text-center py-4 text-accent"
                >
>>>>>>> 34b3c78358299afa9132064c1339e157a4b9a46b
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
<<<<<<< HEAD

      {/* Add New Project Button */}
      <div className='mb-4 mt-6'>
        <button
          onClick={toggleModal}
          className='bg-primary hover:bg-secondary text-accent font-normal px-4 py-2 rounded text-xl transition duration-300'
        >
          Add New Projects
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4'>
          <div className='bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative'>
            <button
              onClick={toggleModal}
              className='absolute top-3 right-3 text-gray-500 hover:text-gray-800'
            >
              ✕
            </button>
            <h2 className='text-xl font-semibold mb-4'>Add New Project</h2>
            <form className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {[
                  { label: 'Date', type: 'date' },
                  { label: 'Account' },
                  { label: 'Client Name' },
                  { label: 'Operation-Status' },
                  { label: 'Sheet link', type: 'url' },
                  { label: 'Ordered by' },
                  { label: 'Delivery Last Date', type: 'date' },
                  { label: 'Profile Status' },
                  { label: 'After Fiverr' },
                  { label: 'Bonus', type: 'number' },
                  { label: 'Stars', type: 'number', props: { min: 1, max: 5 } },
                ].map(({ label, type = 'text', props = {} }) => (
                  <div key={label}>
                    <label className='block text-sm font-medium text-gray-700'>
                      {label}
                    </label>
                    <input
                      type={type}
                      {...props}
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2'
                    />
                  </div>
                ))}
              </div>
              <div className='pt-4'>
                <button
                  type='submit'
                  className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
=======
>>>>>>> 34b3c78358299afa9132064c1339e157a4b9a46b
    </div>
  );
};

export default Projects;