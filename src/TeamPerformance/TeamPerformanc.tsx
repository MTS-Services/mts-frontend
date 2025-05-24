import { useEffect, useState } from "react";
import { TbTargetArrow } from "react-icons/tb";
import { GiStairsGoal } from "react-icons/gi";
import { PiPlusMinusDuotone } from "react-icons/pi";
import MtsBarChar from "../components/Chart/MtsBarChart/MtsBarChart";
import MtsLineChart from "../components/Chart/MtsLineChart/MtsLineChart";
import { useFetchData } from "../hooks/useFetchData";
import DisplayCard from "../components/DisplayCard/DisplayCard";
import CustomDropDown from "../layouts/DashBoard/UserDashBoard/CustomDropDown";

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
      title: "Target ",
      amount: target,
      icon: TbTargetArrow,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
    {
      title: "Achieve",
      amount: achive,
      icon: GiStairsGoal,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
    {
      title: "+/-",
      amount: result,
      icon: PiPlusMinusDuotone,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
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
    " January-March",
    " April-June",
    " July-September",
    " October-December",
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
    <div className="font-secondary w-full p-4">
      <div>
        <div className="mb-12 flex items-center gap-4">
          <h2 className="text-accent text-4xl font-semibold">
            Current Quarter
          </h2>
          <div>
            <CustomDropDown
              options={quarterName.map((q) => ({ label: q, value: q }))}
              value={{ label: selectedQuater, value: selectedQuater }}
              onChange={(selected: { label: string; value: string } | null) =>
                setSelectedQuater(selected?.value || "")
              }
              placeholder="Select Quarter"
            />
          </div>
        </div>

        {/*  Last Quarter Summary Cards Using DisplayCard */}
        <div className="border-accent/30 flex flex-wrap gap-5 border-b-1 pb-14">
          {lastQuarter.map((item, index) => (
            <DisplayCard
              key={index}
              title={item.title}
              amount={item.amount}
              icon={item.icon}
              message={item.message}
              width="min-w-[260px]"
            />
          ))}
        </div>
      </div>
      <div>
        <div className="mt-12 flex items-center gap-4">
          <h2 className="text-accent text-4xl font-semibold">
            Quater Base Member Performance
          </h2>
          <div>
            <CustomDropDown
              options={monthName.map((m) => ({ label: m, value: m }))}
              value={{ label: selectedMonth, value: selectedMonth }}
              onChange={(selected: { label: string; value: string } | null) =>
                setSelectedMonth(selected?.value || "")
              }
              placeholder="Select Month"
            />
          </div>
        </div>

        <div className="border-accent/30 mt-12 border-b-1 pb-12">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="bg-secondary border-border-color border-2 text-white">
                {tableHeaders.map((head, i) => (
                  <th
                    key={head}
                    className={`border border-white px-4 py-4 ${
                      i === 0 ? "border-x" : ""
                    }`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="border-border-color border-2">
              {tableData?.length > 0 ? (
                tableData.map((row, i) => (
                  <tr
                    key={i}
                    className="odd:bg-primary even:bg-primary/70 hover:bg-primary/80 transform text-sm text-white transition-all duration-300 ease-in-out"
                  >
                    <td className="border-secondary font-primary border-r px-4 py-4 font-normal">
                      {row.team_member_name}
                    </td>

                    <td className="border-secondary font-primary border-r px-4 py-4 font-normal">
                      $ {row?.quarterly_target}
                    </td>

                    <td className="border-secondary font-primary border-r px-4 py-4 font-normal">
                      $ {row?.achieved}
                    </td>
                    <td className="border-secondary font-primary border-r px-4 py-4 font-normal">
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
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
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
