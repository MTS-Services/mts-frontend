import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaAngleDown, FaAngleUp, FaSearch, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
// import { useDepartmentNames } from "../../hooks/useSocketDataUtils";
import { useSocket } from "../../../context/SocketContext";
import { useDepartmentNames } from "../../../hooks/useSocketDataUtils";
// import { useSocket } from "../../context/SocketContext";

interface User {
  id: number;
  first_name: string;
  email: string;
  team?: { // team property can be optional and its structure
    id?: number; // team id can be optional
    department?: {
      department_name: string;
    };
  };
}

const TeamCreate = () => {
  const token = Cookies.get("core");
  const socket = useSocket();
  const DEPARTMENT_OPTIONS = useDepartmentNames(socket);

  const [formData, setFormData] = useState({
    team_name: "",
    team_target: "",
    department_id: "",
    leader_id: null as number | null,
    selectedMembers: [] as number[],
  });

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isMembersDropdownOpen, setIsMembersDropdownOpen] = useState(false);
  const [isLeaderDropdownOpen, setIsLeaderDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderSearchQuery, setLeaderSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRes = await axios.post(
          "https://mtsbackend20-production.up.railway.app/api/teamMember",
          { limit: "50" }, // Fetching a limited number of users
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Assuming the API returns users and their team information
        setAllUsers(usersRes.data.teamMembers);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]); // Dependency array includes token

  // Filter available users for members dropdown
  // Includes users not already selected, not the selected leader,
  // whose team is null or has no id, and match the search query
  const availableUsers = allUsers.filter(
    (user) =>
      (!user.team || user.team.id === null) && // Check if user.team is null or team.id is null
      !formData.selectedMembers.includes(user.id) && // Exclude already selected members
      user.id !== formData.leader_id && // Exclude the selected leader
      (user.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by first name
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by email
        user.team?.department?.department_name // Search by department name if available
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  // Filter available users for leader dropdown
  // Includes users not already selected as members, whose team is null or has no id,
  // and match the leader search query
  const availableLeaders = allUsers.filter(
    (user) =>
      (!user.team || user.team.id === null) && // Check if user.team is null or team.id is null
      !formData.selectedMembers.includes(user.id) && // Exclude users already selected as members
      (user.first_name?.toLowerCase().includes(leaderSearchQuery.toLowerCase()) || // Search by first name
        user.email?.toLowerCase().includes(leaderSearchQuery.toLowerCase()) || // Search by email
        user.team?.department?.department_name // Search by department name if available
          ?.toLowerCase()
          .includes(leaderSearchQuery.toLowerCase()))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectUser = (user: User) => {
    setFormData((prev) => ({
      ...prev,
      selectedMembers: [...prev.selectedMembers, user.id],
    }));
    setSearchQuery("");
    setIsMembersDropdownOpen(false);
  };

  const handleSelectLeader = (user: User) => {
    setFormData((prev) => ({
      ...prev,
      leader_id: user.id,
    }));
    setLeaderSearchQuery("");
    setIsLeaderDropdownOpen(false);
  };

  const handleRemoveUser = (userId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedMembers: prev.selectedMembers.filter((id) => id !== userId),
    }));
  };

  const handleRemoveLeader = () => {
    setFormData((prev) => ({
      ...prev,
      leader_id: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { team_name, team_target, leader_id, selectedMembers, department_id } = formData;

    if (!team_name || !team_target || !leader_id) {
      toast.error("Please fill all required fields");
      return;
    }

    if (selectedMembers.length === 0) {
      toast.error("Please select at least one team member");
      return;
    }

    try {
      const response = await axios.post(
        "https://mtsbackend20-production.up.railway.app/api/team/create",
        {
          team_name,
          team_target,
          department_id: department_id ? Number(department_id) : null,
          leader_id,
          members: selectedMembers, // Sending array of user IDs
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      // Reset form after successful submission
      setFormData({
        team_name: "",
        team_target: "",
        department_id: "",
        leader_id: null,
        selectedMembers: [],
      });
    } catch (error) {
      console.error("Error creating team:", error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to create team"
        : "Failed to create team";
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background m-auto flex items-center justify-center p-6">
      <ToastContainer />
      <div className="w-full max-w-2xl bg-background p-8 rounded-lg shadow-lg border  border-primary">
        <h1 className="text-2xl font-bold text-accent font-primary text-center mb-6" >Create New Team</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Team Name */}
          <div>
            <label className="block text-sm font-semibold text-accent font-primary mb-1">
              Team Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="team_name"
              value={formData.team_name}
              onChange={handleInputChange}
              className="w-full p-3 border border-accent/50 rounded-md focus:outline-none text-accent focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Leader Selection */}
          <div>
            <label className="block text-sm font-semibold text-accent font-primary mb-1">
              Team Leader <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <div
                className="min-h-12 w-full p-3 bg-background rounded flex flex-wrap items-center gap-2 cursor-pointer border border-gray-300"
                onClick={() => setIsLeaderDropdownOpen(!isLeaderDropdownOpen)}
              >
                {formData.leader_id ? (
                  <div className="flex items-center bg-card px-3 py-1 rounded-full gap-1 text-sm">
                    <span className="font-primary text-accent">
                      {allUsers.find(user => user.id === formData.leader_id)?.first_name}
                    </span>
                    <FaTimes
                      className="hover:text-red-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveLeader();
                      }}
                    />
                  </div>
                ) : (
                  <span className="text-accent">Select team leader...</span>
                )}
                <div className="ml-auto text-accent">
                  {isLeaderDropdownOpen ? <FaAngleUp  className="text-accent"/> : <FaAngleDown />}
                </div>
              </div>

              {isLeaderDropdownOpen && (
                <div className="absolute z-10 w-full text-accent bg-background mt-1 rounded shadow-lg max-h-60 overflow-auto border border-gray-200">
                  <div className="sticky top-0 bg-background p-2 border-b border-accent/50">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search leaders by name, email or department..."
                        className="w-full p-2 pl-10 text-accent focus:outline-none"
                        value={leaderSearchQuery}
                        onChange={(e) => setLeaderSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="max-h-48 text-accent font-primary overflow-y-auto">
                    {availableLeaders.length > 0 ? (
                      availableLeaders.map((user) => (
                        <div
                          key={user.id}
                          className="p-3 text-accent font-primary hover:bg-background cursor-pointer border-b border-accent"
                          onClick={() => handleSelectLeader(user)}
                        >
                          <div className="font-medium text-accent font-primary">{user.first_name}</div>
                          <div className="text-xs text-accent">
                            {user.email}
                          </div>
                          {user.team?.department?.department_name && (
                            <div className="text-xs text-accent font-primary">
                              {user.team.department.department_name}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-accent font-primary text-center">
                        No users found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Team Target */}
          <div>
            <label className="block text-sm font-semibold font-primary text-accent mb-1">
              Team Target <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="team_target"
              value={formData.team_target}
              onChange={handleInputChange}
              className="w-full p-3 border border-accent/40 text-accent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Department Selection */}
          <div className="">
            <label className="block text-sm font-semibold text-accent font-primary mb-1">
              Department
            </label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleInputChange}
              className="w-full p-3 border border-accent text-accent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="font-primary text-base bg-card"> Select Department (Optional)</option>
              {DEPARTMENT_OPTIONS.map((dept) => (
                <option key={dept.id} value={dept.id} className="bg-card">
                  {dept.department_name}
                </option>
              ))}
            </select>
          </div>

          {/* Team Members Selector */}
          <div>
            <label className="block text-sm font-semibold text-accent font-primary mb-1">
              Team Members <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div
                className="min-h-12 w-full p-3 bg-background rounded flex flex-wrap items-center gap-2 cursor-pointer border border-gray-300"
                onClick={() => setIsMembersDropdownOpen(!isMembersDropdownOpen)}
              >
                {formData.selectedMembers.length > 0 ? (
                  formData.selectedMembers.map((userId) => {
                    const user = allUsers.find(u => u.id === userId);
                    return user ? (
                      <div
                        key={userId}
                        className="flex items-center bg-card px-3 py-1 rounded-full gap-1 text-sm"
                      >
                        <span className="font-primary text-accent">{user.first_name}</span>
                        <FaTimes
                          className="hover:text-red-500 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveUser(userId);
                          }}
                        />
                      </div>
                    ) : null;
                  })
                ) : (
                  <span className="text-accent">Select team members...</span>
                )}
                <div className="ml-auto">
                  {isMembersDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                </div>
              </div>

              {isMembersDropdownOpen && (
                <div className="absolute z-10 w-full bg-background mt-1 rounded shadow-lg max-h-60 overflow-auto border border-gray-200">
                  <div className="sticky top-0 bg-background p-2 border-b border-accent/50">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users by name, email or department..."
                        className="w-full p-2 pl-10 text-accent focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="max-h-48 text-accent bg-card font-primary overflow-y-auto">
                    {availableUsers.length > 0 ? (
                      availableUsers.map((user) => (
                        <div
                          key={user.id}
                          className="p-3 text-accent font-primary hover:bg-background cursor-pointer border-b border-accent"
                          onClick={() => handleSelectUser(user)}
                        >
                          <div className="font-medium text-accent font-primary">{user.first_name}</div>
                          <div className="text-xs text-accent">
                            {user.email}
                          </div>
                          {user.team?.department?.department_name && (
                            <div className="text-xs text-accent font-primary">
                              {user.team.department.department_name}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-accent font-primary text-center">
                        No users found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-primary font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamCreate;
