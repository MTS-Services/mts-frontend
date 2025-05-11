import{ useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
// ডেটা কনস্ট্যান্টস - আলাদা ফাইলে রাখা যেতে পারে বড় প্রজেক্টে
const contributorOptions = [
  { id: 1, label: "John Doe" },
  { id: 2, label: "Jane Smith" },
  { id: 3, label: "Alice Johnson" },
  { id: 4, label: "Michael Brown" },
];
 
const specialContributorOptions = [
  { id: 1, label: "Special Contributor 1" },
  { id: 2, label: "Special Contributor 2" },
  { id: 3, label: "Special Contributor 3" },
];
 
// কম্পোনেন্ট
function BestContributorsForm() {
 
  // স্টেট ভেরিয়েবলস
  const [formData, setFormData] = useState({
    award_name: "",
    thankful_message: "",
    contributorType: "",
    selectedContributors: [],
  });
 
 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [availableContributors, setAvailableContributors] = useState(contributorOptions);
 
  // হ্যান্ডলার ফাংশন - ইনপুট পরিবর্তন
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  // হ্যান্ডলার ফাংশন - কন্ট্রিবিউটর টাইপ পরিবর্তন
  const handleContributorTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      contributorType: type,
      selectedContributors: [],
      thankful_message: "", // টাইপ পরিবর্তনের সাথে সাথে থ্যাংকফুল মেসেজ রিসেট হবে
    }));
    setAvailableContributors(type === "special" ? specialContributorOptions : contributorOptions);
    setSearchQuery("");
  };

    // হ্যান্ডলার ফাংশন - কন্ট্রিবিউটর নির্বাচন
  const handleSelectContributor = (contributor) => {
    setFormData((prev) => ({
      ...prev,
      selectedContributors: [...prev.selectedContributors, contributor],
    }));
    setAvailableContributors((prev) =>
      prev.filter((item) => item.id !== contributor.id)
    );
    setSearchQuery("");
    setIsDropdownOpen(false);
  };
 
  // হ্যান্ডলার ফাংশন - কন্ট্রিবিউটর অপসারণ
  const handleRemoveContributor = (contributor) => {
    setFormData((prev) => ({
      ...prev,
      selectedContributors: prev.selectedContributors.filter(
        (item) => item.id !== contributor.id
      ),
    }));
    setAvailableContributors((prev) => [...prev, contributor]);
  };
 
  // হ্যান্ডলার ফাংশন - ফর্ম সাবমিট
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { award_name, thankful_message, contributorType, selectedContributors } = formData;
 
    // ভ্যালিডেশন
    if (!award_name) {
      toast.error("Award Name is required!");
      return;
    }
 
    if (!contributorType) {
      toast.error("Please select a Contributor Type!");
      return;
    }
 
    if (contributorType === "special" && selectedContributors.length === 0) {
      toast.warning("Please select at least one Special Contributor!");
      return;
    }
 
    if (contributorType === "special" && !thankful_message) {
      toast.warning("Thankful Message is required for Special Contributors!");
      return;
    }
 
    if (contributorType === "unspecial" && selectedContributors.length === 0) {
      toast.warning("Please select at least one Unspecial Contributor!");
      return;
    }
 
    try {
      // এখানে আপনার ফর্ম ডেটা পাঠানোর API কল অন্তর্ভুক্ত করুন
      console.log("Form Data to be submitted:", formData); // সাবমিট করার ডেটা দেখুন
 
      // **ফেইক API কল - আপনার API URL এবং লজিক এখানে বসান**
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // এখানে আপনার API কলের সাফল্যের বা ব্যর্থতার কন্ডিশন দিন
          const isSuccess = true; // অথবা false
          if (isSuccess) {
            resolve({ ok: true, json: async () => ({ message: "Contributor added successfully from API!" }) });
          } else {
            resolve({ ok: false, statusText: "Internal Server Error", json: async () => ({ message: "Failed to add contributor from API." }) });
          }
        }, 1500); // 1.5 সেকেন্ডের ডিলে সিমুলেট করা হচ্ছে
      });
 
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message || "Contributor added successfully!", {
          position: "top-right", // TOP_RIGHT এর পরিবর্তে
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
 
        setFormData({
          award_name: "",
          thankful_message: "",
          contributorType: "",
          selectedContributors: [],
        });
        setAvailableContributors(contributorOptions);
      } else {
        const errorData = await response.json();
        toast.error(`Failed to add contributor: ${errorData.message || response.statusText}`, {
          position: "top-right", // TOP_RIGHT এর পরিবর্তে
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred during submission!", {
        position: "top-right", // TOP_RIGHT এর পরিবর্তে
      });
    }
  };
 
  // ফিল্টার করা কন্ট্রিবিউটর (সার্চের জন্য)
  const filteredAvailable = availableContributors.filter((c) =>
    c.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  // রেন্ডার
  return ( 
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <ToastContainer />
      <div className="w-full max-w-2xl bg-background p-8 rounded-lg shadow-lg border border-primary">
        <h2 className="text-3xl font-bold text-accent text-center mb-6 font-primary">Add Best Contributor</h2>
 
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* awoardName */}
          <div>
            <label className="text-accent block mb-2 font-primary">Award Name</label>
            <input
              type="text"
              name="award_name"
              value={formData.award_name}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-background/90 text-accent border border-accent/50"
              required
            />
          </div>
 
          {/* কন্ট্রিবিউটর টাইপ নির্বাচন */}
          <div>
            <label className="text-accent block mb-2">Select Contributor Type</label>
            <div className="flex gap-6 text-accent">
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
 
          {/* স্পেশাল কন্ট্রিবিউটর সিলেকশন এবং থ্যাংকফুল মেসেজ */}
          {formData.contributorType === "special" && (
            <div>
              {/* কন্ট্রিবিউটর সিলেকশন */}
              <label className="text-accent block mb-2">Search & Select Contributors</label>
              <div className="relative">
                <div
                  className="min-h-12 w-full p-3 bg-background rounded flex flex-wrap items-center gap-2 cursor-pointer border border-accent/40"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {formData.selectedContributors.length > 0 ? (
                    formData.selectedContributors.map((contributor) => (
                      <div
                        key={contributor.id}
                        className="flex items-center bg-gray-700 px-2 py-1 rounded gap-1"
                      >
                        <span>{contributor.label}</span>
                        <TiDelete
                          size={18}
                          className="hover:text-red-500 cursor-pointer"
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
                  <div className="absolute z-10 w-full bg-gray-800 mt-1 rounded shadow-lg max-h-60 overflow-auto">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full p-2 bg-gray-700 text-white border-b border-gray-600"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {filteredAvailable.length > 0 ? (
                      filteredAvailable.map((contributor) => (
                        <div
                          key={contributor.id}
                          className="p-3 text-white hover:bg-gray-700 cursor-pointer border-b border-gray-700"
                          onClick={() => handleSelectContributor(contributor)}
                        >
                          {contributor.label}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-accent">No contributors found</div>
                    )}
                  </div>
                )}
              </div>
 
              <div>
                <label className="text-accent block pt-2">Thankful Message</label>
                <input
                  type="text"
                  name="thankful_message"
                  value={formData.thankful_message}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
                  required
                />
              </div>
            </div>
          )}
 
          {formData.contributorType === "unspecial" && (
            <div>
              <label className="text-accent block mb-2">Search & Select Contributors</label>
              <div className="relative">
                <div
                  className="min-h-12 w-full p-3 bg-gray-800 rounded flex flex-wrap items-center gap-2 cursor-pointer border border-gray-700"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {formData.selectedContributors.length > 0 ? (
                    formData.selectedContributors.map((contributor) => (
                      <div
                        key={contributor.id}
                        className="flex items-center bg-gray-700 px-2 py-1 rounded gap-1"
                      >
                        <span>{contributor.label}</span>
                        <TiDelete
                          size={18}
                          className="hover:text-red-500 cursor-pointer"
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
                  <div className="absolute z-10 w-full bg-gray-800 mt-1 rounded shadow-lg max-h-60 overflow-auto">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full p-2 bg-gray-700 text-white border-b border-gray-600"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {filteredAvailable.length > 0 ? (
                      filteredAvailable.map((contributor) => (
                        <div
                          key={contributor.id}
                          className="p-3 text-white hover:bg-gray-700 cursor-pointer border-b border-gray-700"
                          onClick={() => handleSelectContributor(contributor)}
                        >
                          {contributor.label}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-gray-400">No contributors found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
 
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md"
          >
            Submit Contributor
          </button>
        </form>
      </div>
    </div>
  );
}
 
export default BestContributorsForm;