import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components for line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = (props) => {
  const {
    data,
    title = '',
    label = 'Dataset label',
    borderWidth = 2,
    tension = 0.4,
    yAxisTitle = '',
    xAxisTitle = '',
    chartWidth = '',
    className = '',
    formatter = (val) => val,
  } = props;

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label,
        data: data.map((item) => item.amount),
        fill: false,
        borderColor: '#0190ce',
        backgroundColor: '#38bdf8',
        borderWidth,
        tension, // makes the line smooth
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff', // Legend text color
        },
      },
      title: {
        display: !!title,
        text: title,
        color: '#aaa', // Title color
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
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleColor: '#ffffff', // Tooltip title color
        bodyColor: '#ffffff', // Tooltip body color
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: !!yAxisTitle,
          text: yAxisTitle,
          color: '#ffffff', // Y-axis title color
        },
        ticks: {
          color: '#aaaaaa', // Y-axis tick labels color
          callback: function (value) {
            return formatter(value);
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Y-axis grid lines color
        },
      },
      x: {
        title: {
          display: !!xAxisTitle,
          text: xAxisTitle,
          color: '#ffffff', // X-axis title color
        },
        ticks: {
          color: '#aaaaaa', // X-axis tick labels color
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // X-axis grid lines color
        },
      },
    },
  };
  return (
    <div style={{ width: chartWidth }} className={className}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
