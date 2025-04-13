import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({
  data,
  title = '',
  cutout = 0,
  backgroundColor = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)',
    'rgba(254, 129, 14, 1.7)',
    'rgba(254, 169, 140, 1.7)',
  ],
  borderColor = 'rgba(255, 255, 255, 0.8)',
  borderWidth = 1,
  legendPosition = 'top',
  maintainAspectRatio = true,
  width = '100%',
  height = '100%',
  className = 'bg-white shadow-sm rounded-lg p-6',
}) => {
  // Format data for ChartJS
  const chartData = {
    labels: data.map((item) => item.label || item.name), // Use label or name based on data structure

    datasets: [
      {
        data: data.map((item) => item.value || item.amount), // Use value or amount based on data structure
        backgroundColor: backgroundColor.slice(0, data.length),
        borderColor: borderColor,
        borderWidth: borderWidth,
        cutout: `${cutout}%`,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: maintainAspectRatio,
    plugins: {
      legend: {
        position: legendPosition,
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width, height }} className={className}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
