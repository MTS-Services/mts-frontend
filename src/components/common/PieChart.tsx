import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { useEffect, useRef } from "react";

// Register Pie chart components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({
  data,
  title = "",
  cutout = 0,
  backgroundColor,
  borderColor,
  borderWidth = 0.5,
  legendPosition = "bottom",
  maintainAspectRatio = true,
  width = "",
  height = "",
  className = "",
}) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const generateColorArray = (count, alpha = 0.6) => {
    const baseColors = [
      [25, 150, 200],
      [25, 150, 250],
      [25, 140, 220],
      [25, 160, 230],
      [25, 180, 240],
      [25, 180, 250],
      [25, 120, 200],
      [25, 150, 150],
      [250, 200, 100],
      [10, 200, 150],
    ];

    return Array.from({ length: count }, (_, i) => {
      const [r, g, b] = baseColors[i % baseColors.length];
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    });
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const bgColor = backgroundColor ?? generateColorArray(data.length, 0.6);
    const bColor = borderColor ?? generateColorArray(data.length, 1);

    chartRef.current = new ChartJS(ctx, {
      type: "pie",
      data: {
        labels: data.map((item) => item.name),
        datasets: [
          {
            label: "Order Amount",
            data: data.map((item) => item.order_amount),
            backgroundColor: bgColor,
            borderColor: bColor,
            borderWidth: borderWidth,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio,
        cutout,
        plugins: {
          legend: {
            position: legendPosition,
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
              label: function (context) {
                const label = context.label || "";
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              },
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
    cutout,
    backgroundColor,
    borderColor,
    borderWidth,
    legendPosition,
    maintainAspectRatio,
  ]);

  return (
    <div style={{ width, height }} className={className}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PieChart;
