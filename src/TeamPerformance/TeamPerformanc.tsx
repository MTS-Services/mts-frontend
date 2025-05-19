import { useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import MtsBarChar from "../components/Chart/MtsBarChart/MtsBarChart";
import MtsLineChart from "../components/Chart/MtsLineChart/MtsLineChart";
import { useFetchData } from "../hooks/useFetchData";

const TeamPerformance = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedQuater, setSelectedQuater] = useState("");
  interface TableRow {
    clientName: string;
    after_fiverr_amount?: number;
    status?: string;
    bonus?: number;
  }

  const { data, loading } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/profile/quarterly-performance",
    "GET",
    null,
    {
      refetchInterval: 2000, // Auto refetch every 2s
    },
  );

  const target = data?.teamQuarterlyPerformance?.target;
  const achive = data?.teamQuarterlyPerformance?.achieved;
  const result = target - achive;

  console.log("tmp", data);

  const tableData = data?.teamMembersQuarterly;

  const lastQuarter = [
    {
      title: "Target",
      amount: target,
      note: "mr",
    },
    {
      title: "Achieve",
      amount: achive,
      note: "mr",
    },
    { title: "+/-", amount: result, note: "mr" },
  ];

  const tableHeaders = ["Member Name", "Target", "Achive price", "+/-"];

  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const quarterName = [
    "1st January to 31st March",
    "1st April to 30th June",
    "1st July to 30th September",
    "1st October to 31st December",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mtsbackend20-production.up.railway.app/api/project",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              page: "1",
              limit: "10",
            }),
          },
        );

        const data = await response.json();
        if (data?.projects && Array.isArray(data.projects)) {
          setTableData(data.projects);
        } else {
          console.error("API response is not in the expected format:", data);
          setTableData([]); // Fallback to empty array if response is not in the expected format
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const barChartCardData = data?.teamMembersQuarterly?.map((member) => ({
    memberName: member.team_member_name,
    target: member.quarterly_target,
    earned: member.achieved,
  }));
  const weeklyAchievementBreakdown = [];

  return (
    <div className="bg-background min-h-screen w-full overflow-x-auto px-6 py-10 sm:px-4 md:px-10">
      <div>
        <div className="mt-14 mb-5 flex items-center gap-4">
          <h2 className="my-5 text-4xl text-white">Current Quarter</h2>
          <select
            className="bg-background rounded px-4 py-1 text-white outline-none"
            value={selectedQuater}
            onChange={(e) => setSelectedQuater(e.target.value)}
          >
            {quarterName.map((quarter) => (
              <option key={quarter} value={quarter}>
                {quarter}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-start gap-2">
          {lastQuarter.map(({ title, amount, note }, idx) => (
            <div
              key={idx}
              className="bg-primary border-border-color relative w-full rounded-sm border-2 p-4 text-white md:w-[30%] lg:h-28 lg:w-[20%] xl:w-[14%]"
            >
              <h2 className="text-sm md:text-xl">{title}</h2>
              <h2 className="text-sm md:text-xl">{amount}</h2>
              {note && (
                <div className="group absolute top-2 right-2">
                  <MdInfoOutline className="text-xl" />
                  <div className="pointer-events-none absolute top-6 right-0 z-10 w-40 rounded bg-black p-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                    {note}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mt-14 mb-5 flex items-center gap-4">
          <h2 className="mb-5 text-4xl text-white">
            Quater Base Member Performance
          </h2>
          <select
            className="bg-background rounded px-4 py-1 text-white outline-none"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {monthName.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="bg-secondary border border-white text-[16px] text-white">
                {tableHeaders.map((head, i) => (
                  <th
                    key={head}
                    className={`border border-white px-2 py-3 ${
                      i === 0 ? "border-x" : ""
                    }`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="border-2 border-white">
              {tableData?.length > 0 ? (
                tableData.map((row, i) => (
                  <tr
                    key={i}
                    className="odd:bg-primary even:bg-primary/70 hover:bg-primary/80 transform text-sm text-white transition-all duration-300 ease-in-out"
                  >
                    <td className="border-secondary font-primary border-r px-2 py-3 font-normal">
                      {row.team_member_name}
                    </td>

                    <td className="border-secondary font-primary border-r px-2 py-3 font-normal">
                      $ {row?.quarterly_target}
                    </td>

                    <td className="border-secondary font-primary border-r px-2 py-3 font-normal">
                      $ {row?.achieved}
                    </td>
                    <td className="border-secondary font-primary border-r px-2 py-3 font-normal">
                      $ {row?.quarterly_target - row?.achieved}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={tableHeaders.length}
                    className="py-4 text-center"
                  >
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <section className="pr-5">
        {/* Charts Row 1 */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="bg-background border-primary font-primary min-h-96 rounded border-2 p-5 shadow-lg">
            <MtsBarChar barData={barChartCardData} />
          </div>
          <div className="bg-background border-primary font-primary min-h-96 rounded border-2 p-5 shadow-lg">
            <MtsLineChart lineData={weeklyAchievementBreakdown} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPerformance;
