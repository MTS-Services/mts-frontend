import React from "react";
import { useTheme } from "@mui/material/styles";

interface SingleTeamDistributionProps {
  item: { clientName: string; id: number };
}

const SingleTeamDistribution: React.FC<SingleTeamDistributionProps> = ({
  item,
}) => {
  const { theme } = useTheme();
  return (
    <tr
      className={`${
        theme === "light-mode" ? "even:bg-primary/92" : "even:bg-primary/20"
      } odd:bg-primary`}
    >
      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <p className="p-2">{item.clientName}</p>
        <p className="p-2">#{item.id}</p>
      </td>
    </tr>
  );
};

export default SingleTeamDistribution;
