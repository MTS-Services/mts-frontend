import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const UserListComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const userData = [
    {
      name: "Milon Mia",
      email: "milon.mia@gmail.com",
      phone: "013195572372",
      address: "Dhaka",
      altPhone: "013254395067",
      job: "Full Stack Developer",
      education: "B.Sc in CSE",
      image: "/assits/Rewardspage/r1.png",
    },
    {
      name: "Nusrat Jahan",
      email: "nusrat.jahan@gmail.com",
      phone: "01711551234",
      address: "Chittagong",
      altPhone: "01987654321",
      job: "UI/UX Designer",
      education: "BFA in Graphic Design",
      image: "/assits/Rewardspage/r2.png",
    },
    {
      name: "Shahriar Kabir",
      email: "shahriar.kabir@mail.com",
      phone: "01612345678",
      address: "Rajshahi",
      altPhone: "01899999888",
      job: "Frontend Developer",
      education: "Diploma in Computer Science",
      image: "/assits/Rewardspage/r3.png",
    },
    {
      name: "Niloy Hasan",
      email: "niloy.hasan@yahoo.com",
      phone: "01478523694",
      address: "Khulna",
      altPhone: "01358974231",
      job: "Backend Engineer",
      education: "M.Sc in Software Engineering",
      image: "/assits/Rewardspage/r4.png",
    },
    {
      name: "Rifa Anjum",
      email: "rifa.anjum@outlook.com",
      phone: "01345789236",
      address: "Sylhet",
      altPhone: "01752463129",
      job: "QA Analyst",
      education: "B.Sc in IT",
      image: "/assits/Rewardspage/r5.png",
    },
    {
      name: "Giling Komer",
      email: "giling.komer@domain.com",
      phone: "01928475632",
      address: "Barisal",
      altPhone: "01862345719",
      job: "DevOps Engineer",
      education: "B.Sc in Computer Engineering",
      image: "/assits/Rewardspage/r6.png",
    },
  ];

  // ✅ WORKING FILTER — now email search works too!
  const filteredUsers = userData.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term) ||
      user.altPhone.toLowerCase().includes(term) ||
      user.job.toLowerCase().includes(term) ||
      user.address.toLowerCase().includes(term) ||
      user.education.toLowerCase().includes(term)
    );
  });

  const tableHeaders = [
    "ProfileImg",
    "Name",
    "E-mail",
    "Phone Number",
    "Permanent Address",
    "Guardian Number",
    "Department",
    "Education",
  ];

  return (
    <div className="w-full overflow-x-auto py-10 sm:px-4 bg-background min-h-screen lg:px-14 md:px-10 px-6">
      {/* Search Bar */}
      <div className="flex justify-center items-center px-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by user,.."
            className="w-full pl-12 pr-4 py-1 text-xs rounded-full shadow-lg border border-accent hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition duration-300 ease-in-out text-secendary  sm:text-base bg-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary text-xl" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-10">
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className=" text-accent text-xs">
              {tableHeaders.map((head, i) => (
                <th
                  key={head}
                  className={`px-2 py-1 text-xs	  ${
                    i === 0 ? "py-3" : ""
                  }`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="border-t-2  border-accent">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, i) => (
                <tr
                  key={i}
                  className="border-b-1 border-accent/40 border-dashed  text-accent  hover:text-accent text-sm hover:bg-primary/80 "
                >
                  <td className="px-2 py-1 flex items-center justify-center">
                    <div className="w-8 h-8 overflow-hidden rounded-full">
                      <img
                        className="w-full h-full object-cover"
                        src={user.image}
                        alt="avatar"
                      />
                    </div>
                  </td>
                  <td className="px-1 font-thin	 py-2 text-[10px]">
                    {user.name}
                  </td>
                  <td className="px-1 font-thin	 py-2 text-[10px]">
                    {user.email}
                  </td>
                  <td className="px-1 font-thin	 py-2 text-[10px] ">
                    {user.phone}
                  </td>
                  <td className="px-1 font-thin	 py-2 text-[10px]">
                    {user.address}
                  </td>
                  <td className="px-1 font-thin	 py-2 text-[10px]">
                    {user.altPhone}
                  </td>
                  <td className="px-1 font-thin	 py-2 text-[10px]">
                    {user.job}
                  </td>
                  <td className="px-1 font-thin	 py-2 text-[10px] ">
                    {user.education}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-6 text-red-500">
                  No matching users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListComponent;
