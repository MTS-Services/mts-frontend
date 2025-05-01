import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../../components/Loading/Loading";

const ProjectsDetail = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    // Simulate data fetch for project details
    const projectData = {
      id: 1,
      order_id: "OrderThisMonth1",
      date: "2024-12-01",
      project_name: "Project This Month 1",
      ops_status: "delivered",
      sales_comments: "Sales Comment for This Month 1",
      opsleader_comments: "Ops Leader Comment for This Month 1",
      sheet_link: "http://link-to-sheet-1.com",
      ordered_by: 2,
      deli_last_date: "2025-04-16",
      status: "active",
      order_amount: "5600",
      after_fiverr_amount: "4480",
      bonus: "210",
      after_Fiverr_bonus: "168",
      rating: 5,
      department_id: 2,
      project_requirements: "Requirements for project 1",
      profile_id: 2,
      team_id: null,
      department: {
        id: 2,
        department_name: "plugin",
        department_target: "5305",
        department_achieve: "973",
        department_cancel: "419",
        department_special_order: "948",
        department_designation: "Designation 2",
        project_requirements: "Requirement for department plugin",
        total_carry: null
      },
      team_member: {
        id: 2,
         Team_Name: "Mern Team",
       Leader_Name: "Mern",
       Total_Team_Member: "123452",
         Cancel_Projects:"23",
         Team_Achieve:"$1553",
          Team_Target:"$34554",
          Total_Revision: "24",
         team_id: 3,
         religion: "Religion",
         education: "Bachelors",
         dp: "dp2.jpg",
         role: "Junior Developer",
         target: "117",
        rewards: "1289",
        rating: "0",
        account_status: "Active",
        password: null,
        designation: "Developer",
        uid: null,
        profile: [
          {
            id: 2,
            created_date: "2025-04-13T06:51:34.753Z",
            profile_name: "Profile 2",
            order_amount: "845",
            bonus_amount: "1206",
            order_count: 1,
            rank: "85",
            cancel_count: 9,
            complete_count: 2,
            no_rating: 2,
            profile_target: "7622",
            department_id: 3,
            repeat_order: "4867",
            keywords: "Keyword 2",
            total_rating: "69"
          }
        ]
      },
      clientName: "Project This Month 1"
    };

    // Simulate an API call delay
    setTimeout(() => {
      setUser(projectData);
      setEditedUser(projectData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setUser(editedUser);
        setIsEditing(false);
        setLoading(false);
        toast.success("User information updated successfully!");
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update user information. Please try again.");
    }
  };

  const Info = ({ label, field, value, editable = false, onChange }) => (
    <p className="text-base font-light text-accent mb-2 pr-1 font-secondary border-b pb-1 border-accent/20 flex items-center">
      <strong className="pr-1">{label}:</strong>
      {editable ? (
        <input
          type="text"
          value={editedUser[field] || ""}
          onChange={(e) => onChange(field, e.target.value)}
          className="border p-1 rounded-md"
        />
      ) : (
        value
      )}
    </p>
  );

  if (loading || !user) return <Loading />;

  return (
    <section className="lg:py-12 py-8 ">
      <div className=" mx-auto bg-card p-8 rounded-xl shadow-md shadow-primary">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
         
            <div>
              <h2 className="md:text-2xl text-xl font-primary text-primary text-shadow-md">
                {user.team_member.first_name} <span>{user.team_member.last_name}</span>
              </h2>
              <p className="text-accent text-sm capitalize font-secondary">{user.project_name}</p>
            </div>
          </div>

          <div className="flex justify-center flex-wrap gap-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="py-2 px-6 text-background text-base font-bold rounded-full bg-primary shadow-md hover:scale-105 transition-all"
            >
              {isEditing ? "Cancel" : "Edit User Info"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="py-2 px-6 text-background text-base font-bold rounded-full bg-primary shadow-md hover:scale-105 transition-all"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Three Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3  gap-10 mt-8">
          <div>
            <h3 className="text-2xl font-primary border-b pb-1 border-accent/40 text-primary text-shadow-md mb-4 uppercase">
              Project Info
            </h3>
            {[
              "clientName", "date", "order_id", "ops_status", "sales_comments", "opsleader_comments", "sheet_link", "deli_last_date", "order_amount", "after_fiverr_amount", "bonus", "after_Fiverr_bonus", "rating"
            ].map((field) => (
              <Info
                key={field}
                label={field.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                field={field}
                value={user[field]}
                editable={isEditing}
                onChange={handleInputChange}
              />
            ))}
          </div>

          <div>
            <h3 className="text-2xl font-primary border-b pb-1 border-accent/40 text-primary text-shadow-md mb-4 uppercase">
              Department Info
            </h3>
            {[
              "department_name", "department_target", "department_achieve", "department_cancel",  "department_designation", "project_requirements"
            ].map((field) => (
              <Info
                key={field}
                label={field.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                field={field}
                value={user.department[field]}
                editable={isEditing}
                onChange={handleInputChange}
              />
            ))}
          </div>

          <div>
            <h3 className="text-2xl font-primary border-b pb-1 border-accent/40 text-primary text-shadow-md mb-4 uppercase">
              Team  Info
            </h3>
            {[
              "Team_Name",  "Leader_Name", "Total_Team_Member","Total_Revision",
            ].map((field) => (
              <Info
                key={field}
                label={field.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                field={field}
                value={user.team_member[field]}
                editable={isEditing}
                onChange={handleInputChange}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectsDetail;
