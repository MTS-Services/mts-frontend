import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  MdAttachMoney,
  MdCheckCircle,
  MdEdit,
  MdAccessTime,
  MdArrowCircleDown,
} from "react-icons/md";
import DisplayCard from "../../../components/DisplayCard/DisplayCard";
import SingleTodayTask from "./SingleTodayTask";
import AssignTeamForm from "./AssignTeamForm";
import { AuthContext } from "../../../context/AuthProvider";
import ReassignTeamForm from "./ReassignTeamForm";

const TodayTask = () => {
  const { roleBasePermissionThree } = useContext(AuthContext);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [td, setTd] = useState([]);

  const token = Cookies.get("core");

  // ✅ API fetch
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://mtsbackend20-production.up.railway.app/api/today-task",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await response.json();

      setData(result.tasks || []);
      setTableData(result.tasks || []);
      setTeamMembers(result.team_members || []);
      console.log("✅ API Result: ", result.tasks);
    } catch (error) {
      console.error("❌ API fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load data on token
  useEffect(() => {
    fetchData();
  }, [token]);

  // ✅ Process td after tableData loaded
  useEffect(() => {
    const tds = tableData.flatMap((item) => item.assign || []);
    setTd(tds);
    console.log("✅ Processed td:", tds);
  }, [tableData]);

  const mtsTargets = [
    {
      title: "Today Assign :",
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
      {/* ✅ Assign Team Form */}
      {roleBasePermissionThree && (
        <>
          <AssignTeamForm
            data={data}
            token={token}
            tasks={data}
            teamMembers={teamMembers}
            refreshTasks={fetchData}
          />
          <ReassignTeamForm
            data={data}
            token={token}
            tasks={data}
            teamMembers={teamMembers}
            refreshTasks={fetchData}
          />
        </>
      )}

      {/* ✅ Summary Cards */}
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

      {/* ✅ Table Section */}
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
              ) : td.length > 0 ? (
                td.map((item, index) => (
                  <SingleTodayTask key={index} item={item} />
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
