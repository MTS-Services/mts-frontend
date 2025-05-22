import Loading from "../../components/Loading/Loading";
import { useFetchData } from "../../hooks/useFetchData";

function AllReport() {
  // all
  const { data } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/profile/reports/all",
  );

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
  } = data;

  const monthlyOperationAchive = parseFloat(
    operationalPerformance.achievements.this_month.total_achievement,
  );
  const dailyOperationAchive = parseFloat(
    operationalPerformance.achievements.today.total_achievement,
  );

  const monthlyOperationTarget = parseFloat(
    operationalPerformance.targets.this_month.total_member_target_sum,
  );
  const dailyOperationTarget = parseFloat(
    operationalPerformance.targets.today.total_member_target_sum,
  );

  const monthlyPromotionCost = parseFloat(
    promotionCosts?.this_month_promotion.total_cost,
  );
  const dailyPromotionCost = parseFloat(
    promotionCosts?.today_promotion.total_cost,
  );
  const monthlySpecialOrderCost = parseFloat(
    specialOrderStats?.this_month_special_order.total_cost,
  );
  const dailySpecialOrderCost = parseFloat(
    specialOrderStats?.today_special_order.total_cost,
  );

  const total_Monthly_cost = monthlyPromotionCost + monthlySpecialOrderCost;
  const total_daily_cost = dailyPromotionCost + dailySpecialOrderCost;

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

              <th className="border border-white px-4 py-2 text-[18px]">
                Total Earn
              </th>
              <th className="border border-white px-4 py-2 text-[18px]">
                Total Cost
              </th>
              <th className="border border-white px-4 py-2 text-[18px]">
                Promotion Cost
              </th>
              <th className="border border-white px-4 py-2 text-[18px]">
                Special Order Cost
              </th>
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
            </tr>
          </tbody>
        </table>
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
      </div>
    </section>
  );
}

export default AllReport;
