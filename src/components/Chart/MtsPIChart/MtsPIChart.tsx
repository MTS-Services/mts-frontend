import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const MtsPIChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: [
      "Team Target",
      "Team Delivery",
      "Team Assigned",
      "Team Cancelled",
      "Total Submitted",
      "Need to Assign",
    ],
    datasets: [
      {
        label: "Team Stats",
        data: [12, 19, 8, 5, 14, 9],
        backgroundColor: [
          "#FFB22C",
          "#FA812F",
          "#F3C623",
          "#CB0404",
          "#FEF3E2",
          "#77CDFF",
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 50, // Make it look like a donut chart
    rotation: -0.5 * Math.PI, // Rotate the chart to start from the top
    plugins: {
      legend: {
        position: "left", // Move the legend to the left
        labels: {
          color: "#ffffff",
          font: {
            family: "'Rubik', sans-serif",
            size: 16, // Larger font size
            lineHeight: 1.4,
          },
          padding: 20, // Adds padding between the legend items (gap)
        },
      },
      tooltip: {
        backgroundColor: "#333333",
        titleColor: "#fff",
        bodyColor: "#fff",
        titleFont: {
          family: "'Rubik', sans-serif",
        },
        bodyFont: {
          family: "'Rubik', sans-serif",
        },
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw + "%";
          },
        },
      },
    },
    animation: {
      animateRotate: true, // Add rotation animation on load
      animateScale: true, // Add scale animation on load
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

  return <Pie ref={chartRef} data={data} options={options} />;
};

export default MtsPIChart;
