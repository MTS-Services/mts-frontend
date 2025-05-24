import { useEffect, useState } from "react";
import DisplayCard from "../../../components/DisplayCard/DisplayCard";
import CustomDropDown from "./CustomDropDown";
import Distribution from "../../../pages/Distribution/Distribution";
import { TbTargetArrow } from "react-icons/tb";
import { GrAchievement } from "react-icons/gr";
import { PiPlusMinusDuotone } from "react-icons/pi";
import Cookies from "js-cookie";

const Performance = () => {
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("May");
  const [data, setData] = useState(null);

  const quarterOptions = [
    { label: "January-March", value: 1 },
    { label: "April-June", value: 2 },
    { label: "July-September", value: 3 },
    { label: "October-December", value: 4 },
  ];

  const monthNames = [
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

  const getCurrentQuarter = () => Math.floor(new Date().getMonth() / 3) + 1;
  const getCurrentYear = () => new Date().getFullYear();
  const token = Cookies.get("core");

  useEffect(() => {
    const fetchPerformance = async () => {
      const quarter = selectedQuarter || getCurrentQuarter();
      const year = getCurrentYear();
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
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchPerformance();
  }, [selectedQuarter, token]);

  const teamCards = [
    {
      title: "Target",
      amount: data?.teamQuarterlyPerformance?.target || 0,
      icon: TbTargetArrow,
      message: "Team target for this quarter",
    },
    {
      title: "Achieve",
      amount: data?.teamQuarterlyPerformance?.achieved || 0,
      icon: GrAchievement,
      message: "Team achieved amount",
    },
    {
      title: "+/-",
      amount: data?.teamQuarterlyPerformance?.difference || 0,
      icon: PiPlusMinusDuotone,
      message: "Difference between target and achieved",
    },
  ];

  const memberMonthly = data?.teamMembersQuarterly?.map((member) => {
    const month = member.monthlyBreakdown.find(
      (m) => m.month === selectedMonth,
    );
    return {
      name: member.team_member_name,
      target: month?.target || 0,
      achieved: month?.achieved || 0,
      difference: month?.difference || 0,
    };
  });

  return (
    <div className="font-secondary w-full p-4">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-4">
          <h2 className="text-accent text-4xl font-semibold">
            Current Quarter
          </h2>
          <CustomDropDown
            options={quarterOptions}
            value={quarterOptions.find((q) => q.value === selectedQuarter)}
            onChange={(selected) => setSelectedQuarter(selected?.value || null)}
            placeholder="Select Quarter"
          />
        </div>

        <div className="flex flex-wrap gap-5 border-b pb-12">
          {teamCards.map((card, idx) => (
            <DisplayCard
              key={idx}
              title={card.title}
              amount={card.amount}
              icon={card.icon}
              message={card.message}
              width="min-w-[260px]"
            />
          ))}
        </div>
      </div>

      <div className="my-12">
        <div className="mb-4 flex items-center gap-4">
          <h2 className="text-accent text-4xl font-semibold">
            Quater Base Member Performance
          </h2>
          <CustomDropDown
            options={monthNames.map((m) => ({ label: m, value: m }))}
            value={{ label: selectedMonth, value: selectedMonth }}
            onChange={(selected) => setSelectedMonth(selected?.value || "May")}
            placeholder="Select Month"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border border-white text-white">
            <thead>
              <tr className="bg-secondary text-left text-white">
                <th className="border border-white px-4 py-3">Member Name</th>
                <th className="border border-white px-4 py-3">Target</th>
                <th className="border border-white px-4 py-3">Achieve price</th>
                <th className="border border-white px-4 py-3">+/-</th>
              </tr>
            </thead>
            <tbody>
              {memberMonthly?.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border border-white ${idx % 2 === 0 ? "bg-primary/70" : "bg-primary"}`}
                >
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">$ {row.target}</td>
                  <td className="px-4 py-2">$ {row.achieved}</td>
                  <td className="px-4 py-2">$ {row.difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-accent mb-4 text-4xl font-semibold">
          Monthly Distribution
        </h2>
        <Distribution />
      </div>
    </div>
  );
};

export default Performance;
