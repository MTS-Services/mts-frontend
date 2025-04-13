import React from "react";
import BarChart from "../../../../components/common/BarChart";

const userData = [
  { name: "Aliza_Figma", amount: 1000 },
  { name: "Digital_door", amount: 5000 },
  { name: "Draw_infinity", amount: 500 },
  { name: "Lead_genie", amount: 2000 },
  { name: "tareenhossain", amount: 4000 },
  { name: "tamukal", amount: 2000 },
  { name: "mrakib", amount: 2000 },
  // this call is for dynamic data if you want then you can use it
  // ...
];

const ChartView = () => {
  return (
    <section className="bg-gray-900 min-h-screen">
      <div className="grid grid-cols-4 gap-6 p-6 ">
        <div className="bg-black rounded-2xl shadow-md p-6 border border-blue-900">
          <h2 className="text-xl font-semibold mb-2 text-white">
            👤 Total Users
          </h2>
          <p className="text-3xl font-bold text-blue-600">1,245</p>
        </div>

        <div className="bg-black rounded-2xl shadow-md p-6 border border-blue-900">
          <h2 className="text-xl font-semibold mb-2 text-white">
            📦 Active Subscriptions
          </h2>
          <p className="text-3xl font-bold text-green-600">327</p>
        </div>

        <div className="bg-black rounded-2xl shadow-md p-6 border border-blue-900">
          <h2 className="text-xl font-semibold mb-2 text-white">
            💰 Monthly Revenue
          </h2>
          <p className="text-3xl font-bold text-yellow-500">$8,760</p>
        </div>

        <div className="bg-black rounded-2xl shadow-md p-6 border border-blue-900">
          <h2 className="text-xl font-semibold mb-2 text-white">
            📈 Growth Rate
          </h2>
          <p className="text-3xl font-bold text-purple-600">+12.4%</p>
        </div>
      </div>

      <div className="p-6 flex gap-6">
        <div className="w-1/2">
          <BarChart
            data={userData}
            className={
              "bg-black shadow-sm rounded-lg p-6 border border-blue-900"
            }
            title="Sales Profile Visualization"
            label="User Amounts"
            yAxisTitle="Amount (USD)"
            xAxisTitle="User Names"
          />
        </div>

        <div className="w-1/2">
          <BarChart
            data={userData}
            className={
              "bg-black shadow-sm rounded-lg p-6 border border-blue-900"
            }
            title="Sales Profile Visualization"
            label="User Amounts"
            yAxisTitle="Amount (USD)"
            xAxisTitle="User Names"
          />
        </div>
      </div>
    </section>
  );
};

export default ChartView;
