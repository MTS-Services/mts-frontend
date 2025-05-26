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

// Define the expected AuthContext type
type AuthContextType = {
  roleBasePermissionThree: boolean;
  // add other properties if needed
};

const TodayTask = () => {
  const { roleBasePermissionThree } = useContext(
    AuthContext,
  ) as unknown as AuthContextType;
  type TableDataItem = {
    assign?: AssignItem[];
    [key: string]: unknown;
  };
  const [tableData, setTableData] = useState<TableDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  // Define the type for an assigned task item
  type AssignItem = {
    [key: string]: unknown;
  };
  const [td, setTd] = useState<AssignItem[]>([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ✅ Process td after tableData loaded
  useEffect(() => {
    const tds = tableData.flatMap((item) => item.assign || []);
    setTd(tds);
    console.log("✅ Processed td:", tds);
  }, [tableData]);

  // 👉 Step 1: Add new state
  type DashboardData = {
    todayAssign: number;
    todayCancel: number;
    todayDelivery: number;
    totalSubmit: number;
    totalShortTime?: {
      project_count: number;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );

  // 👉 Step 2: Fetch card API on load
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          "https://mtsbackend20-production.up.railway.app/api/today-task/operations/dashboard",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const json = await res.json();
        setDashboardData(json);
      } catch (err) {
        console.error("Failed to fetch dashboard metrics:", err);
      }
    };

    fetchDashboard();
  }, [token]);

  const tableHeaders = [
    "Client Name/ ID",
    "Last Update",
    "Assign",
    "Expect Finish Time",
    "Status",
    "Delivery Last Date",
  ];

  return (
    <div className="font-secondary w-full p-4">
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
      <div className="border-accent/30 mt-12 flex flex-wrap gap-5 border-b-1 pb-12">
        {dashboardData && (
          <>
            <DisplayCard
              title="Today Assign"
              amount={dashboardData.todayAssign}
              icon={MdAttachMoney}
              message="This shows the total operation amount earned this month by the operations team."
              width="min-w-[260px]"
            />
            <DisplayCard
              title="Today Cancel"
              amount={dashboardData.todayCancel}
              icon={MdEdit}
              message="This shows the total operation amount earned this month by the operations team."
              width="min-w-[260px]"
            />
            <DisplayCard
              title="Today Delivery"
              amount={dashboardData.todayDelivery}
              icon={MdCheckCircle}
              message="This shows the total operation amount earned this month by the operations team."
              width="min-w-[260px]"
            />
            <DisplayCard
              title="Total Submit"
              amount={dashboardData.totalSubmit}
              icon={MdArrowCircleDown}
              message="This shows the total operation amount earned this month by the operations team."
              width="min-w-[260px]"
            />
            <DisplayCard
              title="Total Short Time"
              amount={dashboardData.totalShortTime?.project_count}
              icon={MdAccessTime}
              message="This shows the total operation amount earned this month by the operations team."
              width="min-w-[260px]"
            />
          </>
        )}
      </div>

      {/* ✅ Table Section */}
      <section className="my-12 w-full">
        <div className="w-full">
          <table className="border-border-color w-full min-w-[1000px] border-2 text-left text-white">
            <thead className="font-primary sticky top-0 bg-gray-100">
              <tr>
                {tableHeaders.map((item, index) => (
                  <th
                    key={index}
                    className="bg-secondary text-md border px-4 py-4 text-left font-semibold whitespace-nowrap"
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
