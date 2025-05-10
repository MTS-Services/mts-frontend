import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "../../../context/ThemeContext";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels,
);

const MtsLineChart = ({ lineData = [] }) => {
  const chartRef = useRef(null);
  const { theme } = useTheme();

  const textColor = theme === "light-mode" ? "#000000" : "#ffffff";
  const gridColor =
    theme === "light-mode" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)";
  const labelColor = theme === "light-mode" ? "#111827" : "#f9fafb";

  const labels = lineData.map((item) => item.week);
  const achievedValues = lineData.map((item) => item.amount);
  const targetValues = lineData.map((item) => item.target);

  const data = {
    labels,
    datasets: [
      {
        label: "Achieved",
        data: achievedValues,
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        fill: false,
        pointBackgroundColor: "#36A2EB",
        pointBorderColor: "#36A2EB",
        pointRadius: 5,
      },
      {
        label: "Target",
        data: targetValues,
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        tension: 0.4,
        fill: false,
        pointBackgroundColor: "#FF6384",
        pointBorderColor: "#FF6384",
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
          font: {
            family: "'Rubik', sans-serif",
            size: 14,
            lineHeight: 1.4,
          },
        },
      },
      title: {
        display: true,
        text: "Weekly Target vs Achievement",
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
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
      datalabels: {
        color: textColor,
        font: {
          weight: "bold",
          size: 12,
        },
        anchor: "end",
        align: "top",
        formatter: (value) => `${value}`,
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
          font: {
            family: "'Rubik', sans-serif",
          },
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColor,
          stepSize: 50,
          font: {
            family: "'Rubik', sans-serif",
          },
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  useEffect(() => {
    const chart = chartRef.current;
    return () => {
      if (chart && chart.chartInstance) {
        chart.chartInstance.destroy();
      }
    };
  }, []);

  return (
    <Line
      ref={chartRef}
      data={data}
      options={options}
      plugins={[ChartDataLabels]}
    />
  );
};

export default MtsLineChart;
