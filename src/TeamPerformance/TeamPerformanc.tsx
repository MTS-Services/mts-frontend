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
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedQuater, setSelectedQuater] = useState(null);
  const [data, setData] = useState(null);

  const token = Cookies.get("core");
  const getCurrentYear = () => new Date().getFullYear();

  useEffect(() => {
    if (!selectedQuater) {
      setData(null);
      setSelectedMonth(null);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://mtsbackend20-production.up.railway.app/api/profile/quarterly-performance?quarter=${selectedQuater}&year=${getCurrentYear()}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const json = await res.json();
        setData(json);
        setSelectedMonth(null);
      } catch {
        setData(null);
      }
    };

    fetchData();
  }, [selectedQuater, token]);

  const quarters = {
    1: ["January", "February", "March"],
    2: ["April", "May", "June"],
    3: ["July", "August", "September"],
    4: ["October", "November", "December"],
  };

  const quarterName = [
    { label: "January-March", value: 1 },
    { label: "April-June", value: 2 },
    { label: "July-September", value: 3 },
    { label: "October-December", value: 4 },
  ];

  const tableHeaders = ["Member Name", "Target", "Achieve price", "+/-"];
  const quarterMonths = quarters[selectedQuater] || [];

  const target = data?.teamQuarterlyPerformance?.target || 0;
  const achieved = data?.teamQuarterlyPerformance?.achieved || 0;
  const difference = target - achieved;

  const lastQuarter = [
    {
      title: "Target",
      amount: target,
      icon: TbTargetArrow,
      message: "Total target for quarter.",
    },
    {
      title: "Achieve",
      amount: achieved,
      icon: GiStairsGoal,
      message: "Total achieved for quarter.",
    },
    {
      title: "+/-",
      amount: difference,
      icon: PiPlusMinusDuotone,
      message: "Difference target vs achieved.",
    },
  ];

  const filteredTableData =
    data?.teamMembersQuarterly?.map((member) => {
      if (selectedMonth) {
        const monthData = member.monthlyBreakdown.find(
          (m) => m.month === selectedMonth,
        );
        return {
          team_member_name: member.team_member_name,
          quarterly_target: monthData?.target || 0,
          achieved: monthData?.achieved || 0,
        };
      }
      return {
        team_member_name: member.team_member_name,
        quarterly_target: 0,
        achieved: 0,
      };
    }) || [];

  const revenueData =
    data?.teamMembersQuarterly?.map((member) => {
      if (selectedMonth) {
        const monthData = member.monthlyBreakdown.find(
          (m) => m.month === selectedMonth,
        );
        return {
          memberName: member.team_member_name,
          target: monthData?.target || 0,
          earned: monthData?.achieved || 0,
        };
      }
      return {
        memberName: member.team_member_name,
        target: member.quarterly_target || 0,
        earned: member.achieved || 0,
      };
    }) || [];

  const weeklyAchievementBreakdown =
    selectedMonth && data?.teamQuarterlyPerformance?.monthlyBreakdown
      ? (() => {
          const monthData = data.teamQuarterlyPerformance.monthlyBreakdown.find(
            (m) => m.month === selectedMonth,
          );
          if (!monthData) return [];

          return monthData.weeklyBreakdown.map((week) => ({
            week: week.week,
            target: week.target || 0,
            achieved: week.achieved || 0,
          }));
        })()
      : [];

  return (
    <div className="font-secondary w-full p-4">
      {/* Current Quarter */}
      <div className="mb-12 flex items-center gap-4">
        <h2 className="text-accent text-4xl font-semibold">Current Quarter</h2>
        <CustomDropDown
          options={quarterName}
          value={quarterName.find((q) => q.value === selectedQuater) || null}
          onChange={(selected) => setSelectedQuater(selected?.value || null)}
          placeholder="Select Quarter"
        />
      </div>

      <div className="border-accent/30 flex flex-wrap gap-5 border-b-1 pb-14">
        {lastQuarter.map((item, i) => (
          <DisplayCard
            key={i}
            title={item.title}
            amount={item.amount}
            icon={item.icon}
            message={item.message}
            width="min-w-[260px]"
          />
        ))}
      </div>

      {/* Member Performance */}
      <div className="mt-12 flex items-center gap-4">
        <h2 className="text-accent text-4xl font-semibold">
          Quater Base Member Performance
        </h2>
        <CustomDropDown
          options={quarterMonths.map((m) => ({ label: m, value: m }))}
          value={
            selectedMonth
              ? { label: selectedMonth, value: selectedMonth }
              : null
          }
          onChange={(selected) => setSelectedMonth(selected?.value || null)}
          placeholder="Select Month"
          isDisabled={!selectedQuater}
        />
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
            {filteredTableData.length > 0 ? (
              filteredTableData.map((row, i) => (
                <tr
                  key={i}
                  className="odd:bg-primary even:bg-primary/70 transform text-sm text-white transition-all duration-300 ease-in-out"
                >
                  <td className="border-secondary border-r px-4 py-4">
                    {row.team_member_name}
                  </td>
                  <td className="border-secondary border-r px-4 py-4">
                    ${row.quarterly_target}
                  </td>
                  <td className="border-secondary border-r px-4 py-4">
                    ${row.achieved}
                  </td>
                  <td className="border-secondary border-r px-4 py-4">
                    ${row.quarterly_target - row.achieved}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-white">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <section className="pr-5">
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="bg-background border-primary font-primary min-h-96 rounded border-2 p-5 shadow-lg">
            <MtsBarChar barData={revenueData} />
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
