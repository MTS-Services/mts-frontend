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
  title = "Revenue Overview",
  labels = [],
  datasets = [],
  className = "",
}) {
  const { theme } = useTheme();

  // 🎨 Theme-based colors
  const textColor = theme === "light-mode" ? "#000000" : "#ffffff";
  const gridColor =
    theme === "light-mode" ? "rgba(0,0,0,0.1)" : "rgba(255, 255, 255,.2)";

  // 📊 Chart data
  const chartData = {
    labels: labels,
    datasets: datasets.map((ds) => ({
      ...ds,
      borderRadius: 0,
      borderColor: "#ffffff",
      borderWidth: 2,
    })),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 0 },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
          font: { family: "'Rubik', sans-serif" },
          padding: 10,
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
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        beginAtZero: true,
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
    },
  };

  return (
    <div className="h-[400px] w-full">
      <Bar data={chartData} options={chartOptions} className={className} />
    </div>
  );
}

export default MtsBarChar;
