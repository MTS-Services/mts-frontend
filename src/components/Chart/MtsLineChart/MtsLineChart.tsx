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
import { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

// Register necessary components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
);

const MtsLineChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#36A2EB",
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
          color: "#ffffff",
          font: {
            family: "'Rubik', sans-serif",
            size: 14,
            lineHeight: 1.4,
          },
        },
      },
      title: {
        display: true,
        text: "Monthly Sales Report",
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
        titleFont: {
          family: "'Rubik', sans-serif",
        },
        bodyFont: {
          family: "'Rubik', sans-serif",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
          font: {
            family: "'Rubik', sans-serif",
          },
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
          stepSize: 20,
          font: {
            family: "'Rubik', sans-serif",
          },
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
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

  return <Line ref={chartRef} data={data} options={options} />;
};

export default MtsLineChart;
