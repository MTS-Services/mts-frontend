import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../../context/SocketContext";
import { useProfileNames } from "../../hooks/useSocketDataUtils";

function Promotion() {
  const socket = useSocket();
  const profiles = useProfileNames(socket);

  const [formData, setFormData] = useState({
    profileName: "",
    impression: "",
    click: "",
    promoAmount: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profileName) {
      toast.error("Please select a profile");
      return;
    }
    if (!formData.impression || isNaN(formData.impression)) {
      toast.error("Please enter a valid impression number");
      return;
    }
    if (!formData.click || isNaN(formData.click)) {
      toast.error("Please enter a valid click number");
      return;
    }
    if (!formData.promoAmount || isNaN(formData.promoAmount)) {
      toast.error("Please enter a valid promo amount");
      return;
    }

    const payload = {
      profileName: formData.profileName,
      impression: Number(formData.impression),
      click: Number(formData.click),
      promoAmount: Number(formData.promoAmount),
    };

    try {
      const token = Cookies.get("core");
      await axios.post(
        "https://mtsbackend20-production.up.railway.app/api/promotion/create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Promotion info submitted successfully");
      setFormData({
        profileName: "",
        impression: "",
        click: "",
        promoAmount: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit promotion info");
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-6">
      <div className="bg-background border-primary w-full max-w-3xl rounded-lg border p-8 shadow-lg">
        <h2 className="text-accent font-primary mb-6 text-center text-3xl font-bold">
          Promotion Setup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Name */}
          <div>
            <label className="text-accent font-primary mb-2 block">
              Profile Name
            </label>
            <select
              name="profileName"
              value={formData.profileName}
              onChange={(e) => handleChange("profileName", e.target.value)}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              required
            >
              <option value="">Select Profile</option>
              {profiles.map((prof) => (
                <option key={prof.id} value={prof.profile_name}>
                  {prof.profile_name}
                </option>
              ))}
            </select>
          </div>

          {/* Impression Number */}
          <div>
            <label className="text-accent mb-1 block">Impression Number</label>
            <input
              type="number"
              value={formData.impression}
              onChange={(e) => handleChange("impression", e.target.value)}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              placeholder="Enter impression number"
              required
              min={0}
            />
          </div>

          {/* Click Number */}
          <div>
            <label className="text-accent mb-1 block">Click Number</label>
            <input
              type="number"
              value={formData.click}
              onChange={(e) => handleChange("click", e.target.value)}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              placeholder="Enter click number"
              required
              min={0}
            />
          </div>

          {/* Promo Amount */}
          <div>
            <label className="text-accent mb-1 block">Promo Amount</label>
            <input
              type="number"
              value={formData.promoAmount}
              onChange={(e) => handleChange("promoAmount", e.target.value)}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              placeholder="Enter promo amount"
              required
              min={0}
              step="0.01"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-blue-600 py-3 font-semibold text-white transition duration-200 hover:scale-95 hover:bg-blue-700"
          >
            Submit Promotion Info
          </button>
        </form>
      </div>
    </div>
  );
}

export default Promotion;
