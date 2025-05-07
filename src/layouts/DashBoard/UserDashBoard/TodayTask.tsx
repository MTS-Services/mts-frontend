// ✅ Full updated TodayTask component using secure token + backend response
import {
  MdAttachMoney,
  MdCheckCircle,
  MdEdit,
  MdAccessTime,
  MdArrowCircleDown,
} from "react-icons/md";

import Cookies from "js-cookie";
import { use, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DisplayCard from "../../../components/DisplayCard/DisplayCard";
import SingleTodayTask from "./SingleTodayTask";
import { set } from "react-hook-form";

const TodayTask = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const token =
    Cookies.get("core") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJzNVdFaFJoR05BWm1BSjZUNWMyY0dJdHF2QlgyIiwiaWF0IjoxNzQ2NjEyNDU1LCJleHAiOjE3NDY2NTU2NTV9.s53ADiUPCC0ptCz4_HaFMEqodfaBVreM4MeJm2mjQAI";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://mtsbackend20-production.up.railway.app/api/today-task/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJzNVdFaFJoR05BWm1BSjZUNWMyY0dJdHF2QlgyIiwiaWF0IjoxNzQ2NjEyNDU1LCJleHAiOjE3NDY2NTU2NTV9.s53ADiUPCC0ptCz4_HaFMEqodfaBVreM4MeJm2mjQAI"}`,
            },
          },
        );
        const result = await response.json();

        console.log("✅ API Raw Response:", result.task);
        const tasks = Array.isArray(result?.tasks) ? result.tasks : [];
        console.log("📦 Mapped Table Data:", tasks);
        setData(tasks);
        setTableData(tasks);
      } catch (error) {
        console.error("❌ API fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("data:", data);
  useEffect(() => {
    console.log("data---:", data);
  }, []);
  const mtsTargets = [
    {
      title: "Today Sales :",
      amount: "1000",
      icon: MdAttachMoney,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
    {
      title: "Today Cancel :",
      amount: "4",
      icon: MdEdit,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
    {
      title: "Today Delivery:",
      amount: "2",
      icon: MdCheckCircle,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
    {
      title: "Totall Submit :",
      amount: "2",
      icon: MdArrowCircleDown,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
    {
      title: "Totall Short Time :",
      amount: "2",
      icon: MdAccessTime,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
  ];

  const tableHeaders = [
    "Client Name/ ID",
    "Last Update",
    "Assign",
    "Expect Finish Time",
    "Status",
    "Delivery Last Date",
  ];

  return (
    <div className="font-secondary w-full overflow-x-auto p-4">
      {data?.map((item) => (
        <div key={item.id} className="mb-4">
          <h2 className="text-lg font-semibold">{item.client_name}</h2>
          <p className="text-sm text-gray-500">ID: {item.project_id}</p>
        </div>
      ))}

      <div className="border-accent/30 flex flex-wrap gap-5 border-b-1 pb-7">
        {mtsTargets.map((item, index) => (
          <DisplayCard
            key={index}
            title={item.title}
            amount={item.amount}
            icon={item.icon}
            message={item.message}
          />
        ))}
      </div>

      <section className="my-7 w-full">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="font-primary sticky top-0 bg-gray-100">
              <tr>
                {tableHeaders.map((item, index) => (
                  <th
                    key={index}
                    className="bg-secondary text-md border px-4 py-5 text-left font-semibold whitespace-nowrap"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-secondary">
              {loading ? (
                <tr>
                  <td
                    colSpan={tableHeaders.length}
                    className="py-4 text-center"
                  >
                    ⏳ Loading...
                  </td>
                </tr>
              ) : tableData.length > 0 ? (
                tableData.map((item, index) => (
                  <SingleTodayTask key={index} index={index} item={item} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={tableHeaders.length}
                    className="py-4 text-center"
                  >
                    <h3 className="text-red-500">No task data available.</h3>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TodayTask;
