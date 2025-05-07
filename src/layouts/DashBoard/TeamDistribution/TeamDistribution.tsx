import React, { useState, useEffect } from "react";
import SingleTeamDistribution from "./SingleTeamDistribution"; // adjust path if needed

const TeamDistribution = () => {
  const tableHeaders = [
    "Client Name",
    "Project Price",
    "Munshi",
    "Kamrul",
    "Nayme",
    "Sanny",
    "Masud",
    "Joni",
  ];

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const data = [
      {
        clientName: "Alex",
        id: "1",
        total: "$564",
        paid: "$233",
        due: "$56",
        discount: "$2",
        tax: "$56",
        fee: "$1",
        misc: "$2",
      },
      {
        clientName: "Blex",
        id: "2",
        total: "$764",
        paid: "$333",
        due: "$76",
        discount: "$4",
        tax: "$66",
        fee: "$2",
        misc: "$3",
      },
      {
        clientName: "Clex",
        id: "3",
        total: "$864",
        paid: "$433",
        due: "$96",
        discount: "$6",
        tax: "$76",
        fee: "$3",
        misc: "$4",
      },
      {
        clientName: "Dlex",
        id: "4",
        total: "$864",
        paid: "$433",
        due: "$96",
        discount: "$6",
        tax: "$76",
        fee: "$3",
        misc: "$4",
      },
    ];

    setTableData(data);
  }, []);

  const calculateColumnTotals = () => {
    const totals = [""]; // skip Client Name column

    tableData.forEach((row) => {
      const values = [
        parseFloat(row.total?.replace("$", "") || 0),
        parseFloat(row.paid?.replace("$", "") || 0),
        parseFloat(row.due?.replace("$", "") || 0),
        parseFloat(row.discount?.replace("$", "") || 0),
        parseFloat(row.tax?.replace("$", "") || 0),
        parseFloat(row.fee?.replace("$", "") || 0),
        parseFloat(row.misc?.replace("$", "") || 0),
      ];

      values.forEach((val, i) => {
        totals[i + 1] = (totals[i + 1] || 0) + val;
      });
    });

    return totals.map((val) =>
      typeof val === "number" ? `$${val.toFixed(2)}` : val,
    );
  };

  const totalRow = calculateColumnTotals();

  return (
    <div className="bg-background min-h-screen w-full overflow-x-auto px-6 py-10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className="bg-secondary border border-white text-[16px] text-white">
              {tableHeaders.map((head, i) => (
                <th
                  key={head}
                  className={`border border-white px-2 py-3 text-center ${
                    i === 0 ? "border-x" : ""
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-bold">{head}</span>
                    {i === 0 ? null : (
                      <span className="text-sm">{totalRow[i]}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="border-2 border-white">
            {tableData.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-primary even:bg-primary/70 hover:bg-primary/80 text-sm text-white transition-all"
              >
                <SingleTeamDistribution item={item} />
                <td className="border-secondary border-r px-2 py-3">
                  {item.total}
                </td>
                <td className="border-secondary border-r px-2 py-3">
                  {item.paid}
                </td>
                <td className="border-secondary border-r px-2 py-3">
                  {item.due}
                </td>
                <td className="border-secondary border-r px-2 py-3">
                  {item.discount}
                </td>
                <td className="border-secondary border-r px-2 py-3">
                  {item.tax}
                </td>
                <td className="border-secondary border-r px-2 py-3">
                  {item.fee}
                </td>
                <td className="border-secondary border-r px-2 py-3">
                  {item.misc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamDistribution;
