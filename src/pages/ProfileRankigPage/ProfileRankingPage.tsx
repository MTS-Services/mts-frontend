import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../../context/SocketContext";
import { useFetchData } from "../../hooks/useFetchData";
import { useProfileNames } from "../../hooks/useSocketDataUtils";

function ProfileRankingPage() {
  const socket = useSocket();
  const profiles = useProfileNames(socket);

  const { data } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/profile/ranking",
  );

  const [formData, setFormData] = useState({
    profileName: "",
    keywordEntries: [{ keyword: "", rankingNumber: "", rankingRow: "" }],
  });

  const handleProfileChange = (e) => {
    setFormData((prev) => ({ ...prev, profileName: e.target.value }));
  };

  const handleKeywordChange = (index, field, value) => {
    const updated = [...formData.keywordEntries];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, keywordEntries: updated }));
  };

  const addKeywordField = () => {
    setFormData((prev) => ({
      ...prev,
      keywordEntries: [
        ...prev.keywordEntries,
        { keyword: "", rankingNumber: "", rankingRow: "" },
      ],
    }));
  };

  const removeKeywordField = (index) => {
    const updated = [...formData.keywordEntries];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, keywordEntries: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profileName) {
      toast.error("Please select a profile");
      return;
    }

    // Prepare payload in backend-expected format
    const payload = {
      profileName: formData.profileName,
      rankings: formData.keywordEntries.map((entry) => ({
        keywords: entry.keyword,
        row: Number(entry.rankingRow) || 0,
        rankingPage: entry.rankingNumber, // assuming rankingNumber is 'page' value?
      })),
    };

    try {
      const token = Cookies.get("core");
      await axios.post(
        "https://mtsbackend20-production.up.railway.app/api/profile/ranking/create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Ranking info submitted successfully");
      setFormData({
        profileName: "",
        keywordEntries: [{ keyword: "", rankingNumber: "", rankingRow: "" }],
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit ranking info");
    }
  };

  function groupByProfile(datas) {
    const grouped = {};

    datas?.forEach((item) => {
      const profileName = item.profile?.profile_name || "Unknown";

      if (!grouped[profileName]) {
        grouped[profileName] = {
          profileName,
          keywords: [],
          ranks: [],
        };
      }

      grouped[profileName].keywords.push(item.keywords);
      grouped[profileName].ranks.push(`${item.ranking_page}.${item.row}`); // অথবা item.rank যদি থাকে
    });

    return Object.values(grouped);
  }
  console.log("da", groupByProfile(data?.profiles));
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-6">
      <div className="bg-background border-primary w-full max-w-3xl rounded-lg border p-8 shadow-lg">
        <h2 className="text-accent font-primary mb-6 text-center text-3xl font-bold">
          Profile Ranking Setup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-accent font-primary mb-2 block">
              Profile Name
            </label>
            <select
              name="profile_name"
              value={formData.profileName}
              onChange={handleProfileChange}
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

          {formData.keywordEntries.map((entry, index) => (
            <div
              key={index}
              className="border-accent/30 relative grid grid-cols-1 gap-4 rounded-md border p-4 md:grid-cols-3"
            >
              <div>
                <label className="text-accent mb-1 block">Keyword</label>
                <input
                  type="text"
                  value={entry.keyword}
                  onChange={(e) =>
                    handleKeywordChange(index, "keyword", e.target.value)
                  }
                  className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
                  required
                />
              </div>
              <div>
                <label className="text-accent mb-1 block">Ranking Page</label>
                <input
                  type="text"
                  value={entry.rankingNumber}
                  onChange={(e) =>
                    handleKeywordChange(index, "rankingNumber", e.target.value)
                  }
                  className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
                  required
                />
              </div>
              <div className="relative">
                <label className="text-accent mb-1 block">Ranking Row</label>
                <input
                  type="number"
                  value={entry.rankingRow}
                  onChange={(e) =>
                    handleKeywordChange(index, "rankingRow", e.target.value)
                  }
                  className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
                  required
                />
                {formData.keywordEntries.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeKeywordField(index)}
                    className="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-sm text-white hover:bg-red-700"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
          ))}

          <div>
            <button
              type="button"
              onClick={addKeywordField}
              className="bg-secondary border-primary text-accent hover:bg-primary mb-4 rounded border px-4 py-2 transition hover:text-white"
            >
              + Add Another Keyword
            </button>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-blue-600 py-3 font-semibold text-white transition duration-200 hover:scale-95 hover:bg-blue-700"
          >
            Submit Ranking Info
          </button>
        </form>
      </div>
      <div>{}</div>
    </div>
  );
}

export default ProfileRankingPage;
