import axios from "axios";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import BarChart from "../../../../components/common/BarChart";
import LineChart from "../../../../components/common/LineChart";
import PieChart from "../../../../components/common/PieChart";

// 🧠 Initialize socket connection
const socket = io("https://mtsbackend20-production.up.railway.app/");

const ChartView = () => {
  // sales profile
  const [profileData, setProfileData] = useState([]);
  const [totalSalesProfile, setTotalSalesProfile] = useState(0);
  // sales projects
  const [projectData, setProjectData] = useState([]);
  const [totalSalesProject, setTotalSalesProject] = useState(0);
  const [totalSalesOrders, setTotalSalesOrders] = useState(0);
  const [totalSalesFiverr, setTotalSalesFiverr] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        //✅ FETCH DATA
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

        //1️⃣ SALES PROFILE
        // **** format sales profile ****
        const formattedSalesProfile = resSalesProfile.data.salesData.map(
          (item) => ({
            name: item.profile_name,
            amount: Number(item.total_sales.toFixed(0)),
          }),
        );

        // **** Calculate total sales profile ****
        const totalSalesProfile = formattedSalesProfile.reduce(
          (acc, item) => acc + item.amount,
          0,
        );

        //3️⃣ SALES PROJECT
        // **** Format sales project
        const formattedProject = resSalesProjects.data.projects.map(
          (project) => ({
            name: project.project_name,
            order_amount: Number(project.order_amount),
            bonus: Number(project.bonus),
            after_fiverr_amount: Number(project.after_fiverr_amount),
          }),
        );

        // **** Calculate total sales projects
        const totalSalesProjects = formattedProject?.reduce(
          (acc, item) => acc + (item.order_amount || 0),
          0,
        );
        // **** Calculate total sales orders
        const totalSalesBonus = formattedProject.reduce(
          (acc, item) => acc + (item.bonus || 0),
          0,
        );
        //  **** Calculate total sales fiverr
        const totalSalesAfterFiverr = formattedProject.reduce(
          (acc, item) => acc + (item.after_fiverr_amount || 0),
          0,
        );

        // 4️⃣ Update state
        // **** Sales Individual Profile ****
        setProfileData(formattedSalesProfile);
        setTotalSalesProfile(totalSalesProfile);
        setProjectData(formattedProject);
        // **** Sales Projects ****
        setTotalSalesProject(totalSalesProjects);
        setTotalSalesOrders(totalSalesBonus);
        setTotalSalesFiverr(totalSalesAfterFiverr);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    // ✅FUNCTION CALL
    fetchProjects();

    // ✅ Socket event handlers
    // ****** HANDLE SALES PROFILE ****
    const handleSalesProfileSocket = (newProfileData) => {
      if (!Array.isArray(newProfileData)) {
        console.warn("Expected an array but got:", newProfileData);
        return;
      }

      // 1️⃣ Filter out invalid data
      const validProfiles = newProfileData.filter(
        (item) => item?.profile_name && item?.total_sales,
      );

      // 2️⃣ Update profile data
      const updatedProfiles = validProfiles.map((item) => ({
        name: item.profile_name,
        amount: Number(item.total_sales),
      }));

      setProfileData((prev) => {
        const filtered = prev.filter(
          (item) => !updatedProfiles.some((upd) => upd.name === item.name),
        );
        // 3️⃣ Update state
        const newState = [...updatedProfiles, ...filtered];

        // 4️⃣ Update total sales whenever profile data changes
        const newTotal = newState.reduce((sum, item) => sum + item.amount, 0);

        // 5️⃣ Update state
        setTotalSalesProfile(newTotal);

        return newState;
      });
    };

    // ****** HANDLE SALES PROJECT *****
    const handleSalesProjectSocket = (newProjectData) => {
      if (!Array.isArray(newProjectData)) {
        console.warn("Expected an array but got:", newProjectData);
        return;
      }

      // 1️⃣ Filter out invalid data
      const validProjects = newProjectData.filter(
        (item) =>
          item?.project_name &&
          item?.order_amount &&
          item?.bonus &&
          item?.after_fiverr_amount,
      );

      // 2️⃣ Update project data
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
        // 3️⃣ Update state
        const newState = [...updatedProjects, ...filtered];

        // 4️⃣ Update total sales whenever project data changes
        const newTotal = newState.reduce(
          (sum, item) =>
            sum +
            (item.order_amount || 0) +
            (item.bonus || 0) +
            (item.after_fiverr_amount || 0),
          0,
        );

        // 5️⃣ Update state
        setTotalSalesProject(newTotal);

        return newState;
      });
    };

    // ✅ Socket event handlers
    socket.emit("salesDataEachProfile");
    socket.emit("salesDataEachProfile");
    socket.on("salesDataEachProfile", handleSalesProfileSocket);
    socket.on("salesDataEachProfile", handleSalesProjectSocket);

    return () => {
      socket.off("salesDataEachProfile", handleSalesProfileSocket);
      socket.off("salesDataEachProfile", handleSalesProjectSocket);
    };
  }, [socket]);

  return (
    <section className="">
      <div className="grid grid-cols-4 gap-6 p-6">
        <div className="rounded-2xl border border-blue-900 bg-black p-6 text-center shadow-md">
          <h2 className="mb-2 text-2xl font-semibold text-slate-300">
            🧑‍💼Each Profiles
          </h2>
          <p className="text-3xl font-bold text-[#0190ce]">
            ${totalSalesProfile.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl border border-blue-900 bg-black p-6 text-center shadow-md">
          <h2 className="mb-2 text-2xl font-semibold text-slate-300">
            📋Projects
          </h2>
          <p className="text-3xl font-bold text-[#267e94]">
            ${totalSalesProject.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl border border-blue-900 bg-black p-6 text-center shadow-md">
          <h2 className="mb-2 text-2xl font-semibold text-slate-300">
            📈After Fiverr
          </h2>
          <p className="text-3xl font-bold text-[#267e94]">
            ${totalSalesFiverr.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl border border-blue-900 bg-black p-6 text-center shadow-md">
          <h2 className="mb-2 text-2xl font-semibold text-slate-300">
            💰Bonus
          </h2>
          <p className="text-3xl font-bold text-[#db9a00]">
            ${totalSalesOrders.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 p-6">
        <div className="">
          <h1 className="mb-6 text-2xl font-semibold text-slate-300">
            Individual Profile
          </h1>
          <LineChart
            data={profileData}
            label="Amount"
            title="Sales Each Profile Visualization"
            yAxisTitle="Amount (USD)"
            className={
              "rounded-lg border border-blue-900 bg-black p-6 shadow-sm"
            }
            formatter={(val) => `$${val.toLocaleString()}`}
          />
        </div>

        <div className="">
          <h1 className="mb-6 text-2xl font-semibold text-slate-300">
            Projects Distributions
          </h1>
          <BarChart
            data={projectData}
            className={
              "rounded-lg border border-blue-900 bg-black p-6 shadow-sm"
            }
            title="Project Distributions"
            yAxisTitle="Amount (USD)"
            formatter={(val) => `$${val.toLocaleString()}`}
          />
        </div>

        <div className="">
          <h1 className="mb-6 text-2xl font-semibold text-slate-300">
            Sales by each profile
          </h1>
          <PieChart
            data={projectData}
            title="Project Distributions"
            cutout={150} // Pure pie chart
            className={
              "rounded-lg border border-blue-900 bg-black p-6 shadow-sm"
            }
          />
        </div>

        <div className="">
          <h1 className="mb-6 text-2xl font-semibold text-slate-300">
            Sales by each profile
          </h1>
          <PieChart
            data={projectData}
            title="Project Distributions"
            cutout={150} // Pure pie chart
            className={
              "rounded-lg border border-blue-900 bg-black p-6 shadow-sm"
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ChartView;
