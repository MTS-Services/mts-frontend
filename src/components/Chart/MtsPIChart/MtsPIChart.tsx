import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useTheme } from "../../../context/ThemeContext"; // ✅ Import theme

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const MtsPIChart = () => {
  const chartRef = useRef(null);
  const [legendPosition, setLegendPosition] = useState("left");
  const { theme } = useTheme(); // ✅ Use theme context

  // 🎨 Theme-based dynamic colors
  const textColor = theme === "light-mode" ? "#000000" : "#ffffff";
  const tooltipBg = theme === "light-mode" ? "#f3f3f3" : "#333333";
  const tooltipText = theme === "light-mode" ? "#000000" : "#ffffff";

  useEffect(() => {
    const handleResize = () => {
      setLegendPosition(window.innerWidth < 768 ? "top" : "left");
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = {
    labels: [
      "Team Target",
      "Team Delivery",
      "Team Assigned",
      "Team Cancelled",
      "Total Submitted",
      "Need to Assign",
    ],
    datasets: [
      {
        label: "Team Stats",
        data: [12, 19, 8, 5, 14, 9],
        backgroundColor: [
          "#FFB22C",
          "#FA812F",
          "#F3C623",
          "#CB0404",
          "#FEF3E2",
          "#77CDFF",
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -0.5 * Math.PI,
    plugins: {
      legend: {
        position: legendPosition,
        labels: {
          color: textColor,
          font: {
            family: "'Rubik', sans-serif",
            size: 14,
            lineHeight: 1.4,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipText,
        bodyColor: tooltipText,
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw + "%";
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div className="relative h-[400px] w-full sm:h-[500px]">
      <Pie ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default MtsPIChart;
