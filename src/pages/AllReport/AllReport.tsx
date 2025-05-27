import { useEffect, useState } from "react";
import ChartToggleContainer from "../../components/Chart/ChartToggleContainer/ChartToggleContainer";
import MtsBarChart from "../../components/Chart/MtsBarChart/MtsBarChart";
import MtsLineChart from "../../components/Chart/MtsLineChart/MtsLineChart";
import MyPieChart from "../../components/Chart/MtsPIChart/MyPieChart";
import Loading from "../../components/Loading/Loading";
import StyledDropdown from "../../components/utility/StyledDropdown";
import { useSocket } from "../../context/SocketContext";
import { useFetchData } from "../../hooks/useFetchData";
import { useSocketData } from "../../hooks/useSocketData";

function AllReport() {
  const socket = useSocket();
  const [mainFactorStatus, setMainFactorStatus] = useState("Monthly");
  const [operationStatus, setOperationStatus] = useState("Monthly");
  const [salesStatus, setSalesStatus] = useState("Monthly");
  const [operationData, setOperationData] = useState([]);

  const { salesteams } = useSocketData();

  const { data } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/profile/reports/all",
  );

  useEffect(() => {
    if (
      socket &&
      operationStatus !== "Monthly" &&
      operationStatus !== "Daily"
    ) {
      socket.emit("TeamChartid", operationStatus);
      const handler = (data) => {
        setOperationData(data?.memberTarget);
      };

      socket.on("eachTeamChartForTeamId", handler);

      return () => {
        socket.off("eachTeamChartForTeamId", handler);
      };
    } else {
      setOperationData([]);
    }
  }, [operationStatus, socket]);

  if (!data) return <Loading />;

  const {
    operationalPerformance,
    promotionCosts,
    salesPerformance,
    specialOrderStats,
    todaysDeliveries,
    todaysOrders,
    projectsNeedingAssignment,
    totalMonthlyCancellations,
    totalMonthlyDeliveries,
    totalMonthlyOrders,
    carryForwardProjects,
    otherCosts,
    dailyDeliveries,
    dailyOrders,
  } = data;

  // Safely parse float values, defaulting to 0 if NaN or undefined
  const safeParseFloat = (value) => parseFloat(value) || 0;

  const monthlyOperationAchive = safeParseFloat(
    operationalPerformance?.achievements?.this_month?.total_achievement,
  );
  const dailyOperationAchive = safeParseFloat(
    operationalPerformance?.achievements?.today?.total_achievement,
  );

  const monthlyOperationTarget = safeParseFloat(
    operationalPerformance?.targets?.this_month?.total_member_target_sum,
  );
  const dailyOperationTarget = safeParseFloat(
    operationalPerformance?.targets?.today?.total_member_target_sum,
  );

  const monthlyPromotionCost = safeParseFloat(
    promotionCosts?.this_month_promotion?.total_cost,
  );
  const dailyPromotionCost = safeParseFloat(
    promotionCosts?.today_promotion?.total_cost,
  );
  const monthlySpecialOrderCost = safeParseFloat(
    specialOrderStats?.this_month_special_order?.total_cost,
  );
  const dailySpecialOrderCost = safeParseFloat(
    specialOrderStats?.today_special_order?.total_cost,
  );

  const monthlyOtherCosts = safeParseFloat(otherCosts?.this_month?.total_cost);
  const dailyOtherCosts = safeParseFloat(otherCosts?.today?.total_cost);

  const total_Monthly_cost =
    monthlyPromotionCost + monthlySpecialOrderCost + monthlyOtherCosts;
  const total_daily_cost =
    dailyPromotionCost + dailySpecialOrderCost + dailyOtherCosts;

  const salesTargetThisMonth = safeParseFloat(
    salesPerformance?.targets?.this_month?.total_member_target_sum,
  );
  const salesTargetToday = safeParseFloat(
    salesPerformance?.targets?.today?.total_member_target_sum,
  );

  const salesAchivementThisMonth = safeParseFloat(
    salesPerformance?.achievements?.this_month?.total_achievement,
  );
  const salesAchivementToday = safeParseFloat(
    salesPerformance?.achievements?.today?.total_achievement,
  );

  const getCurrentMonthDates = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: lastDay }, (_, i) => {
      const date = new Date(year, month, i + 1);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      });
    });
  };

  const xLabels = getCurrentMonthDates();

  const chartData = [
    {
      id: "Total Earn",
      data: xLabels.map((x) => ({ x, y: Math.floor(Math.random() * 1000) })),
    },
    {
      id: "Total Cost",
      data: xLabels.map((x) => ({ x, y: Math.floor(Math.random() * 700) })),
    },
    {
      id: "Promo Cost",
      data: xLabels.map((x) => ({ x, y: Math.floor(Math.random() * 300) })),
    },
  ];

  const barChartCardData =
    operationalPerformance?.achievements?.this_month?.team_breakdown;

  const monthlyMainFactors = [
    { name: "Total Earn", value: monthlyOperationAchive },
    { name: "Total Cost", value: total_Monthly_cost },
    { name: "Promotion Cost", value: monthlyPromotionCost },
    { name: "Special Order Cost", value: monthlySpecialOrderCost },
    { name: "Other Cost", value: monthlyOtherCosts },
  ];
  const dailyMainFactors = [
    { name: "Total Earn", value: dailyOperationAchive },
    { name: "Total Cost", value: total_daily_cost },
    { name: "Promotion Cost", value: dailyPromotionCost },
    { name: "Special Order Cost", value: dailySpecialOrderCost },
    { name: "Other Cost", value: dailyOtherCosts },
  ];

  const monthlySalesFactors = [
    { name: "Target", value: salesTargetThisMonth },
    { name: "Achived", value: salesAchivementThisMonth },
    { name: "Total Project", value: totalMonthlyOrders?.count || 0 },
  ];
  const dailySalesFactors = [
    { name: "Target", value: salesTargetToday },
    { name: "Achived", value: salesAchivementToday },
    { name: "Total Project", value: todaysOrders?.count || 0 },
  ];

  const monthlyOperationFactors = [
    { name: "Target", value: monthlyOperationTarget },
    { name: "Achived", value: monthlyOperationAchive },
    {
      name: "Cancelled",
      value: totalMonthlyCancellations?.total_after_fiverr || 0,
    },
    {
      name: "Carry",
      value: carryForwardProjects?.total_after_fiverr_and_bonus || 0,
    },
    { name: "Need to Assign", value: projectsNeedingAssignment?.count || 0 },
  ];

  const dailyOperationFactors = [
    { name: "Target", value: dailyOperationTarget },
    { name: "Achived", value: dailyOperationAchive },
  ];

  const barChartProps = {
    data:
      mainFactorStatus === "Monthly" ? monthlyMainFactors : dailyMainFactors,
    keys: ["value"],
    indexBy: "name",
    legent:
      mainFactorStatus === "Monthly"
        ? "Monthly Base Report"
        : "Daily Base Report",
  };

  const PIdata = {
    PIdata:
      mainFactorStatus === "Monthly" ? monthlyMainFactors : dailyMainFactors,
  };

  console.log("data", data);

  const lineChartData1 = [
    {
      id: "Delivery Progress",
      data: dailyDeliveries.map((item) => ({
        x: item.date,
        y: parseFloat(item?.total_after_fiverr_and_bonus || "0"),
      })),
    },
  ];

  const lineChartData2 = [
    {
      id: "Sales Progress",
      data: dailyOrders.map((item) => ({
        x: item.date,
        y: parseFloat(item?.total_amount || 0),
      })),
    },
  ];

  return (
    <section className="font-primary">
      <div className="py-5">
        <h2 className="pb-3 text-3xl">Main Factors</h2>
        <table className="border-primary text-accent font-primary text-md w-full table-auto border text-center">
          <thead className="bg-primary text-white">
            <tr>
              <th className="border border-white px-4 py-2 text-[18px]">
                +/- ( TE-TC )
              </th>
              {monthlyMainFactors?.map((item) => (
                <th
                  key={item.name}
                  className="border border-white px-4 py-2 text-[18px]"
                >
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-secondary even:bg-background text-accent">
              <td>
                <p className="px-4 py-2">
                  {!isNaN(monthlyOperationAchive - total_Monthly_cost)
                    ? (monthlyOperationAchive - total_Monthly_cost).toFixed(2)
                    : "0"}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {!isNaN(dailyOperationAchive - total_daily_cost)
                    ? (dailyOperationAchive - total_daily_cost).toFixed(2)
                    : "0"}
                </p>
              </td>

              <td className="border-primary border">
                <p className="px-4 py-2">
                  {!isNaN(monthlyOperationAchive)
                    ? monthlyOperationAchive.toFixed(2)
                    : "0"}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {!isNaN(dailyOperationAchive)
                    ? dailyOperationAchive.toFixed(2)
                    : "0"}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">
                  {!isNaN(total_Monthly_cost)
                    ? total_Monthly_cost.toFixed(2)
                    : "0"}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {!isNaN(total_daily_cost) ? total_daily_cost.toFixed(2) : "0"}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">
                  {!isNaN(monthlyPromotionCost)
                    ? monthlyPromotionCost.toFixed(2)
                    : "0"}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {!isNaN(dailyPromotionCost)
                    ? dailyPromotionCost.toFixed(2)
                    : "0"}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">
                  {!isNaN(monthlySpecialOrderCost)
                    ? monthlySpecialOrderCost.toFixed(2)
                    : "0"}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {!isNaN(dailySpecialOrderCost)
                    ? dailySpecialOrderCost.toFixed(2)
                    : "0"}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">
                  {!isNaN(monthlyOtherCosts)
                    ? monthlyOtherCosts.toFixed(2)
                    : "0"}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {!isNaN(dailyOtherCosts) ? dailyOtherCosts.toFixed(2) : "0"}
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <ChartToggleContainer
          mainFactorStatus={mainFactorStatus}
          setMainFactorStatus={setMainFactorStatus}
          dropdownComponent={
            <StyledDropdown
              options={["Monthly", "Daily"]}
              selected={mainFactorStatus}
              onSelect={setMainFactorStatus}
            />
          }
          charts={[
            { component: MtsBarChart, props: barChartProps },
            { component: MyPieChart, props: PIdata },
          ]}
        />
      </div>
      <div className="py-5">
        <h2 className="pb-3 text-3xl">Sales Factors</h2>
        <table className="border-primary text-accent font-primary text-md w-full table-auto border text-center">
          <thead className="bg-primary text-white">
            <tr>
              <th className="border border-white px-4 py-2 text-[18px]">
                +/- ( A-T )
              </th>
              <th className="border border-white px-4 py-2 text-[18px]">
                Target
              </th>
              <th className="border border-white px-4 py-2 text-[18px]">
                Achived
              </th>
              <th className="border border-white px-4 py-2 text-[18px]">
                Total Project
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-secondary even:bg-background text-accent">
              <td>
                <p className="px-4 py-2">
                  {!isNaN(salesAchivementThisMonth - salesTargetThisMonth)
                    ? (salesAchivementThisMonth - salesTargetThisMonth).toFixed(
                        2,
                      )
                    : "0"}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {!isNaN(salesAchivementToday - salesTargetToday)
                    ? (salesAchivementToday - salesTargetToday).toFixed(2)
                    : "0"}
                </p>
              </td>

              <td className="border-primary border">
                <p className="px-4 py-2">
                  {!isNaN(salesTargetThisMonth)
                    ? salesTargetThisMonth.toFixed(2)
                    : "0"}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {!isNaN(salesTargetToday) ? salesTargetToday.toFixed(2) : "0"}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">
                  {!isNaN(salesAchivementThisMonth)
                    ? salesAchivementThisMonth.toFixed(2)
                    : "0"}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {!isNaN(salesAchivementToday)
                    ? salesAchivementToday.toFixed(2)
                    : "0"}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">
                  {totalMonthlyOrders?.count !== undefined
                    ? totalMonthlyOrders.count
                    : "0"}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {todaysOrders?.count !== undefined ? todaysOrders.count : "0"}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="bg-secondary/10 shadow-box-style shadow-primary/15 mt-14 rounded p-1">
          <MtsLineChart data={lineChartData2} title="📊 Total Sales Amount" />
        </div>

        <div className="flex justify-end">
          <StyledDropdown
            options={["Monthly", "Daily"]}
            onSelect={(value) => setSalesStatus(value)}
          />
        </div>
        <div className="bg-secondary/10 shadow-box-style shadow-primary/15 mt-14 h-96 rounded p-1">
          <MtsBarChart
            data={
              salesStatus === "Monthly"
                ? monthlySalesFactors
                : dailySalesFactors
            }
            keys={["value"]}
            indexBy="name"
            legent={
              salesStatus === "Monthly"
                ? "Monthy Base Report"
                : "Daily Base Report"
            }
          />
        </div>
      </div>
      <div className="py-5">
        <h2 className="pb-3 text-3xl">Operation Factors</h2>
        <table className="border-primary text-accent font-primary text-md w-full table-auto border text-center">
          <thead className="bg-primary text-white">
            <tr>
              <th className="border border-white px-4 py-2 text-[18px]">
                ( A-T ) +/-
              </th>

              <th className="border border-white px-4 py-2 text-[18px]">
                Target
              </th>
              <th className="border border-white px-4 py-2 text-[18px]">
                Achived
              </th>
              <th className="border border-white px-4 py-2 text-[18px]">
                Cancelled
              </th>
              <th className="border border-white px-4 py-2 text-[18px]">
                Need to Assign
              </th>
              <th className="border border-white px-4 py-2 text-[18px]">
                Carry
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-secondary even:bg-background text-accent">
              <td>
                <p className="px-4 py-2">
                  {!isNaN(monthlyOperationAchive - monthlyOperationTarget)
                    ? (monthlyOperationAchive - monthlyOperationTarget).toFixed(
                        2,
                      )
                    : ""}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {!isNaN(dailyOperationAchive - dailyOperationTarget)
                    ? (dailyOperationAchive - dailyOperationTarget).toFixed(2)
                    : ""}
                </p>
              </td>

              <td className="border-primary border">
                <p className="px-4 py-2">
                  {!isNaN(monthlyOperationTarget)
                    ? monthlyOperationTarget.toFixed(2)
                    : ""}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {!isNaN(dailyOperationTarget)
                    ? dailyOperationTarget.toFixed(2)
                    : ""}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">
                  {!isNaN(monthlyOperationAchive)
                    ? monthlyOperationAchive.toFixed(2)
                    : ""}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {!isNaN(dailyOperationAchive)
                    ? dailyOperationAchive.toFixed(2)
                    : ""}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">
                  {totalMonthlyCancellations?.total_after_fiverr !== undefined
                    ? totalMonthlyCancellations.total_after_fiverr
                    : ""}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  Count :{" "}
                  {totalMonthlyCancellations?.count !== undefined
                    ? totalMonthlyCancellations.count
                    : ""}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">
                  {projectsNeedingAssignment?.total_after_fiverr_and_bonus !==
                  undefined
                    ? projectsNeedingAssignment.total_after_fiverr_and_bonus
                    : ""}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  Count :{" "}
                  {projectsNeedingAssignment?.count !== undefined
                    ? projectsNeedingAssignment.count
                    : ""}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">
                  {carryForwardProjects?.total_after_fiverr_and_bonus !==
                  undefined
                    ? carryForwardProjects.total_after_fiverr_and_bonus
                    : ""}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  Count :{" "}
                  {carryForwardProjects?.count !== undefined
                    ? carryForwardProjects.count
                    : ""}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="bg-secondary/10 shadow-box-style shadow-primary/15 mt-14 rounded p-1">
          <MtsLineChart data={lineChartData1} title="📊 Total Order Amount" />
        </div>

        <div className="flex justify-end">
          <StyledDropdown
            onSelect={(value) => setOperationStatus(value)}
            all="yes"
          />
        </div>
        <div className="bg-secondary/10 shadow-box-style shadow-primary/15 mt-14 h-96 rounded p-1">
          {operationStatus === "All Team" ? (
            <MtsBarChart
              data={
                operationalPerformance?.achievements?.this_month?.team_breakdown
              }
              keys={["achievement"]}
              indexBy="team_name"
              legent="All Team Performance"
            />
          ) : ["Monthly", "Daily"].includes(operationStatus) ? (
            <MtsBarChart
              data={
                operationStatus === "Monthly"
                  ? monthlyOperationFactors
                  : dailyOperationFactors
              }
              keys={["value"]}
              indexBy="name"
              legent={
                operationStatus === "Monthly"
                  ? "Monthly Base Report"
                  : "Daily Base Report"
              }
            />
          ) : (
            <MtsBarChart
              data={operationData}
              keys={["target", "earned"]}
              indexBy="memberName"
              legent="Team Performance Report"
            />
          )}
        </div>
        <div>
          <table className="border-primary text-accent font-primary text-md mt-5 w-full table-auto border text-center">
            <thead className="bg-primary text-white">
              <tr>
                <th className="border border-white px-4 py-2 text-[18px]">
                  Team Name
                </th>
                <th className="border border-white px-4 py-2 text-[18px]">
                  Target
                </th>
                <th className="border border-white px-4 py-2 text-[18px]">
                  Achieve
                </th>
                <th className="border border-white px-4 py-2 text-[18px]">
                  Assigned
                </th>
                <th className="border border-white px-4 py-2 text-[18px]">
                  Need
                </th>
                <th className="border border-white px-4 py-2 text-[18px]">
                  Project
                </th>
              </tr>
            </thead>
            <tbody>
              {operationalPerformance?.achievements?.this_month?.team_breakdown?.map(
                (item) => (
                  <tr
                    key={item.team_name}
                    className="odd:bg-secondary even:bg-background text-accent"
                  >
                    <td className="border-primary border px-4 py-2">
                      {item?.team_name}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {!isNaN(item?.team_target) ? item.team_target : 0}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {!isNaN(item?.achievement) ? item.achievement : 0}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {!isNaN(item?.assign) ? item.assign : 0}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {!isNaN(item?.achievement - item?.team_target)
                        ? (item.achievement - item.team_target).toFixed(2)
                        : ""}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {!isNaN(item?.project_count) ? item.project_count : 0}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AllReport;
