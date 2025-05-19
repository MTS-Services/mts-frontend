import { BsPersonWorkspace } from "react-icons/bs";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { TbDevicesCancel, TbPointerDollar, TbUserDollar } from "react-icons/tb";

import MtsBarChar from "../../../components/Chart/MtsBarChart/MtsBarChart";
import MtsLineChart from "../../../components/Chart/MtsLineChart/MtsLineChart";
import MtsPIChart from "../../../components/Chart/MtsPIChart/MtsPIChart";
import MtsProgressBar from "../../../components/Chart/MtsProgressBar/MtsProgressBar";
import DisplayCard from "../../../components/DisplayCard/DisplayCard";
import { useFetchData } from "../../../hooks/useFetchData";

function OverView() {
  const { data, loading } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/team/teamwisechart",
    "GET",
    null,
    {
      refetchInterval: 2000, // Auto refetch every 2s
    },
  );

  // Show loader while fetching data
  if (loading || !data) {
    return (
      <div className="p-6 text-center text-sm text-gray-500">
        🔄 Loading team overview...
      </div>
    );
  }

  const base = data?.teamTarget || 1;

  const cardData = [
    {
      title: "Team Target",
      amount: data?.teamTarget,
      icon: MdGroups,
      message: "Total monthly target assigned to the team.",
    },
    {
      title: "Total Carry",
      amount: data?.teamTotalCarry,
      icon: FaHandHoldingDollar,
      message: "Total carry forward from previous month.",
    },
    {
      title: "Team Delivery",
      amount: data?.teamAchievement,
      icon: TbUserDollar,
      message: "Total deliveries completed this month.",
    },
    {
      title: "Team Assigned",
      amount: data?.totalAssign,
      icon: BsPersonWorkspace,
      message: "Total tasks assigned this month.",
    },
    {
      title: "Team Cancelled",
      amount: data?.teamCancelled,
      icon: TbDevicesCancel,
      message: "Total cancelled projects this month.",
    },
    {
      title: "Total Submitted",
      amount: data?.submitted,
      icon: TbPointerDollar,
      message: "Total tasks submitted by the team.",
    },
  ];

  console.log("cardData", cardData);

  const barChartCardData = data?.memberTarget;
  const weeklyAchievementBreakdown = data?.weeklyAchievementBreakdown;

  const chartData = [
    {
      label: "Team Delivery",
      value: (((data?.teamAchievement || 0) / base) * 100).toFixed(2),
    },
    {
      label: "Team Assigned",
      value: (((data?.totalAssign || 0) / base) * 100).toFixed(2),
    },
    {
      label: "Team Cancelled",
      value: (((data?.teamCancelled || 0) / base) * 100).toFixed(2),
    },
    {
      label: "Total Submitted",
      value: (((data?.submitted || 0) / base) * 100).toFixed(2),
    },
    {
      label: "Total Carry",
      value: (((data?.teamTotalCarry || 0) / base) * 100).toFixed(2),
    },
  ];

  console.log("📊 Fetched data:", data);

  return (
    <section className="pr-5">
      {/* Cards */}
      <div className="flex flex-wrap gap-5">
        {cardData.map((item, index) => (
          <DisplayCard
            key={index}
            title={item.title}
            amount={item.amount}
            icon={item.icon}
            message={item.message}
          />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="bg-background border-primary font-primary min-h-96 rounded border-2 p-5 shadow-lg">
          <MtsBarChar barData={barChartCardData} />
        </div>
        <div className="bg-background border-primary font-primary rounded border-2 p-5 shadow-lg">
          <MtsPIChart PiData={chartData} />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="bg-background border-primary font-primary min-h-96 rounded border-2 p-5 shadow-lg">
          <MtsLineChart lineData={weeklyAchievementBreakdown} />
        </div>
        <div className="bg-background border-primary font-primary rounded border-2 p-5 shadow-lg">
          <MtsProgressBar
            title="Team Monthly Overview : "
            progressItems={chartData}
          />
        </div>
      </div>
    </section>
  );
}

export default OverView;
