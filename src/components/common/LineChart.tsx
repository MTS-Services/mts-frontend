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
        borderColor: '#38bdf8',
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
      },
      title: {
        display: !!title,
        text: title,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `${label}: ${formatter(value)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: !!yAxisTitle,
          text: yAxisTitle,
        },
        ticks: {
          callback: function (value) {
            return formatter(value);
          },
        },
      },
      x: {
        title: {
          display: !!xAxisTitle,
          text: xAxisTitle,
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
