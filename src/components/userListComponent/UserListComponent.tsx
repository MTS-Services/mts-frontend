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

<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between w-full">
  {/* 🔍 Search Bar */}
  <div className="w-full md:w-1/2">
    <div className="relative w-full max-w-md mx-auto md:mx-0 font-secondary ">
      <input
        type="text"
        placeholder="Search by user..."
        className="w-full pl-11 pr-4 py-2 text-sm sm:text-base rounded-full shadow-md border border-accent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
        transition duration-300   text-accent bg-background  "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg sm:text-xl" />
    </div>
  </div>

  {/* 🟦 Dropdown Filters */}
  <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 justify-center items-center">
    <select 
      defaultValue=""
      className="w-full sm:w-44 font-secondary px-4 py-2 text-sm border border-accent rounded-md  text-accent bg-background max-w-48  shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary  transition"
    >
      <option disabled value="" className="font-secondary ">
       Select male Or Famale
      </option>
      <option className=" ">Male</option>
      <option className=" ">Female</option>
      
    </select>

   <select
      defaultValue=""
      className="w-full sm:w-44 font-secondary px-4 py-2 text-sm border border-accent rounded-md  text-accent bg-background max-w-48  shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary  transition"
    >
      <option disabled value=""  className="font-secondary">
       Select Department
      </option>
      <option >Full Stack</option>
      <option >Fontend Developer</option>
      <option >UI/UX Designer</option>
      
    </select>
  </div>
</div>




      {/* Table */}
      <div className="overflow-x-auto mt-10">
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className=" text-accent text-lg font-primary">
              {tableHeaders.map((head, i) => (
                <th
                  key={head}
                  className={`px-2 py-1 text-lg	  ${
                    i === 0 ? "py-3" : ""
                  }`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="border-t-2  border-accent font-secondary">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, i) => (
                <tr
                  key={i}
                  className="border-b-1 border-accent/40 border-dashed  font-secondary text-accent  hover:text-white text-sm hover:bg-primary "
                >
                  <td className="px-2 py-1 flex items-center justify-center">
                    <div className="w-12 h-12 overflow-hidden rounded-full">
                      <img
                        className="w-full h-full object-cover"
                        src={user.image}
                        alt="avatar"
                      />
                    </div>
                  </td>
                  <td className="px-1 font-light	 py-2 text-sm">
                    {user.name}
                  </td>
                  <td className="px-1 font-light py-2 text-base">
                    {user.email}
                  </td>
                  <td className="px-1 font-light py-2 text-base">
                    {user.phone}
                  </td>
                  <td className="px-1 font-light py-2 text-base">
                    {user.address}
                  </td>
                  <td className="px-1 font-light py-2 text-base">
                    {user.altPhone}
                  </td>
                  <td className="px-1 font-light py-2 text-base">
                    {user.job}
                  </td>
                  <td className="px-1 font-light py-2 text-base">
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
