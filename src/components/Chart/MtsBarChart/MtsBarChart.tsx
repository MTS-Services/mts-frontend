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
  labels = ["Areefin", "Emon", "Jabed", "Toyob", "Munshi", "Kamrul"],
  targets = [1800, 1400, 1000, 1000, 1000, 1000],
  achieved = [1500, 1200, 800, 950, 1000, 900],
  title = "Revenue Overview",
  className = "",
}) {
  const { theme } = useTheme();

  // 🎨 Dynamic Colors Based on Theme
  const textColor = theme === "light-mode" ? "#000000" : "#ffffff";
  const gridColor =
    theme === "light-mode" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)";

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
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
          font: {
            family: "'Rubik', sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: title,
        color: textColor,
        font: {
          family: "'Rubik', sans-serif",
          size: 18,
        },
      },
      tooltip: {
        backgroundColor: "#000000",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
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
        min: 0,
        max: 2000,
        ticks: {
          color: textColor,
          stepSize: 200,
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
