import { useState } from "react";

function ProfileRankingPage() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted: ", formData);
    setFormData({
      profileName: "",
      keywordEntries: [{ keyword: "", rankingNumber: "", rankingRow: "" }],
    });
  };

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
              name="profileName"
              value={formData.profileName}
              onChange={handleProfileChange}
              className="bg-background/90 text-accent border-accent/50 w-full rounded border p-3"
              required
            >
              <option value="">Select Profile</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Enterprise">Enterprise</option>
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
                <label className="text-accent mb-1 block">Ranking Number</label>
                <input
                  type="number"
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
            className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700"
          >
            Submit Ranking Info
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileRankingPage;
