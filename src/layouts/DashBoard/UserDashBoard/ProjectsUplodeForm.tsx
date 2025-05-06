import { useState } from "react";
import { toast } from "react-toastify";
import PrimaryButton from "../../../components/Button/PrimaryButton";

const ProjectsUploadForm = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    ops_status: "",
    sales_comments: "",
    opsleader_comments: "",
    sheet_link: "",
    ordered_by: "",
    deli_last_date: "",
    status: "",
    orderAmount: "",
    bonus: "",
    rating: "",
    department: "",
    project_requirements: "",
    profile: "",
  });

  const profileStatusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "revision", label: "Revision" },
    { value: "inProgress", label: "In Progress" },
    { value: "deliveryCompleted", label: "Delivery Completed" },
  ];

  const operationStatusOptions = [
    { value: "wip", label: "Wip" },
    { value: "delivered", label: "Delivered" },
    { value: "submitted", label: "Submitted" },
    { value: "clientUpdate", label: "Client Update" },
    { value: "Revision", label: "Revision" },
    { value: "cancel ", label: "Cancel " },
  ];

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      ordered_by: parseInt(formData.ordered_by, 10),
      orderAmount: parseFloat(formData.orderAmount),
      bonus: parseFloat(formData.bonus),
      rating: parseFloat(formData.rating),
    };

    try {
      const response = await fetch(
        "https://mtsbackend20-production.up.railway.app/api/project/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to upload project");
      }

      console.log("Form Data:", dataToSend);
      toast.success("Project uploaded successfully!");

      setFormData({
        clientName: "",
        ops_status: "",
        sales_comments: "",
        opsleader_comments: "",
        sheet_link: "",
        ordered_by: "",
        deli_last_date: "",
        status: "",
        orderAmount: "",
        bonus: "",
        rating: "",
        department: "",
        project_requirements: "",
        profile: "",
      });

      setShowForm(false);
    } catch (err) {
      toast.warning("Upload failed. Please try again.");
    }
  };

  return (
    <div className="p-6">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="text-background bg-primary hover:text-accent flex cursor-pointer items-center overflow-hidden rounded-full px-6 py-2 text-base font-bold shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-left-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out hover:scale-105 hover:shadow-lg hover:before:left-0 active:scale-90 sm:px-8 sm:text-lg md:px-10 lg:px-12"
        >
          Upload Project
        </button>
      ) : (
        // <PrimaryButton onClick={() => setShowForm(true)}>
        //   Upload Project
        // </PrimaryButton>
        <form onSubmit={handleSubmit} className="items-center space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Client Name"
              className="w-full rounded border border-gray-300 p-2"
            />

            <select
              name="ops_status"
              value={formData.ops_status}
              onChange={handleChange}
              className="focus:bg-primary w-full rounded border border-gray-300 p-2 px-2 py-1 focus:p-0.5"
            >
              <option value="">Select Operation Status</option>
              {operationStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/*  */}

            <input
              type="text"
              name="sales_comments"
              value={formData.sales_comments}
              onChange={handleChange}
              placeholder="Sales Comments"
              className="w-full rounded border border-gray-300 p-2"
            />

            <input
              type="text"
              name="opsleader_comments"
              value={formData.opsleader_comments}
              onChange={handleChange}
              placeholder="Ops Leader Comments"
              className="w-full rounded border border-gray-300 p-2"
            />

            <input
              type="text"
              name="sheet_link"
              value={formData.sheet_link}
              onChange={handleChange}
              placeholder="Sheet Link"
              className="w-full rounded border border-gray-300 p-2"
            />

            <input
              type="number"
              name="ordered_by"
              value={formData.ordered_by}
              onChange={handleChange}
              placeholder="Ordered By"
              className="w-full rounded border border-gray-300 p-2"
            />

            <input
              type="date"
              name="deli_last_date"
              value={formData.deli_last_date}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="focus:bg-primary w-full rounded border border-gray-300 p-2 px-2 py-1 focus:p-0.5"
            >
              <option value="">Select Profile Status</option>
              {profileStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="orderAmount"
              value={formData.orderAmount}
              onChange={handleChange}
              placeholder="Order Amount"
              className="w-full rounded border border-gray-300 p-2"
            />

            <input
              type="number"
              name="bonus"
              value={formData.bonus}
              onChange={handleChange}
              placeholder="Bonus"
              className="w-full rounded border border-gray-300 p-2"
            />

            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rating"
              className="w-full rounded border border-gray-300 p-2"
            />

            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Department"
              className="w-full rounded border border-gray-300 p-2"
            />

            <input
              type="text"
              name="project_requirements"
              value={formData.project_requirements}
              onChange={handleChange}
              placeholder="Project Requirements"
              className="w-full rounded border border-gray-300 p-2"
            />

            <input
              type="text"
              name="profile"
              value={formData.profile}
              onChange={handleChange}
              placeholder="Profile Name"
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>

          <div className="flex gap-4">
            {/* <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Submit
            </button> */}
            <PrimaryButton>Submit</PrimaryButton>

            {/* <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
            >
              Cancel
            </button> */}
            <PrimaryButton onClick={() => setShowForm(false)}>
              Cancel
            </PrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProjectsUploadForm;
