import EmployeeSummary from "../EmployeeSummary/EmployeeSummary";

const UserInformation = () => {
  const user = {
    avatar: '/assits/Rewardspage/profileImg.jpg',
    name: 'Liam Smith',
    username: 'liams',
    email: 'liam@example.com',
    phone: '+880123456789',

    // Personal Information
    permanent_address: 'Dhaka, Bangladesh',
    present_address: 'Dhaka',
    gender: 'male',
    blood_group: 'O+',
    relationship_status: 'unmarried',
    education: 'BSc',

    // Guardian Information
    guardian_relation: 'brother',
    guardian_number: '01419559275',
    guardian_address: 'Dhaka',
    religion: 'Islam',

    // Work Details
    department: 'Development',
    role: 'Senior Engineer',
    location: 'Dhaka, Bangladesh',
    manager: 'John Doe',
    status: 'Active',
    joined: 'Jan 10, 2024',
    last_login: 'Apr 10, 2025',
    access_level: 'Admin',
  };

  // === Reusable Info Line Component ===
  const Info = ({ label, value }) => (
    <p className=" text-lg  font-light text-accent felx   mb-2 pr-1 font-primary border-b pb-1 border-accent/20 flex items-center">
      <strong className="pr-1 text-lg  font-light font-primary"> {label} : </strong> {value}
    </p>
  );

  return (
    <section className="min-h-screen p-10">
    <div className="max-w-6xl mx-auto  bg-card p-8 rounded-xl shadow-md  shadow-primary ">
         {/* === Header === */}
       
<div className="flex items-center justify-between flex-wrap md:py-0 py-1">
   <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-4 ">
         <img
  src={user.avatar}
  alt="User Avatar"
  className="w-20 h-20 shadow-primary rounded-full shadow-md"
/>
            <div>
              <h2 className="text-3xl font-primary  text-primary text-shadow-md ">
                {user.name}
              </h2>
              <p className="text-accent font-bold text-sm capitalize">{user.role}</p>
            </div>
          </div>
        </div>
        {/* ----------------Edit password section------------------- */}
     <div className="flex justify-center">
  <button
    type="submit"
    className="group relative flex items-center justify-center px-8 py-2 text-base font-bold text-background rounded-full bg-primary shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-95"
  >
    <span className="relative z-10">Edit your password & info</span>
    <span className="absolute inset-0 w-full h-full -left-full rounded-full bg-gradient-to-r from-blue-800 to-blue-300 transition-all duration-700 ease-in-out group-hover:left-0 z-0"></span>
  </button>
</div>

     


</div>
        {/* === Grid Sections === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* === Personal Info === */}
          <div>
            <h3 className="text-3xl font-primary  border-b pb-1 border-accent/40 text-primary text-shadow-md mb-4">
              Personal Info
            </h3>
            <Info label="Username" value={user.username} />
            <Info label="Email" value={user.email} />
            <Info label="Phone" value={user.phone} />
            <Info label="Present Address" value={user.present_address} />
            <Info label="Permanent Address" value={user.permanent_address} />
            <Info label="Gender" value={user.gender} />
            <Info label="Blood Group" value={user.blood_group} />
            <Info label="Relationship Status" value={user.relationship_status} />
            <Info label="Education" value={user.education} />
          </div>

          {/* === Work Details === */}
          <div>
            <h3 className="text-3xl font-primary  border-b pb-1 border-accent/40 text-primary text-shadow-md mb-4">
              Work Details
            </h3>
            <Info label="Department" value={user.department} />
            <Info label="Role" value={user.role} />
            <Info label="Location" value={user.location} />
            <Info label="Manager" value={user.manager} />
            <Info label="Status" value={user.status} />
            <Info label="Joined" value={user.joined} />
            <Info label="Last Login" value={user.last_login} />
            <Info label="Access Level" value={user.access_level} />
          </div>

          {/* === Guardian Info === */}
          <div>
            <h3 className="text-3xl font-primary  border-b pb-1 border-accent/40 text-primary text-shadow-md mb-4">
              Guardian Info
            </h3>
            <Info label="Relation" value={user.guardian_relation} />
            <Info label="Phone" value={user.guardian_number} />
            <Info label="Address" value={user.guardian_address} />
            <Info label="Religion" value={user.religion} />
          </div>

        </div>
       </div>
{/* --------------User works details-------------------- */}
      <div className="">
<EmployeeSummary></EmployeeSummary>

      </div>




  
    </section>
  );
};

export default UserInformation;
