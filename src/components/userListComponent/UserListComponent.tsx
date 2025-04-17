import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

const UserListComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.post("http://192.168.10.47:3000/api/teamMember", {
          limit: "50",
        });

        const members = res.data.teamMembers;
        setUserData(members);

        const departmentSet = new Set();
        members.forEach((user) => {
          const departmentName = user.team?.department?.department_name;
          if (departmentName) {
            departmentSet.add(departmentName);
          }
        });

        setDepartments([...departmentSet]);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = userData.filter((user) => {
    const term = searchTerm.toLowerCase();
    const genderMatch =
      selectedGender === "" ||
      user.gender?.toLowerCase() === selectedGender.toLowerCase();
    const departmentMatch =
      selectedDepartment === "" ||
      user.team?.department?.department_name
        ?.toLowerCase()
        .includes(selectedDepartment.toLowerCase());

    return (
      genderMatch &&
      departmentMatch &&
      (user.dp?.toLowerCase().includes(term) ||
        user.first_name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.number?.toLowerCase().includes(term) ||
        user.permanent_address?.toLowerCase().includes(term) ||
        user.guardian_number?.toLowerCase().includes(term) ||
        user.team?.department?.department_name?.toLowerCase().includes(term) ||
        user.education?.toLowerCase().includes(term))
    );
  });

  const tableHeaders = [
    "ProfileImg",
    "Name",
    "E-mail",
    "Phone Number",
    "Permanent Address",
    "Guardian Number",
    "Department",
    "Education",
    "User Info",
  ];

  return (
    <div className="w-full overflow-x-auto py-10 sm:px-4 bg-background min-h-screen lg:px-14 md:px-10 px-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between w-full">
        {/* Search Bar */}
        <div className="w-full md:w-1/2">
          <div className="font-secondary relative mx-auto w-full max-w-md md:mx-0">
            <input
              type="text"
              placeholder="Search by user..."
              className="border-accent focus:ring-primary focus:border-primary text-accent bg-background w-full rounded-full border py-2 pr-4 pl-11 text-sm shadow-md transition duration-300 focus:ring-2 focus:outline-none sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="text-primary absolute top-1/2 left-4 -translate-y-1/2 text-lg sm:text-xl" />
          </div>
        </div>

        {/* Filters */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 justify-center items-center">
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="font-secondary border-accent text-accent bg-background focus:ring-primary focus:border-primary w-full max-w-48 rounded-md border px-4 py-2 text-sm shadow-sm transition focus:ring-2 focus:outline-none sm:w-44"
          >
            <option value="">Select Male or Female</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="font-secondary border-accent text-accent bg-background focus:ring-primary focus:border-primary w-full max-w-48 rounded-md border px-4 py-2 text-sm shadow-sm transition focus:ring-2 focus:outline-none sm:w-44"
          >
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept.toLowerCase()}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="mt-10 overflow-x-auto">
        {loading ? (
          <div className="text-center text-gray-500"><Loading /></div>
        ) : (
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="text-accent font-primary text-lg">
                {tableHeaders.map((head, i) => (
                  <th key={head} className={`px-2 py-1 text-lg ${i === 0 ? "py-3" : ""}`}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="border-accent font-secondary border-t-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, i) => (
                  <tr
                    key={i}
                    className="border-b border-accent/40 font-secondary text-accent hover:text-white text-sm hover:bg-primary"
                  >
                    <td className="flex items-center justify-center px-2 py-1">
                      <div className="h-12 w-12 overflow-hidden rounded-full">
                        <img
                          className="w-full h-full object-cover"
                          src={user.dp?.trim() ? user.dp : "/assits/Rewardspage/profileImg.jpg"}
                          alt="avatar"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assits/Rewardspage/profileImg.jpg";
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-1 font-light py-2">{user.first_name || "N/A"}</td>
                    <td className="px-1 font-light py-2">{user.email || "N/A"}</td>
                    <td className="px-1 font-light py-2">{user.number || "N/A"}</td>
                    <td className="px-1 font-light py-2">{user.permanent_address || "N/A"}</td>
                    <td className="px-1 font-light py-2">{user.guardian_number || "N/A"}</td>
                    <td className="px-1 font-light py-2">{user.team?.department?.department_name || "N/A"}</td>
                    <td className="px-1 font-light py-2">{user.education || "N/A"}</td>
                    <td className="px-1 font-light py-2">
                      <Link to={`/dashboard/userdetails/${user.id}`}>
                        <button className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/80">
                          View Info
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-red-500">
                    No matching users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserListComponent;
