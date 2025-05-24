import { useState } from "react";
import Distribution from "../../../pages/Distribution/Distribution";
import { TbTargetArrow } from "react-icons/tb";
import { GrAchievement } from "react-icons/gr";
import { PiPlusMinusDuotone } from "react-icons/pi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { AiOutlineTeam } from "react-icons/ai";

import DisplayCard from "../../../components/DisplayCard/DisplayCard";
import CustomDropDown from "./CustomDropDown";

const Performance = () => {
  const [selectedCurrentMonth, setSelectedCurrentMonth] = useState("");
  const [selectedDistributionMonth, setSelectedDistributionMonth] =
    useState("");

  const [selectedQuater, setSelectedQuater] = useState("");

  const lastQuarter = [
    {
      title: "Individual target",
      amount: "3000",
      icon: TbTargetArrow,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
    {
      title: "Achieve",
      amount: "2000",
      icon: GrAchievement,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
    {
      title: "+/-",
      amount: "2",
      icon: PiPlusMinusDuotone,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
  ];

  const currentMonth = [
    {
      title: "Worked Amount",
      amount: "3000",
      icon: FaHandHoldingDollar,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
    {
      title: "Worked Projects",
      amount: "3000",
      icon: AiOutlineTeam,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
    {
      title: "Target",
      amount: "3000",
      icon: TbTargetArrow,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
    {
      title: "Achieve",
      amount: "2000",
      icon: GrAchievement,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
  ];

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

  return (
    <div className="font-secondary w-full p-4">
      <div>
        <div className="mb-12 flex items-center gap-4">
          <h2 className="text-accent text-4xl font-semibold">Last Quarter</h2>

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
        <div className="mt-12 mb-12 flex items-center gap-4">
          <h2 className="text-accent text-4xl font-semibold">Current Month</h2>

          <CustomDropDown
            options={monthName.map((m) => ({ label: m, value: m }))}
            value={{ label: selectedCurrentMonth, value: selectedCurrentMonth }}
            onChange={(selected: { label: string; value: string } | null) =>
              setSelectedCurrentMonth(selected?.value || "")
            }
            placeholder="Select Month"
          />
        </div>

        {/*  Current Quarter Summary Cards Using DisplayCard */}
        <div className="border-accent/30 flex flex-wrap gap-5 border-b-1 pb-14">
          {currentMonth.map((item, index) => (
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
        <div className="mt-12 mb-12 flex items-center gap-4">
          <h2 className="text-accent text-4xl font-semibold">
            Monthly Destribution
          </h2>
          <CustomDropDown
            options={monthName.map((m) => ({ label: m, value: m }))}
            value={{
              label: selectedDistributionMonth,
              value: selectedDistributionMonth,
            }}
            onChange={(selected: { label: string; value: string } | null) =>
              setSelectedDistributionMonth(selected?.value || "")
            }
            placeholder="Select Month"
          />
        </div>
        <Distribution />
      </div>
    </div>
  );
};

export default Performance;
