import { BsPersonWorkspace } from "react-icons/bs";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { TbDevicesCancel, TbPointerDollar, TbUserDollar } from "react-icons/tb";
import MtsBarChar from "../../../components/Chart/MtsBarChart/MtsBarChart";
import MtsLineChart from "../../../components/Chart/MtsLineChart/MtsLineChart";
import MtsPIChart from "../../../components/Chart/MtsPIChart/MtsPIChart";
import DisplayCard from "../../../components/DisplayCard/DisplayCard";
function OverView() {
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
      <div className="border-accent/30 flex flex-wrap gap-5 border-b-1 pb-7">
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

      {/* <div className="mt-10 flex w-full flex-wrap gap-5">
        <div className="border-border-color bg-secondary font-primary w-1/2 rounded border-2 p-3 shadow-lg">
          <MtsBarChar />
        </div>
        <div className="border-border-color bg-secondary font-primary w-1/2 rounded border-2 p-3 shadow-lg">
          <MtsLineChart />
        </div>
      </div>
      <div className="border-border-color bg-secondary font-primary items-center justify-center rounded border-2 p-3 shadow-lg">
        <MtsPIChart />
      </div> */}

      <div className="mt-10 flex flex-row gap-5">
        <div className="bg-secondary border-border-color font-primary w-full rounded border-2 p-5 shadow-lg">
          <MtsBarChar />
        </div>
        <div className="bg-secondary border-border-color font-primary w-full rounded border-2 p-5 shadow-lg">
          <MtsPIChart />
        </div>
      </div>
      <div className="bg-secondary border-border-color font-primary mt-10 rounded border-2 p-5 text-center shadow-lg">
        <MtsLineChart />
      </div>
    </section>
  );
}

export default OverView;
