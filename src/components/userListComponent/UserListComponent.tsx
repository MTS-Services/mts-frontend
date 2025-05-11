import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaBuilding, FaGenderless } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const UserListComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departments, setDepartments] = useState([]);

  const token = Cookies.get("core");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.post(
          "https://mtsbackend20-production.up.railway.app/api/teamMember",
          {
            limit: "50",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

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
    <div className="bg-background min-h-screen w-full overflow-x-auto px-6 py-10 sm:px-4 md:px-10 lg:px-14">
      <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="border-border-color bg-secondary flex items-center justify-between gap-3 rounded border-2 p-2 duration-150 hover:scale-95">
          <div className="border-border-color/30 flex items-center rounded border bg-white px-2 py-1">
            <input
              type="text"
              placeholder="Search project..."
              className="text-primary w-full bg-transparent text-sm outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row md:w-auto">
          <div className="bg-primary border-border-color flex rounded border-2 p-2">
            <div className="bg-primary border-border-color/30 flex items-center border-r-1 pr-2">
              <FaGenderless className="text-2xl" />
            </div>
            <select
              className="bg-primary font-secondary border-border-color/40 mr-2 ml-3 border px-3 focus:outline-0"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="">Select Male or Female</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="bg-primary border-border-color flex rounded border-2 p-2">
            <div className="bg-primary border-border-color/30 flex items-center border-r-1 pr-2">
              <FaBuilding className="text-2xl" />
            </div>
            <select
              className="bg-primary font-secondary border-border-color/40 mr-2 ml-3 border px-3 focus:outline-0"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
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
      </div>

      <div className="mt-10 overflow-x-auto">
        {loading ? (
          <div className="text-center text-gray-500">
            <Loading />
          </div>
        ) : (
          <table className="w-full min-w-[1000px] text-left">
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

            <tbody className="border-accent font-secondary border-t-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, i) => (
                  <tr
                    key={i}
                    className="border-accent/40 font-secondary text-accent hover:bg-primary border-b text-sm hover:text-white"
                  >
                    <td className="relative flex items-center justify-center px-2 py-2">
                      <div className="relative h-12 w-12 rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src={
                            user.dp?.trim()
                              ? user.dp
                              : "/assits/Rewardspage/profileImg.jpg"
                          }
                          alt="avatar"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assits/Rewardspage/profileImg.jpg";
                          }}
                        />
                        {/* 🟢 Active / ⚪ Inactive Dot */}
                        <span
                          className={`absolute right-0 bottom-0 z-20 h-3 w-3 rounded-full border-2 border-white ${
                            user.account_status?.toLowerCase() === "active"
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        />
                      </div>
                    </td>

                    <td className="px-1 py-2 font-light">
                      {user.first_name || "N/A"}
                    </td>
                    <td className="px-1 py-2 font-light">
                      {user.email || "N/A"}
                    </td>
                    <td className="px-1 py-2 font-light">
                      {user.number || "N/A"}
                    </td>
                    <td className="px-1 py-2 font-light">
                      {user.permanent_address || "N/A"}
                    </td>
                    <td className="px-1 py-2 font-light">
                      {user.guardian_number || "N/A"}
                    </td>
                    <td className="px-1 py-2 font-light">
                      {user.team?.department?.department_name || "N/A"}
                    </td>
                    <td className="px-1 py-2 font-light">
                      {user.education || "N/A"}
                    </td>
                    <td className="px-1 py-2 font-light">
                      <Link to={`/dashboard/userdetails/${user.id}`}>
                        <button className="font-primary bg-primary relative flex items-center overflow-hidden rounded-full border border-white px-2 py-2 text-base font-medium text-white uppercase shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-left-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out hover:scale-105 hover:text-white hover:shadow-lg hover:before:left-0 active:scale-90 sm:px-2 sm:text-sm md:px-4 lg:px-4">
                          View Info
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-6 text-center text-red-500">
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
