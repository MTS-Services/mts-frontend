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
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Target",
        data: targets,
        backgroundColor: "#FFB22C", // Blue
        borderRadius: 0,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
      {
        label: "Achieved",
        data: achieved,
        backgroundColor: "#FA812F", // Green
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
          color: "#ffffff",
          family: "'Rubik', sans-serif",
        },
      },
      title: {
        display: true,
        text: title,
        color: "#ffffff",
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
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255,255,255,0.2)",
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 2000, // সর্বোচ্চ কত পর্যন্ত যাবে সেটা বলে দাও
        ticks: {
          color: "#ffffff",
          stepSize: 200, // এখন 0, 500, 1000, 1500, 2000 দেখাবে
        },
        grid: {
          color: "rgba(255,255,255,0.2)",
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}

export default MtsBarChar;
