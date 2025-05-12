import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useFetchData } from "../../hooks/useFetchData";
import SingleDistributionPage from "./SingleDistributionPage";

function Distribution() {
  const { data, refetch } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/today-task/distribution",
  );

  const { roleBasePermissionThree } = useContext(AuthContext);

  const distributions = data || [];

  const teamMembersMap = new Map();
  distributions.forEach((item) => {
    item.distributions?.forEach((dist) => {
      const id = dist.team_member_details?.id;
      if (id && !teamMembersMap.has(id)) {
        teamMembersMap.set(id, dist.team_member_details);
      }
    });
  });
  const teamMembers = Array.from(teamMembersMap.values());

  return (
    <section className="bg-background font-primary min-h-screen p-4 md:p-8">
      <div className="bg-secondary border-primary mx-auto w-full max-w-7xl rounded-lg border p-4 shadow-md md:p-6">
        <h3 className="text-primary font-primary mb-4 text-center text-xl font-bold md:text-2xl">
          Distribution List
        </h3>
        <div className="overflow-x-auto">
          <table className="border-primary w-full table-auto border text-sm md:text-base">
            <thead className="bg-primary text-white">
              <tr>
                <th className="border-primary border px-4 py-2 text-left">
                  Client Name
                </th>
                <th className="border-primary border px-4 py-2 text-left">
                  Project Price
                </th>
                {teamMembers.map((member) => (
                  <th
                    key={member.id}
                    className="border-primary border px-4 py-2 text-left"
                  >
                    {member.first_name}
                  </th>
                ))}
                {roleBasePermissionThree && (
                  <th className="border-primary border px-4 py-2 text-left">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {distributions.map((item, index) => (
                <SingleDistributionPage
                  key={index}
                  item={item}
                  roleBasePermissionThree={roleBasePermissionThree}
                  teamMembers={teamMembers}
                  refetch={refetch} // ✅ important!
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Distribution;
