import { useEffect } from "react";
import { useParams } from "react-router";

const SingleProfilePage = () => {
  const { id } = useParams(); 

  // Fetch user data
  useEffect(() => {
    const profileData = async () => {
      setLoading(true);
      setMessage("");  // Clear previous message
      try {
        // Authorization header with Bearer token
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Use token for authorization
        };

        const res = await axios.get(
          `https://mtsbackend20-production.up.railway.app/api/profile/singleprofile/${id}`,
          { headers }  // Pass the authorization header
        );

        const profileData = res.data.teamMember;

        // Normalize the user data
        // const userData = {
        //   dp: fetchedUser.dp || "/default.jpg",
        //   first_name: fetchedUser.first_name || "",
        //   last_name: fetchedUser.last_name || "",
        //   email: fetchedUser.email || "",
        //   number: fetchedUser.number || "",
        //   permanent_address: fetchedUser.permanent_address || "",
        //   present_address: fetchedUser.present_address || "",
        //   gender: fetchedUser.gender || "",
        //   blood_group: fetchedUser.blood_group || "",
        //   relationship: fetchedUser.relationship || "",
        //   education: fetchedUser.education || "",
        //   guardian_relation: fetchedUser.guardian_relation || "",
        //   guardian_number: fetchedUser.guardian_number || "",
        //   guardian_address: fetchedUser.guardian_address || "",
        //   religion: fetchedUser.religion || "",
        //   department_name: fetchedUser?.department?.department_name || "",
        //   role: fetchedUser.role || "N/A",
        //   // status: fetchedUser.status || "Active",
        //   // joined: fetchedUser.joining_date || "N/A",
        //   // last_login: fetchedUser.last_login || "N/A",
        //   // access_level: fetchedUser.access_level || "User",
        // };

        console.log( "this sis tepartment part",userData.department_name)

        console.log("this is a testing data in the fild and user ",userData)
        setUser(userData);
        setEditedUser(userData);  // Initialize the edited user data
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Error fetching user details. Please try again.");
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchUserData();
  }, [id, token]);  // Re-fetch data when `id` or `token` changes






 
  return (
    <div className="p-6 max-w-6xl mx-auto">

<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 text-accent font-primary">
  👤 Profile Overview
</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Profile Name</h3>
          <p className="text-xl text-accent font-secondary font-medium">{profileData.name}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">TotalSetted Promotion Name</h3>
          <p className="text-xl text-accent font-secondary font-medium">{profileData.totalSetted_Promotion_Name}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Permission & Category</h3>
          <p className="text-sm text-accent font-secondary">{profileData.permission}</p>
          <p className="text-sm text-accent/80 font-secondary">{profileData.category}</p>
        </div>

        {/* <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Special Order Person</h3>
          <p className={`text-sm font-medium font-secondary ${profileData.isSpecialOrderPerson ? "text-green-500" : "text-red-500"}`}>
            {profileData.isSpecialOrderPerson }
          </p>

          {profileData.isSpecialOrderPerson && (
            <div className="mt-2">
              <p className="list-disc flex list-inside text-sm text-neutral-700">
                {profileData.specialOrderTakenFrom.map((name, index) => (
                  <span className="font-secondary text-accent gap-2 px-2" key={index}>{name}</span>
                ))}
              </p>
            </div>
          )}
        </div> */}

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Total Earning</h3>
          <p className="text-2xl font-medium text-accent font-secondary">{profileData.totalEarning}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Promotion</h3>
          <p className="text-sm text-accent font-medium font-secondary">{profileData.promotion}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">This Month's Special Orders</h3>
          <p className="text-xl font-medium text-accent font-secondary">{profileData.thisMonthSpecialOrder}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">This Month's Earning</h3>
          <p className="text-xl font-medium text-accent font-secondary">{profileData.thisMonthEarning}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Rank Keywords</h3>
          <div className="flex flex-wrap gap-2 mt-2 font-secondary">
            {profileData.rankKeywords.map((keyword, i) => (
              <span key={i} className="px-2 py-1  text-accent font-secondary text-base	  rounded-full">
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Total Projects</h3>
          <p className="text-xl font-medium text-accent font-secondary">{profileData.totalProjects}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Average Rating</h3>
          <p className="text-xl font-medium text-yellow-500 font-secondary">{profileData.averageRating} ⭐</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Current Ranking</h3>
          <p className="text-xl font-medium text-red-500 font-secondary">#{profileData.currentRanking}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProfilePage;
