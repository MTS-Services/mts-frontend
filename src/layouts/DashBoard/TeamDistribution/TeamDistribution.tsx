import { useState, useEffect } from "react";

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
      ["Alex", "$564", "$233", "$56", "$2", "$56", "$1", "$2"],
      ["Alex", "$564", "$233", "$56", "$2", "$1", "$1", "$9"],
      ["Alex", "$564", "$233", "$56", "$2", "$13", "$2", "$2"],
      ["Alex", "$564", "$233", "$2", "$2", "$1", "$1", "$9"],
      ["Alex", "$564", "$332", "$3", "$2", "$1", "$1", "$7"],
      ["Alex", "$564", "$323", "$3", "$2", "$1", "$2", "$3"],
      ["Alex", "$5634", "$32", "$2", "$2", "$2", "$2", "$2"],
      ["Alex", "$564", "$332", "$56", "$2", "$1", "$3", "$1"],
    ];
    setTableData(data);
  }, []);

  const calculateColumnTotals = () => {
    const totals = new Array(tableHeaders.length).fill(null);
    tableHeaders.forEach((_, index) => {
      let total = 0;
      tableData.forEach((row) => {
        const value = parseFloat(row[index]?.replace("$", "")) || 0;
        total += value;
      });
      totals[index] = `$${total.toFixed(2)}`;
    });
    return totals;
  };

  const totalRow = calculateColumnTotals();

  return (
    <div className="bg-background min-h-screen w-full overflow-x-auto px-6 py-10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className="bg-secondary border-accent font-primary border text-base text-white">
              {tableHeaders.map((head, i) => (
                <th
                  key={head}
                  className={`border border-white px-2 py-3 text-center ${
                    i === 0 ? "border-x" : ""
                  }`}
                >
                  {i === 0 ? (
                    <span className="font-bold">{head}</span>
                  ) : (
                    <div className="flex items-center justify-center gap-1 font-bold">
                      <span>{head}</span>
                      <span className="text-wihtis text-sm">
                        - {totalRow[i]}
                      </span>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="border-2 border-white">
            {tableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="odd:bg-primary even:bg-primary/70 hover:bg-primary/80 text-sm text-white transition-all"
              >
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border-secondary border-r px-2 py-3 text-center ${
                      colIndex === 0 ? "border-x" : ""
                    }`}
                  >
                    {/* First two columns as-is, others only amount */}
                    {colIndex < 2 ? (
                      <span className="font-semibold text-white">{cell}</span>
                    ) : (
                      <span className="font-primary text-sm text-white">
                        {cell}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamDistribution;
