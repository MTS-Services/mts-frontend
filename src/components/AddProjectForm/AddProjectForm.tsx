function AddProjectForm({ setShowModal }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submit here
    setShowModal(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add New Project</h2>
          <button
            className="text-xl font-bold text-red-500"
            onClick={() => setShowModal(false)}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="order_id"
            placeholder="# Order ID"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="clientName"
            placeholder="Client Name"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            name="order_amount"
            placeholder="Order Amount"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="sheet_link"
            placeholder="Sheet Link"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="date"
            name="delivery_date"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Department Select */}
          <select
            name="department"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Department</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
            {/* ডায়নামিক ডেটা চাইলে এখানে map করতে পারো */}
          </select>

          {/* Profile Select */}
          <select
            name="profile"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Profile</option>
            <option value="Fiverr">Fiverr</option>
            <option value="Upwork">Upwork</option>
            <option value="LinkedIn">LinkedIn</option>
            {/* ডায়নামিক ডেটা চাইলে এখানে map করতে পারো */}
          </select>

          {/* Ordered By Select */}
          <select
            name="ordered_by"
            className="border-primary w-full rounded border-2 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Ordered By</option>
            <option value="Munshi">Munshi</option>
            <option value="Kamrul">Kamrul</option>
            <option value="Sanny">Sanny</option>
            {/* ডায়নামিক ডেটা চাইলে এখানে map করতে পারো */}
          </select>

          <button
            type="submit"
            className="font-secondary bg-primary w-full rounded px-4 py-2 text-white hover:bg-blue-700"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProjectForm;
