import { useState } from "react";
import { toast } from "react-toastify";
import { useApiRequest } from "../../hooks/useApiRequest"; // make sure path is correct

function SingleDistributionPage({
  item,
  teamMembers,
  refetch,
  roleBasePermissionThree,
}) {
  const [isEditing, setIsEditing] = useState(false);

  // Initialize distribution amounts in the same order as teamMembers
  const initialValues = teamMembers.map((member) => {
    const dist = item.distributions.find((d) => d.team_member_id === member.id);
    return dist?.amount || 0;
  });

  const [localData, setLocalData] = useState(initialValues);

  const handleChange = (index, value) => {
    const updated = [...localData];
    updated[index] = Number(value); // Ensure it's a number
    setLocalData(updated);
  };

  const totalDistribution = localData.reduce(
    (sum, val) => sum + Number(val || 0),
    0,
  );
  const exceeds = totalDistribution > Number(item.amount);
  const matches = totalDistribution === Number(item.amount);

  const { execute } = useApiRequest({
    method: "PUT",
    autoFetch: false,
  });

  const handleSubmit = async () => {
    if (!matches) {
      toast.error("Total distribution must exactly match the project price.");
      return;
    }

    try {
      const updatePromises = teamMembers.map((member, index) => {
        const dist = item.distributions.find(
          (d) => d.team_member_id === member.id,
        );
        if (dist) {
          return execute(
            { amount: localData[index] },
            `https://mtsbackend20-production.up.railway.app/api/today-task/distribution/${dist.id}`,
          );
        }
        return null;
      });

      await Promise.all(updatePromises);
      toast.success("Distribution updated successfully.");
      setIsEditing(false);
      if (refetch) refetch();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update distribution.");
    }
  };

  return (
    <tr className="odd:bg-secondary even:bg-background text-accent">
      <td className="border-primary border px-4 py-2">{item.client_name}</td>
      <td className="border-primary border px-4 py-2">{item.amount}</td>

      {teamMembers.map((_, idx) => (
        <td key={idx} className="border-primary border px-4 py-2">
          {isEditing ? (
            <input
              type="number"
              value={localData[idx]}
              onChange={(e) => handleChange(idx, e.target.value)}
              className={`w-20 rounded border px-2 py-1 text-sm ${
                exceeds ? "border-red-500 bg-red-100" : "border-gray-300"
              }`}
            />
          ) : (
            localData[idx]
          )}
        </td>
      ))}
      {roleBasePermissionThree && (
        <td className="border-primary border px-4 py-2">
          {isEditing ? (
            <button
              onClick={handleSubmit}
              disabled={!matches}
              className={`rounded px-3 py-1 text-sm text-white ${
                matches
                  ? "bg-green-600 hover:bg-green-700"
                  : "cursor-not-allowed bg-gray-400"
              }`}
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </td>
      )}
    </tr>
  );
}

export default SingleDistributionPage;
