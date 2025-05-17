import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProfile = () => {
  const [ProfileName, setPrifileName] = useState("");
  const [loading, setLoading] = useState(false);

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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("✅ Department created successfully");
        setPrifileName("");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        Cookies.remove("core");
        toast.error("🔒 Token expired. Please login again.");
      } else {
        toast.error("❌ Failed to create department");
      }
      console.error("Error creating department:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6 md:p-10">
      <ToastContainer />
      <div className="bg-card shadow-lg rounded-xl w-full max-w-md sm:max-w-lg md:max-w-xl border border-primary p-6 sm:p-8 md:p-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 text-accent font-primary">
          Create ProfileName
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
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center relative py-2 m-auto text-center px-6 sm:px-8 md:px-10 lg:px-12 text-background text-base sm:text-lg font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create Profile Name"}
          </button>
        </form>
      </div>
    </div>
  );
};



export default CreateProfile
