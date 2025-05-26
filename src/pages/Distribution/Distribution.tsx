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
    <section className="font-secondary mt-12 w-full overflow-x-hidden">
      <div className="mx-auto w-full rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border border-white text-left text-white">
            <thead>
              <tr className="bg-secondary border border-white text-[16px] font-bold">
                <th className="border border-white px-4 py-3">Client Name</th>
                <th className="border border-white px-4 py-3">Project Price</th>
                {teamMembers.map((member) => (
                  <th
                    key={member.id}
                    className="border border-white px-4 py-3 text-left"
                  >
                    {member.first_name}
                  </th>
                ))}
                {roleBasePermissionThree && (
                  <th className="border border-white px-4 py-3 text-left">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="border border-white">
              {distributions.map((item, index) => (
                <SingleDistributionPage
                  key={index}
                  index={index}
                  item={item}
                  roleBasePermissionThree={roleBasePermissionThree}
                  teamMembers={teamMembers}
                  refetch={refetch}
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
