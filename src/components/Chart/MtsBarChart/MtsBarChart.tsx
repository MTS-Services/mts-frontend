import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTheme } from "../../../context/ThemeContext";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function MtsBarChar({
  barData = [],
  title = "Revenue Overview",
  className = "",
}) {
  const { theme } = useTheme();

  // 🎨 Dynamic Colors Based on Theme
  const textColor = theme === "light-mode" ? "#000000" : "#ffffff";
  const gridColor =
    theme === "light-mode" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)";

  const labels = barData.map((item) => item.memberName);
  const targets = barData.map((item) => parseFloat(item.target));
  const achieved = barData.map((item) => parseFloat(item.earned));

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Target",
        data: targets,
        backgroundColor: "#FFB22C",
        borderRadius: 0,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
      {
        label: "Achieved",
        data: achieved,
        backgroundColor: "#FA812F",
        borderRadius: 0,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    layout: {
      padding: {
        top: 0, // more spacing from title/legend
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
          font: {
            family: "'Rubik', sans-serif",
          },
          padding: 10, // extra spacing below legend
        },
      },
      title: {
        display: true,
        text: title,
        color: textColor,
        font: {
          family: "'Rubik', sans-serif",
          size: 30,
        },
        padding: {
          top: 0,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: "#000000",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
      datalabels: {
        color: textColor,
        anchor: "end",
        align: "top",
        font: {
          weight: "bold",
          size: 12,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} className={className} />;
}

export default MtsBarChar;
