import { useEffect, useState } from "react";
import { BiGridVertical } from "react-icons/bi";
import { HiViewGridAdd } from "react-icons/hi";
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
  // all
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

  // Project Delivery Reports
  //   const { data: projectDelivery, loading: projectDeliveryLoading } =
  //     useFetchData(
  //       "https://mtsbackend20-production.up.railway.app/api/profile/projects/delivered/today",
  //     );

  //   const { data: projectDeliveryMonth, loading: projectDeliveryMonthLoading } =
  //     useFetchData(
  //       "https://mtsbackend20-production.up.railway.app/api/profile/projects/delivered/month",
  //     );

  //   // Project Order Reports
  //   const { data: projectOrder, loading: projectOrderLoading } = useFetchData(
  //     "https://mtsbackend20-production.up.railway.app/api/profile/projects/ordered/today",
  //   );
  //   const { data: projectOrderMonth, loading: projectOrderMonthLoading } =
  //     useFetchData(
  //       "https://mtsbackend20-production.up.railway.app/api/profile/projects/ordered/month",
  //     );

  //   // Project Cancellation Reports
  //   const { data: projectCancel, loading: projectCancelLoading } = useFetchData(
  //     "https://mtsbackend20-production.up.railway.app/api/profile/projects/cancelled/month",
  //   );

  //   // Promotion Cost Reports
  //   const { data: promotionReport, loading: promotionReportLoadin } =
  //     useFetchData(
  //       "https://mtsbackend20-production.up.railway.app/api/profile/promotions/today",
  //     );

  //   const { data: promotionReportMonth, loading: promotionReportMonthLoadin } =
  //     useFetchData(
  //       "https://mtsbackend20-production.up.railway.app/api/profile/promotions/month",
  //     );

  //   // Special Order Reports
  //   const { data: specialOrder, loading: specialOrderLoading } = useFetchData(
  //     "https://mtsbackend20-production.up.railway.app/api/profile/special-orders/today",
  //   );
  //   const { data: specialOrderMonth, loading: specialOrderMonthLoading } =
  //     useFetchData(
  //       "https://mtsbackend20-production.up.railway.app/api/profile/special-orders/month",
  //     );

  //   // Operational Performance Reports
  //   const { data: operationPerformance, loading: operationPerformanceLoading } =
  //     useFetchData(
  //       "https://mtsbackend20-production.up.railway.app/api/profile/operational-performance",
  //     );

  //   // Sales Performance Reports
  //   const { data: salesPerformance, loading: salesPerformanceLoading } =
  //     useFetchData(
  //       "https://mtsbackend20-production.up.railway.app/api/profile/sales-performance",
  //     );

  //   if (
  //     projectDeliveryLoading ||
  //     projectDeliveryMonthLoading ||
  //     projectOrderLoading ||
  //     projectOrderMonthLoading ||
  //     projectCancelLoading ||
  //     promotionReportLoadin ||
  //     promotionReportMonthLoadin ||
  //     specialOrderLoading ||
  //     specialOrderMonthLoading ||
  //     operationPerformanceLoading ||
  //     salesPerformanceLoading
  //   )
  //     return <Loading />;

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
  } = data;

  const monthlyOperationAchive = parseFloat(
    operationalPerformance?.achievements?.this_month?.total_achievement,
  );
  const dailyOperationAchive = parseFloat(
    operationalPerformance?.achievements?.today?.total_achievement,
  );

  const monthlyOperationTarget = parseFloat(
    operationalPerformance?.targets?.this_month?.total_member_target_sum,
  );
  const dailyOperationTarget = parseFloat(
    operationalPerformance?.targets?.today?.total_member_target_sum,
  );

  const monthlyPromotionCost = parseFloat(
    promotionCosts?.this_month_promotion?.total_cost,
  );
  const dailyPromotionCost = parseFloat(
    promotionCosts?.today_promotion?.total_cost,
  );
  const monthlySpecialOrderCost = parseFloat(
    specialOrderStats?.this_month_special_order?.total_cost,
  );
  const dailySpecialOrderCost = parseFloat(
    specialOrderStats?.today_special_order?.total_cost,
  );

  const monthlyOtherCosts = parseFloat(otherCosts?.this_month?.total_cost);
  const dailyOtherCosts = parseFloat(otherCosts?.today?.total_cost);

  const total_Monthly_cost =
    monthlyPromotionCost + monthlySpecialOrderCost + monthlyOtherCosts;
  const total_daily_cost =
    dailyPromotionCost + dailySpecialOrderCost + dailyOtherCosts;

  const salesTargetThisMonth = parseFloat(
    salesPerformance?.targets?.this_month?.total_member_target_sum,
  );
  const salesTargetToday = parseFloat(
    salesPerformance?.targets?.today?.total_member_target_sum,
  );

  const salesAchivementThisMonth = parseFloat(
    salesPerformance?.achievements?.this_month?.total_achievement,
  );
  const salesAchivementToday = parseFloat(
    salesPerformance?.achievements?.today?.total_achievement,
  );

  console.log(data);

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
    { name: "Total Project", value: totalMonthlyOrders?.count },
  ];
  const dailySalesFactors = [
    { name: "Target", value: salesTargetToday },
    { name: "Achived", value: salesAchivementToday },
    { name: "Total Project", value: todaysOrders?.count },
  ];

  const monthlyOperationFactors = [
    { name: "Target", value: monthlyOperationTarget },
    { name: "Achived", value: monthlyOperationAchive },
    { name: "Cancelled", value: totalMonthlyCancellations?.total_after_fiverr },
    {
      name: "Carry",
      value: carryForwardProjects?.total_after_fiverr_and_bonus,
    },
    { name: "Need to Assign", value: projectsNeedingAssignment?.count },
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

  const pieChartProps = {};

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
                <th className="border border-white px-4 py-2 text-[18px]">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-secondary even:bg-background text-accent">
              <td>
                <p className="px-4 py-2">
                  {parseFloat(monthlyOperationAchive) - total_Monthly_cost}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {parseFloat(dailyOperationAchive) - total_daily_cost}
                </p>
              </td>

              <td className="border-primary border">
                <p className="px-4 py-2">{monthlyOperationAchive}</p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {dailyOperationAchive}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">{total_Monthly_cost}</p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {total_daily_cost}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">{monthlyPromotionCost}</p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {dailyPromotionCost}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">{monthlySpecialOrderCost}</p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {dailySpecialOrderCost}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">{monthlyOtherCosts}</p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {dailyOtherCosts}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-end gap-5">
          <div className="bg-secondary/10 shadow-box-style shadow-primary/15 mt-14 cursor-pointer p-1">
            <HiViewGridAdd className="h-6 w-6" />
          </div>
          <div className="bg-secondary/10 shadow-box-style shadow-primary/15 mt-14 cursor-pointer p-1">
            <BiGridVertical className="h-6 w-6" />
          </div>

          <StyledDropdown
            options={["Monthly", "Daily"]}
            onSelect={(value) => setMainFactorStatus(value)}
          />
        </div>
        {/* <div className="my-12 flex flex-wrap gap-5">
          <div className="bg-secondary/10 shadow-box-style shadow-primary/25 h-96 w-full p-2 md:flex-1">
            <MtsBarChart
              data={
                mainFactorStatus === "Monthly"
                  ? monthlyMainFactors
                  : dailyMainFactors
              }
              keys={["value"]}
              indexBy="name"
              legent={
                mainFactorStatus === "Monthly"
                  ? "Monthly Base Report"
                  : "Daily Base Report"
              }
            />
          </div>
          <div className="bg-secondary/10 shadow-box-style shadow-primary/25 h-96 w-full p-2 md:flex-1">
            <MyPieChart />
          </div>
        </div> */}

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
            { component: MyPieChart, props: pieChartProps },
          ]}
        />

        <MtsLineChart data={chartData} />
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
                  {salesAchivementThisMonth - salesTargetThisMonth}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {salesAchivementToday - salesTargetToday}
                </p>
              </td>

              <td className="border-primary border">
                <p className="px-4 py-2">{salesTargetThisMonth}</p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {salesTargetToday}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">{salesAchivementThisMonth}</p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {salesAchivementToday}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">{totalMonthlyOrders?.count}</p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {todaysOrders?.count}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end">
          <StyledDropdown
            options={["Monthly", "Daily"]}
            onSelect={(value) => setSalesStatus(value)}
          />
        </div>
        <MtsBarChart
          data={
            salesStatus == "Monthly" ? monthlySalesFactors : dailySalesFactors
          }
          keys={["value"]}
          indexBy="name"
          legent={
            salesStatus == "Monthly"
              ? "Monthy Base Report"
              : "Daily Base Report"
          }
        />
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
                  {monthlyOperationAchive - monthlyOperationTarget}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {dailyOperationAchive - dailyOperationTarget}
                </p>
              </td>

              <td className="border-primary border">
                <p className="px-4 py-2">{monthlyOperationTarget}</p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {dailyOperationTarget}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">{monthlyOperationAchive}</p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  {dailyOperationAchive}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">
                  {totalMonthlyCancellations?.total_after_fiverr}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  Count : {totalMonthlyCancellations?.count}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">
                  {projectsNeedingAssignment?.total_after_fiverr_and_bonus}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  Count : {projectsNeedingAssignment?.count}
                </p>
              </td>
              <td className="border-primary border">
                <p className="px-4 py-2">
                  {carryForwardProjects?.total_after_fiverr_and_bonus}
                </p>
                <p className="border-primary/20 border-t-1 px-4 py-2">
                  Count : {carryForwardProjects?.count}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end">
          <StyledDropdown
            onSelect={(value) => setOperationStatus(value)}
            all="yes"
          />
        </div>

        <div>
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
                  <tr className="odd:bg-secondary even:bg-background text-accent">
                    <td className="border-primary border px-4 py-2">
                      {item?.team_name}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {item?.team_target}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {item?.achievement}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {item?.assign || 0}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {item?.achievement - item?.team_target}
                    </td>
                    <td className="border-primary border px-4 py-2">
                      {item?.project_count}
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
