import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../../../../context/SocketContext";
import { useDepartmentNames } from "../../../../hooks/useSocketDataUtils";

const CreateProfile = () => {
  const [ProfileName, setPrifileName] = useState("");
  const socket = useSocket();
  const [loading, setLoading] = useState(false);
  
  // Socket.io দিয়ে ডিপার্টমেন্ট ডাটা লোড করা
  const DEPARTMENT_OPTIONS = useDepartmentNames(socket);
  const [formData, setFormData] = useState({
    department_id: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = Cookies.get("core");

    if (!token) {
      toast.warning("Please login first.");
      return;
    }

    try {
      const response = await axios.post(
        "https://mtsbackend20-production.up.railway.app/api/profile/create",
        {
          profile_name: ProfileName.trim(),
          department_id: formData.department_id || null
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("✅ Profile created successfully");
        setPrifileName("");
        setFormData({ department_id: "" });
      }
    } catch (error) {
      if (error.response?.status === 401) {
        Cookies.remove("core");
        toast.error("🔒 Token expired. Please login again.");
      } else {
        toast.error("❌ Failed to create profile");
      }
      console.error("Error creating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6 md:p-10">
      <ToastContainer />
      <div className="bg-card shadow-lg rounded-xl w-full max-w-md sm:max-w-lg md:max-w-xl border border-primary p-6 sm:p-8 md:p-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 text-accent font-primary">
          Create Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm sm:text-base font-medium text-accent mb-1 font-primary">
              Profile Name
            </label>
            <input
              type="text"
              value={ProfileName}
              onChange={(e) => setPrifileName(e.target.value)}
              placeholder="Enter Profile name"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 font-primary text-sm sm:text-base border text-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Department Selection - Socket.io দিয়ে লোড করা ডাটা ব্যবহার করা */}
          <div className="">
            <label className="text-accent font-primary mb-1 block text-sm font-semibold">
              Department
            </label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleInputChange}
              className="border-accent text-accent w-full rounded-md border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="" className="font-primary bg-card text-base">
                Select Department (Optional)
              </option>
              {DEPARTMENT_OPTIONS.map((dept) => (
                <option key={dept.id} value={dept.id} className="bg-card">
                  {dept.department_name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center relative py-2 m-auto text-center px-6 sm:px-8 md:px-10 lg:px-12 text-background text-base sm:text-lg font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;