import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useTheme } from "../../../context/ThemeContext";

// Register components
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const MtsPIChart = ({ PiData = [] }) => {
  const chartRef = useRef(null);
  const [legendPosition, setLegendPosition] = useState("left");
  const { theme } = useTheme();

  const textColor = theme === "light-mode" ? "#000000" : "#ffffff";
  const tooltipBg = theme === "light-mode" ? "#f3f3f3" : "#333333";
  const tooltipText = theme === "light-mode" ? "#000000" : "#ffffff";

  useEffect(() => {
    const handleResize = () => {
      setLegendPosition(window.innerWidth < 768 ? "top" : "left");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = {
    labels: PiData.map((item) => item.label),
    datasets: [
      {
        label: "Team Stats (%)",
        data: PiData.map((item) => parseFloat(item.value)),
        backgroundColor: [
          "#00C49F", // Delivery
          "#8884D8", // Assigned
          "#FF8042", // Cancelled
          "#F3C623", // Submitted
          "#FFB22C", // Carry
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
            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(1)}%`;
          },
        },
      },
      datalabels: {
        color: textColor,
        formatter: (value) => value.toFixed(1) + "%",
        font: {
          weight: "bold",
          size: 13,
        },
        anchor: "center",
        align: "center",
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div className="relative h-[400px] w-full sm:h-[500px]">
      <Pie
        ref={chartRef}
        data={data}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
};

export default MtsPIChart;
