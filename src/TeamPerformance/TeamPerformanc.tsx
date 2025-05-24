import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { TbTargetArrow } from "react-icons/tb";
import { GiStairsGoal } from "react-icons/gi";
import { PiPlusMinusDuotone } from "react-icons/pi";
import MtsBarChar from "../components/Chart/MtsBarChart/MtsBarChart";
import MtsLineChart from "../components/Chart/MtsLineChart/MtsLineChart";
import DisplayCard from "../components/DisplayCard/DisplayCard";
import CustomDropDown from "../layouts/DashBoard/UserDashBoard/CustomDropDown";

const TeamPerformance = () => {
  const [selectedMonth, setSelectedMonth] = useState("May");
  const [selectedQuater, setSelectedQuater] = useState(null);
  const [data, setData] = useState(null);

  const token = Cookies.get("core"); // ✅ Get token from cookie

  const getCurrentQuarter = () => Math.floor(new Date().getMonth() / 3) + 1;
  const getCurrentYear = () => new Date().getFullYear();

  useEffect(() => {
    const fetchQuarterData = async () => {
      const quarter = selectedQuater || getCurrentQuarter();
      const year = getCurrentYear();

      if (!token) {
        console.warn("No token found. Skipping request.");
        return;
      }

      try {
        const res = await fetch(
          `https://mtsbackend20-production.up.railway.app/api/profile/quarterly-performance?quarter=${quarter}&year=${year}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch quarterly performance:", error);
      }
    };

    fetchQuarterData();
  }, [selectedQuater, token]);

  const target = data?.teamQuarterlyPerformance?.target || 0;
  const achive = data?.teamQuarterlyPerformance?.achieved || 0;
  const result = target - achive;

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

  const tableHeaders = ["Member Name", "Target", "Achieve price", "+/-"];

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
    { label: "January-March", value: 1 },
    { label: "April-June", value: 2 },
    { label: "July-September", value: 3 },
    { label: "October-December", value: 4 },
  ];

  const filteredTableData = data?.teamMembersQuarterly?.map((member) => {
    const monthly = member.monthlyBreakdown?.find(
      (m) => m.month === selectedMonth,
    );
    return {
      team_member_name: member.team_member_name,
      quarterly_target: monthly?.target || 0,
      achieved: monthly?.achieved || 0,
    };
  });

  const barChartCardData = data?.teamMembersQuarterly?.map((member) => ({
    memberName: member.team_member_name,
    target: member.quarterly_target,
    earned: member.achieved,
  }));

  const weeklyAchievementBreakdown = []; // still empty as per your context

  return (
    <div className="font-secondary w-full p-4">
      <div>
        <div className="mb-12 flex items-center gap-4">
          <h2 className="text-accent text-4xl font-semibold">
            Current Quarter
          </h2>
          <div>
            <CustomDropDown
              options={quarterName}
              value={quarterName.find((q) => q.value === selectedQuater)}
              onChange={(selected) =>
                setSelectedQuater(selected?.value || null)
              }
              placeholder="Select Quarter"
            />
          </div>
        </div>

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
              onChange={(selected) =>
                setSelectedMonth(selected?.value || "May")
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
                    className={`border border-white px-4 py-4 ${i === 0 ? "border-x" : ""}`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="border-border-color border-2">
              {filteredTableData?.length > 0 ? (
                filteredTableData.map((row, i) => (
                  <tr
                    key={i}
                    className="odd:bg-primary even:bg-primary/70 hover:bg-primary/80 transform text-sm text-white transition-all duration-300 ease-in-out"
                  >
                    <td className="border-secondary font-primary border-r px-4 py-4 font-normal">
                      {row.team_member_name}
                    </td>
                    <td className="border-secondary font-primary border-r px-4 py-4 font-normal">
                      $ {row.quarterly_target}
                    </td>
                    <td className="border-secondary font-primary border-r px-4 py-4 font-normal">
                      $ {row.achieved}
                    </td>
                    <td className="border-secondary font-primary border-r px-4 py-4 font-normal">
                      $ {row.quarterly_target - row.achieved}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={tableHeaders.length}
                    className="py-4 text-center text-white"
                  >
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <section className="pr-5">
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
