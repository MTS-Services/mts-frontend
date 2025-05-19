import { FaSearch, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import Loading from "../../Loading/Loading";
import { useState } from "react";

const MarketPlaceProfile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  
  const { data, loading, error, refetch } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/profile"
  );

  // Transform API data
  const transformedProfiles = data?.profiles?.map((profile) => ({
    id: profile.id,
    name: profile.profile_name,
    department: profile.department?.[0]?.department_name || "No Department",
    completedJobs: profile.complete_count || 0
  })) || [];

  // Get all unique departments for filter dropdown
  const allDepartments = [...new Set(
    data?.profiles
      ?.map(profile => profile.department?.[0]?.department_name)
      .filter(Boolean)
  )];

  const filteredProfiles = transformedProfiles.filter((profile) => {
    const matchesSearch = 
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = 
      selectedDepartment === "" || 
      profile.department.toLowerCase() === selectedDepartment.toLowerCase();

    return matchesSearch && matchesDepartment;
  });

  const tableHeaders = [
    "Name",
    "Department",
    "Completed Jobs", 
    "Profile Link"
  ];
  

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="bg-background min-h-screen w-full overflow-x-auto px-6 py-10 sm:px-4 md:px-10 lg:px-14">
        <div className="text-red-500 text-center py-10">
          Error loading data: {error.message}
          <button 
            onClick={refetch}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen w-[1200px] overflow-x-auto px-6 py-10 sm:px-4 md:px-10 m-auto">
      {/* Search and Filter Section */}
      <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="border-border-color bg-secondary flex items-center justify-between gap-3 rounded border-2 p-2 duration-150 hover:scale-95">
          <div className="border-border-color/30 flex items-center rounded border bg-white px-2 py-1">
            <FaSearch className="text-gray-400 mx-2" />
            <input
              type="text"
              placeholder="Search by name or department..."
              className="text-primary w-full bg-transparent text-sm outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row md:w-auto">
          {/* Department Filter */}
          <div className="bg-primary border-border-color flex rounded border-2 p-2">
            <div className="bg-primary border-border-color/30 flex items-center border-r-1 pr-2">
              <FaUserTie className="text-2xl" />
            </div>
            <select
              className="bg-primary font-secondary border-border-color/40 mr-2 ml-3 border px-3 focus:outline-0"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {allDepartments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Profiles Table */}
      <div className="overflow-x-auto m-auto"> 
        <table className="w-full min-w-[1200px] text-left">
          <thead>
            <tr className="text-accent font-primary text-lg">
              {tableHeaders.map((head, i) => (
                <th
                  key={head}
                  className={`px-2 py-1 text-lg ${i === 0 ? "py-3" : ""}`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="border-accent font-secondary border-t-2 m-auto">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
                <tr
                  key={profile.id}
                  className="border-accent/40 font-secondary text-accent hover:bg-primary border-b text-sm hover:text-white"
                >
                  <td className="px-1 py-2 font-light">{profile.name}</td>
                  <td className="px-1 py-2 font-light">{profile.department}</td>
                  <td className="px-1 py-2 font-light">{profile.completedJobs}</td>
                  <td className="px-1 py-2 font-light">
                    <Link to={`/dashboard/profile/${profile.id}`}>
                      <button className="font-primary bg-primary relative flex items-center overflow-hidden rounded-full border border-white px-2 py-2 text-base font-medium text-white uppercase shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-left-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out hover:scale-105 hover:text-white hover:shadow-lg hover:before:left-0 active:scale-90 sm:px-2 sm:text-sm md:px-4 lg:px-4">
                        View Info
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 text-center text-red-500">
                  No profiles found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketPlaceProfile;