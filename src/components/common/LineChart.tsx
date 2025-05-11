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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = ({
  data,
  title = "",
  label = "Dataset label",
  borderWidth = 2,
  tension = 0.4,
  yAxisTitle = "",
  xAxisTitle = "",
  chartWidth = "",
  className = "",
  formatter = (val) => val,
}) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // Destroy previous chart instance before rendering new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new ChartJS(ctx, {
      type: "line",
      data: {
        labels: data.map((item) => item.name),
        datasets: [
          {
            label,
            data: data.map((item) => item.amount),
            fill: false,
            borderColor: "#0190ce",
            backgroundColor: "#38bdf8",
            borderWidth,
            tension,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
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
            font: {
              size: 16,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw;
                return `${label}: ${formatter(value)}`;
              },
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
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
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
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [
    data,
    title,
    label,
    tension,
    borderWidth,
    yAxisTitle,
    xAxisTitle,
    formatter,
  ]);

  return (
    <div style={{ width: chartWidth }} className={className}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default LineChart;
