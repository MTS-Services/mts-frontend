import { useEffect, useState } from "react";
import DisplayCard from "../../../components/DisplayCard/DisplayCard";
import CustomDropDown from "./CustomDropDown";
import Distribution from "../../../pages/Distribution/Distribution";
import { TbTargetArrow } from "react-icons/tb";
import { GiStairsGoal } from "react-icons/gi";
import { PiPlusMinusDuotone } from "react-icons/pi";
import Cookies from "js-cookie";

const Performance = () => {
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [data, setData] = useState(null);

  const quarterOptions = [
    { label: "January-March", value: 1 },
    { label: "April-June", value: 2 },
    { label: "July-September", value: 3 },
    { label: "October-December", value: 4 },
  ];

  const quarters = {
    1: ["January", "February", "March"],
    2: ["April", "May", "June"],
    3: ["July", "August", "September"],
    4: ["October", "November", "December"],
  };

  const getCurrentQuarter = () => Math.floor(new Date().getMonth() / 3) + 1;
  const getCurrentYear = () => new Date().getFullYear();
  const token = Cookies.get("core");

  useEffect(() => {
    if (!selectedQuarter) {
      setData(null);
      setSelectedMonth(null);
      return;
    }

    // কোয়ার্টার সিলেক্ট হলে ঐ কোয়ার্টারের প্রথম মাস সিলেক্ট করা
    const monthsForQuarter = quarters[selectedQuarter];
    setSelectedMonth(monthsForQuarter ? monthsForQuarter[0] : null);

    const fetchPerformance = async () => {
      const year = getCurrentYear();
      try {
        const res = await fetch(
          `https://mtsbackend20-production.up.railway.app/api/profile/quarterly-performance?quarter=${selectedQuarter}&year=${year}`,
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
        setData(null);
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
      icon: GiStairsGoal,
      message: "Team achieved amount",
    },
    {
      title: "+/-",
      amount: data?.teamQuarterlyPerformance?.difference || 0,
      icon: PiPlusMinusDuotone,
      message: "Difference between target and achieved",
    },
  ];

  // কোয়ার্টার অনুযায়ী মাস গুলো
  const quarterMonths = selectedQuarter ? quarters[selectedQuarter] : [];

  // সদস্যদের ডাটা ফিল্টারিং (সিলেক্টেড মাস অনুযায়ী)
  const memberMonthly = data?.teamMembersQuarterly?.map((member) => {
    const monthData = member.monthlyBreakdown.find(
      (m) => m.month === selectedMonth,
    );
    return {
      name: member.team_member_name,
      target: monthData?.target || 0,
      achieved: monthData?.achieved || 0,
      difference: monthData?.difference || 0,
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
            value={
              quarterOptions.find((q) => q.value === selectedQuarter) || null
            }
            onChange={(selected) => setSelectedQuarter(selected?.value || null)}
            placeholder="Select Quarter"
          />
        </div>

        <div className="border-accent/30 mt-12 flex flex-wrap gap-5 border-b-1 pb-12">
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
        <div className="mb-12 flex items-center gap-4">
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
            isDisabled={!selectedQuarter}
          />
        </div>

        <div className="border-accent/30 mt-12 border-b-1 pb-12">
          <table className="border-border-color w-full min-w-[1000px] border-2 text-white">
            <thead>
              <tr className="bg-secondary text-left text-white">
                <th className="border border-white px-4 py-4">Member Name</th>
                <th className="border border-white px-4 py-4">Target</th>
                <th className="border border-white px-4 py-4">Achieve price</th>
                <th className="border border-white px-4 py-4">+/-</th>
              </tr>
            </thead>
            <tbody>
              {memberMonthly?.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border border-white ${
                    idx % 2 === 0 ? "bg-primary" : "bg-primary/70"
                  }`}
                >
                  <td className="px-4 py-4">{row.name}</td>
                  <td className="px-4 py-4">$ {row.achieved}</td>
                  <td className="px-4 py-4">$ {row.target}</td>
                  <td className="px-4 py-4">$ {row.difference}</td>
                </tr>
              ))}
              {!memberMonthly?.length && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-red-500">
                    No data found.
                  </td>
                </tr>
              )}
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
