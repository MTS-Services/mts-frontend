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

const ProjectsChart = (props) => {
  const {
    data,
    title = '',
    label = 'Dataset lebel',
    // backgroundColor,
    // borderColor,
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
        backgroundColor: '#aaaaaaaa',
        borderColor: '#a5f3eb',
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

export default ProjectsChart;
