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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ProjectsChart = ({
  data,
  title = "",
  label = "Dataset label",
  borderWidth = 1,
  borderRadius = 4,
  yAxisTitle = "",
  xAxisTitle = "",
  chartWidth = "",
  className = "",
}) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // Destroy previous instance before re-creating
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: data.map((item) => item.name),
        datasets: [
          {
            label,
            data: data.map((item) => item.amount),
            backgroundColor: "#aaaaaaaa",
            borderColor: "#a5f3eb",
            borderWidth,
            borderRadius,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: !!title,
            text: title,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: !!yAxisTitle,
              text: yAxisTitle,
            },
          },
          x: {
            title: {
              display: !!xAxisTitle,
              text: xAxisTitle,
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [data, title, label, borderWidth, borderRadius, yAxisTitle, xAxisTitle]);

  return (
    <div style={{ width: chartWidth }} className={className}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ProjectsChart;
