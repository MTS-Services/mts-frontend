import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useRef } from "react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = ({
  data,
  title = "",
  label = "Dataset label",
  borderWidth = 1,
  borderRadius = 4,
  yAxisTitle = "",
  xAxisTitle = "",
  chartWidth = "",
  className = "",
  formatter = (val) => val,
}) => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // 🔁 Destroy previous chart instance before creating new
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const chartData = {
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: "Order Amount",
          data: data.map((item) => item.order_amount),
          backgroundColor: "#267e94",
          borderColor: "#000000",
          borderWidth,
          borderRadius,
        },
        {
          label: "After Fiverr Amount",
          data: data.map((item) => item.after_fiverr_amount),
          backgroundColor: "#008bc750",
          borderColor: "#000000",
          borderWidth,
          borderRadius,
        },
        {
          label: "Bonus",
          data: data.map((item) => item.bonus),
          backgroundColor: "#db9a00",
          borderColor: "#000000",
          borderWidth,
          borderRadius,
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
          },
        },
        title: {
          display: !!title,
          text: title,
          color: "#aaa",
          font: { size: 16 },
        },
        tooltip: {
          callbacks: {
            label: (context) => `${label}: ${formatter(context.raw)}`,
          },
          backgroundColor: "rgba(0,0,0,0.7)",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: !!yAxisTitle,
            text: yAxisTitle,
            color: "#ffffff",
          },
          ticks: {
            color: "#aaaaaa",
            callback: (value) => formatter(value),
          },
        },
        x: {
          title: {
            display: !!xAxisTitle,
            text: xAxisTitle,
            color: "#ffffff",
          },
          ticks: {
            color: "#aaaaaa",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.2)",
          },
        },
      },
    };

    // ✅ Create new Chart
    chartInstanceRef.current = new ChartJS(ctx, {
      type: "bar",
      data: chartData,
      options,
    });

    // 🧹 Clean up
    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [
    data,
    title,
    label,
    borderWidth,
    borderRadius,
    yAxisTitle,
    xAxisTitle,
    formatter,
  ]);

  return (
    <div style={{ width: chartWidth }} className={className}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default BarChart;
