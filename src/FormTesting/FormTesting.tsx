import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

function BestContributorsForm() {
  const [formData, setFormData] = useState({
    award_name: "",
    thankful_message: "",
    contributorType: "", // 'special' or 'unspecial'
    specialContributors: "",
    selectedContributors: [],
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [message, setMessage] = useState("");

  const contributorOptions = [
    { id: 1, label: "John Doe" },
    { id: 2, label: "Jane Smith" },
    { id: 3, label: "Alice Johnson" },
    { id: 4, label: "Michael Brown" },
  ];

  const [availableContributors, setAvailableContributors] =
    useState(contributorOptions);

  // Input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Radio button change
  const handleContributorTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      contributorType: type,
      // Reset unused field
      specialContributors: "",
      selectedContributors: [],
    }));
    setAvailableContributors(contributorOptions);
  };

  // Select contributor from dropdown
  const handleSelectContributor = (contributor) => {
    setFormData((prev) => ({
      ...prev,
      selectedContributors: [...prev.selectedContributors, contributor],
    }));
    setAvailableContributors((prev) =>
      prev.filter((item) => item.id !== contributor.id),
    );
    setIsDropdownOpen(false);
  };

  // Remove contributor from selection
  const handleRemoveContributor = (contributor) => {
    setFormData((prev) => ({
      ...prev,
      selectedContributors: prev.selectedContributors.filter(
        (item) => item.id !== contributor.id,
      ),
    }));
    setAvailableContributors((prev) => [...prev, contributor]);
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      award_name,
      thankful_message,
      contributorType,
      specialContributors,
      selectedContributors,
    } = formData;

    if (!award_name || !thankful_message || !contributorType) {
      setMessage("Please fill in all required fields.");
      return;
    }

    if (contributorType === "special" && !specialContributors) {
      setMessage("Please enter the special contributors.");
      return;
    }

    if (contributorType === "unspecial" && selectedContributors.length === 0) {
      setMessage("Please select at least one contributor.");
      return;
    }

    console.log("Submitted Data:", formData);
    setMessage("Form submitted successfully!");

    // Reset form
    setFormData({
      award_name: "",
      thankful_message: "",
      contributorType: "",
      specialContributors: "",
      selectedContributors: [],
    });
    setAvailableContributors(contributorOptions);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-6">
      <div className="w-full max-w-2xl rounded-lg bg-gray-900 p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Add Best Contributor
        </h2>

        {message && (
          <p className="mb-6 text-center text-green-400">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Award Name */}
          <div>
            <label className="mb-2 block text-gray-300">Award Name</label>
            <input
              type="text"
              name="award_name"
              value={formData.award_name}
              onChange={handleInputChange}
              className="w-full rounded border border-gray-700 bg-gray-800 p-3 text-white"
              required
            />
          </div>

          {/* Radio buttons */}
          <div>
            <label className="mb-2 block text-gray-300">
              Select Contributor Type
            </label>
            <div className="flex gap-6 text-white">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="contributorType"
                  value="special"
                  checked={formData.contributorType === "special"}
                  onChange={() => handleContributorTypeChange("special")}
                />
                Select Special Contributors
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="contributorType"
                  value="unspecial"
                  checked={formData.contributorType === "unspecial"}
                  onChange={() => handleContributorTypeChange("unspecial")}
                />
                Select Unspecial Contributors
              </label>
            </div>
          </div>

          {/* Conditional Field: Special Contributors */}
          {formData.contributorType === "special" && (
            <>
              <div>
                <label className="mb-2 block text-gray-300">
                  Special Contributors
                </label>
                <input
                  type="text"
                  name="specialContributors"
                  value={formData.specialContributors}
                  onChange={handleInputChange}
                  className="w-full rounded border border-gray-700 bg-gray-800 p-3 text-white"
                />
              </div>

              {/* Thankful Message Field */}
              <div>
                <label className="mb-2 block text-gray-300">
                  Thankful Message
                </label>
                <input
                  type="text"
                  name="thankful_message"
                  value={formData.thankful_message}
                  onChange={handleInputChange}
                  className="w-full rounded border border-gray-700 bg-gray-800 p-3 text-white"
                />
              </div>
            </>
          )}

          {/* Conditional Field: Unspecial Contributors (dropdown) */}
          {formData.contributorType === "unspecial" && (
            <div>
              <label className="mb-2 block text-gray-300">
                Select Contributors
              </label>
              <div className="relative">
                <div
                  className="flex min-h-12 w-full cursor-pointer flex-wrap items-center gap-2 rounded border border-gray-700 bg-gray-800 p-3"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {formData.selectedContributors.length > 0 ? (
                    formData.selectedContributors.map((contributor) => (
                      <div
                        key={contributor.id}
                        className="flex items-center gap-1 rounded bg-gray-700 px-2 py-1"
                      >
                        <span>{contributor.label}</span>
                        <TiDelete
                          size={18}
                          className="cursor-pointer hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveContributor(contributor);
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">Pick contributors...</span>
                  )}
                  <div className="ml-auto">
                    {isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-gray-800 shadow-lg">
                    {availableContributors.length > 0 ? (
                      availableContributors.map((contributor) => (
                        <div
                          key={contributor.id}
                          className="cursor-pointer border-b border-gray-700 p-3 text-white hover:bg-gray-700"
                          onClick={() => handleSelectContributor(contributor)}
                        >
                          {contributor.label}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-gray-400">
                        No contributors available
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Submit Contributor
          </button>
        </form>
      </div>
    </div>
  );
}

export default BestContributorsForm;
