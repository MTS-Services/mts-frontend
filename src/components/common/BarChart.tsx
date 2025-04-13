import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = (props) => {
  const {
    data,
    title = '',
    label = 'Dataset',
    backgroundColor = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
    ],
    borderColor = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
    ],
    borderWidth = 1,
    borderRadius = 4,
    yAxisTitle = '',
    xAxisTitle = '',
    chartWidth = '',
    className = '',
  } = props;

  // Format data for ChartJS
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: label,
        data: data.map((item) => item.amount),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
      },
      // Other datasets can be added here if needed
      // ...
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisTitle,
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: xAxisTitle,
        },
      },
    },
  };

  return (
    <div style={{ width: chartWidth }} className={className}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
