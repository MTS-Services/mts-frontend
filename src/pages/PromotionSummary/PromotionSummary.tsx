import { useEffect, useState } from "react";
import { useFetchData } from "../../hooks/useFetchData";

function PromotionSummary() {
  const { data } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/profile/promotion/",
  );

  const [todayTotal, setTodayTotal] = useState(0);
  const [monthlyTotals, setMonthlyTotals] = useState({});

  useEffect(() => {
    if (!data?.data) return;

    const today = new Date().toISOString().split("T")[0];
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    const monthStartStr = startOfMonth.toISOString().split("T")[0];

    let todaySum = 0;
    const profileTotals = {};

    data.data.forEach((entry) => {
      const date = entry.created_date?.split("T")[0];
      const amount = Number(entry.actual_increase || 0);

      // Today's total
      if (date === today) {
        todaySum += amount;
      }

      // Monthly totals by profile
      if (date >= monthStartStr && date <= today) {
        const profile = entry.profile?.profile_name || "Unknown";
        profileTotals[profile] = (profileTotals[profile] || 0) + amount;
      }
    });

    setTodayTotal(todaySum);
    setMonthlyTotals(profileTotals);
  }, [data]);

  return (
    <div className="bg-background border-primary text-accent mt-10 w-full max-w-3xl rounded-lg border p-6 shadow-lg">
      <h3 className="text-accent font-primary mb-4 text-center text-xl font-bold">
        Promotion Summary
      </h3>

      <div className="mb-4">
        <h4 className="text-md mb-1 font-semibold">
          📅 Today’s Total Actual Increase
        </h4>
        <p className="text-lg font-bold text-green-600">
          € {todayTotal.toFixed(2)}
        </p>
      </div>

      <div>
        <h4 className="text-md mb-2 font-semibold">
          📊 Monthly Total (1st - Today) by Profile
        </h4>
        <ul className="space-y-1">
          {Object.entries(monthlyTotals).map(([profile, total]) => (
            <li
              key={profile}
              className="border-accent/30 bg-secondary flex justify-between rounded border px-4 py-2"
            >
              <span className="font-medium">{profile}</span>
              <span className="font-semibold text-green-500">
                € {total.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PromotionSummary;
