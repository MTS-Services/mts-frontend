import { useEffect } from "react";
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

function OverView() {
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    const dt = async () => {
      const response = await fetch("http://localhost:3000/api/profile");
      const result = await response.json();
      const data = result?.salesData;
      console.log("dt:", data);
    };

    dt();

    const handleSalesData = (data) => {
      console.log("dhukesee");

      // updateSalesChart();
    };

    socket.on("salesDataEachProfile", handleSalesData);

    return () => {
      socket.off("salesDataEachProfile", handleSalesData);
    };
  }, [socket]);
  const cardData = [
    {
      title: "Team Target",
      amount: 100,
      icon: MdGroups,
      message:
        "This shows the total carry amount from last month by the operations team.",
    },
    {
      title: "Team Delivery",
      amount: 200,
      icon: TbUserDollar,
      message:
        "This shows the total assign amount in this month to the operation team by the Project Manager.",
    },
    {
      title: "Team Assigned",
      amount: 300,
      icon: BsPersonWorkspace,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
    {
      title: "Team Cancelled",
      amount: 400,
      icon: TbDevicesCancel,
      message:
        "This shows the total sales amount in this month by the sales team.",
    },
    {
      title: "Total Submitted",
      amount: 500,
      icon: FaHandHoldingDollar,
      message:
        "This shows the total sales amount in this month by the sales team.",
    },
    {
      title: "Need to Assign",
      amount: 1000,
      icon: TbPointerDollar,
      message:
        "This shows the total amount that need to assign to the operation team by the Project Manager.",
    },
  ];

  return (
    <section className="pr-5">
      {/* Cards Section */}
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

      {/* Chart Row 1 */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="bg-background border-primary font-primary rounded border-2 p-5 shadow-lg">
          <MtsBarChar />
        </div>
        <div className="bg-background border-primary font-primary rounded border-2 p-5 shadow-lg">
          <MtsPIChart />
        </div>
      </div>

      {/* Chart Row 2 */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="bg-background border-primary font-primary rounded border-2 p-5 shadow-lg">
          <MtsLineChart />
        </div>
        <div className="bg-background border-primary font-primary rounded border-2 p-5 shadow-lg">
          <MtsProgressBar />
        </div>
      </div>
    </section>
  );
}

export default OverView;
