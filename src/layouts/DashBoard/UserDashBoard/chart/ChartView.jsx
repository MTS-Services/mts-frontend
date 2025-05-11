import axios from "axios";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import BarChart from "../../../../components/common/BarChart";
import LineChart from "../../../../components/common/LineChart";
import PieChart from "../../../../components/common/PieChart";

// 🧠 Initialize socket connection
const socket = io("https://mtsbackend20-production.up.railway.app/");

const ChartView = () => {
  const [profileData, setProfileData] = useState([]);
  const [totalSalesProfile, setTotalSalesProfile] = useState(0);

  const [projectData, setProjectData] = useState([]);
  const [totalSalesProject, setTotalSalesProject] = useState(0);
  const [totalSalesOrders, setTotalSalesOrders] = useState(0);
  const [totalSalesFiverr, setTotalSalesFiverr] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [resSalesProfile, resSalesProjects] = await Promise.all([
          axios.get(
            "https://mtsbackend20-production.up.railway.app/api/profile",
          ),
          axios.post(
            "https://mtsbackend20-production.up.railway.app/api/project",
            {
              page: 1,
              limit: 10,
            },
          ),
        ]);

        const formattedSalesProfile = resSalesProfile.data.salesData.map(
          (item) => ({
            name: item.profile_name,
            amount: Number(item.total_sales.toFixed(0)),
          }),
        );

        const totalSalesProfile = formattedSalesProfile.reduce(
          (acc, item) => acc + item.amount,
          0,
        );

        const formattedProject = resSalesProjects.data.projects.map(
          (project) => ({
            name: project.project_name,
            order_amount: Number(project.order_amount),
            bonus: Number(project.bonus),
            after_fiverr_amount: Number(project.after_fiverr_amount),
          }),
        );

        const totalSalesProjects = formattedProject.reduce(
          (acc, item) => acc + item.order_amount,
          0,
        );
        const totalSalesBonus = formattedProject.reduce(
          (acc, item) => acc + item.bonus,
          0,
        );
        const totalSalesAfterFiverr = formattedProject.reduce(
          (acc, item) => acc + item.after_fiverr_amount,
          0,
        );

        setProfileData(formattedSalesProfile);
        setTotalSalesProfile(totalSalesProfile);
        setProjectData(formattedProject);
        setTotalSalesProject(totalSalesProjects);
        setTotalSalesOrders(totalSalesBonus);
        setTotalSalesFiverr(totalSalesAfterFiverr);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchProjects();

    const handleSalesProfileSocket = (newProfileData) => {
      if (!Array.isArray(newProfileData)) return;
      const validProfiles = newProfileData.filter(
        (item) => item?.profile_name && item?.total_sales,
      );
      const updatedProfiles = validProfiles.map((item) => ({
        name: item.profile_name,
        amount: Number(item.total_sales),
      }));

      setProfileData((prev) => {
        const filtered = prev.filter(
          (item) => !updatedProfiles.some((upd) => upd.name === item.name),
        );
        const newState = [...updatedProfiles, ...filtered];
        const newTotal = newState.reduce((sum, item) => sum + item.amount, 0);
        setTotalSalesProfile(newTotal);
        return newState;
      });
    };

    const handleSalesProjectSocket = (newProjectData) => {
      if (!Array.isArray(newProjectData)) return;

      const validProjects = newProjectData.filter(
        (item) =>
          item?.project_name &&
          item?.order_amount &&
          item?.bonus &&
          item?.after_fiverr_amount,
      );

      const updatedProjects = validProjects.map((item) => ({
        name: item.project_name,
        order_amount: Number(item.order_amount),
        bonus: Number(item.bonus),
        after_fiverr_amount: Number(item.after_fiverr_amount),
      }));

      setProjectData((prev) => {
        const filtered = prev.filter(
          (item) => !updatedProjects.some((upd) => upd.name === item.name),
        );
        const newState = [...updatedProjects, ...filtered];
        const newTotal = newState.reduce(
          (sum, item) =>
            sum + item.order_amount + item.bonus + item.after_fiverr_amount,
          0,
        );
        setTotalSalesProject(newTotal);
        return newState;
      });
    };

    socket.emit("salesDataEachProfile");
    socket.on("salesDataEachProfile", handleSalesProfileSocket);
    socket.on("salesDataEachProfile", handleSalesProjectSocket);

    return () => {
      socket.off("salesDataEachProfile", handleSalesProfileSocket);
      socket.off("salesDataEachProfile", handleSalesProjectSocket);
    };
  }, []);

  return (
    <section className="">
      <div className="grid grid-cols-4 gap-6 p-6">
        <InfoCard
          title="🧑‍💼Each Profiles"
          value={totalSalesProfile}
          color="#0190ce"
        />
        <InfoCard
          title="📋Projects"
          value={totalSalesProject}
          color="#267e94"
        />
        <InfoCard
          title="📈After Fiverr"
          value={totalSalesFiverr}
          color="#267e94"
        />
        <InfoCard title="💰Bonus" value={totalSalesOrders} color="#db9a00" />
      </div>

      <div className="grid grid-cols-2 gap-6 p-6">
        <ChartBlock title="Individual Profile">
          <LineChart
            key="line-chart"
            data={profileData}
            label="Amount"
            title="Sales Each Profile Visualization"
            yAxisTitle="Amount (USD)"
            className="rounded-lg border border-blue-900 bg-black p-6 shadow-sm"
            formatter={(val) => `$${val.toLocaleString()}`}
          />
        </ChartBlock>

        <ChartBlock title="Projects Distributions">
          <BarChart
            key="bar-chart"
            data={projectData}
            title="Project Distributions"
            yAxisTitle="Amount (USD)"
            className="rounded-lg border border-blue-900 bg-black p-6 shadow-sm"
            formatter={(val) => `$${val.toLocaleString()}`}
          />
        </ChartBlock>

        <ChartBlock title="Sales by each profile">
          <PieChart
            key="pie-1"
            data={projectData}
            title="Project Distributions"
            cutout={150}
            className="rounded-lg border border-blue-900 bg-black p-6 shadow-sm"
          />
        </ChartBlock>

        <ChartBlock title="Sales by each profile">
          <PieChart
            key="pie-2"
            data={projectData}
            title="Project Distributions"
            cutout={150}
            className="rounded-lg border border-blue-900 bg-black p-6 shadow-sm"
          />
        </ChartBlock>
      </div>
    </section>
  );
};

// ✅ Reusable Card UI
const InfoCard = ({ title, value, color }) => (
  <div className="rounded-2xl border border-blue-900 bg-black p-6 text-center shadow-md">
    <h2 className="mb-2 text-2xl font-semibold text-slate-300">{title}</h2>
    <p className="text-3xl font-bold" style={{ color }}>
      ${value.toLocaleString()}
    </p>
  </div>
);

// ✅ Reusable Chart Wrapper
const ChartBlock = ({ title, children }) => (
  <div>
    <h1 className="mb-6 text-2xl font-semibold text-slate-300">{title}</h1>
    {children}
  </div>
);

export default ChartView;
