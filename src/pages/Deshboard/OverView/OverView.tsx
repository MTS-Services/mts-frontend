import { BsPersonWorkspace } from "react-icons/bs";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { TbDevicesCancel, TbPointerDollar, TbUserDollar } from "react-icons/tb";
import MtsBarChar from "../../../components/Chart/MtsBarChart/MtsBarChart";
import MtsLineChart from "../../../components/Chart/MtsLineChart/MtsLineChart";
import MtsPIChart from "../../../components/Chart/MtsPIChart/MtsPIChart";
import MtsProgressBar from "../../../components/Chart/MtsProgressBar/MtsProgressBar";
import DisplayCard from "../../../components/DisplayCard/DisplayCard";
import { useSocket } from "../../../context/SocketContext";
import { useSocketFetcher } from "../../../hooks/useSocketFetcher";

function OverView() {
  const socket = useSocket();

  const chartRawData = useSocketFetcher(
    socket,
    "TeamChart",
    null,
    "eachTeamChart",
  );

  // useEffect(() => {
  //   if (chartRawData.length > 0) {
  //     console.log("Real-time update received:", chartRawData);
  //   }

  // }, [chartRawData]);

  const base = chartRawData?.teamTarget || 1;

  const cardData = [
    {
      title: "Team Target",
      amount: chartRawData?.teamTarget,
      icon: MdGroups,
      message: "Total monthly target assigned to the team.",
    },
    {
      title: "Total Carry",
      amount: chartRawData?.teamTotalCarry,
      icon: FaHandHoldingDollar,
      message: "Total carry forward from previous month.",
    },
    {
      title: "Team Delivery",
      amount: chartRawData?.teamAchievement,
      icon: TbUserDollar,
      message: "Total deliveries completed this month.",
    },
    {
      title: "Team Assigned",
      amount: chartRawData?.totalAssign,
      icon: BsPersonWorkspace,
      message: "Total tasks assigned this month.",
    },
    {
      title: "Team Cancelled",
      amount: chartRawData?.teamCancelled,
      icon: TbDevicesCancel,
      message: "Total cancelled projects this month.",
    },
    {
      title: "Total Submitted",
      amount: chartRawData?.submitted,
      icon: TbPointerDollar,
      message: "Total tasks submitted by the team.",
    },
  ];

  const barChartCardData = chartRawData?.memberTarget;
  const weeklyAchievementBreakdown = chartRawData?.weeklyAchievementBreakdown;

  const chartData = [
    {
      label: "Team Delivery",
      value: (((chartRawData?.teamAchievement || 0) / base) * 100).toFixed(2),
    },
    {
      label: "Team Assigned",
      value: (((chartRawData?.totalAssign || 0) / base) * 100).toFixed(2),
    },
    {
      label: "Team Cancelled",
      value: (((chartRawData?.teamCancelled || 0) / base) * 100).toFixed(2),
    },
    {
      label: "Total Submitted",
      value: (((chartRawData?.submitted || 0) / base) * 100).toFixed(2),
    },
    {
      label: "Total Carry",
      value: (((chartRawData?.teamTotalCarry || 0) / base) * 100).toFixed(2),
    },
  ];

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
