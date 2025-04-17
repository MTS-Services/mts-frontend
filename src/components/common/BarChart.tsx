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
    label = 'Dataset lebel',
    // backgroundColor,
    // borderColor,
    borderWidth = 1,
    borderRadius = 4,
    yAxisTitle = '',
    xAxisTitle = '',
    chartWidth = '',
    className = '',
    formatter = (val) => val,
  } = props;

  // Format data for ChartJS
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Order Amount',
        data: data.map((item) => item.order_amount),
        backgroundColor: '#267e94',
        borderColor: '#000000',
        borderWidth: borderWidth,
        borderRadius: borderRadius,
      },

      {
        label: 'After Fiverr Amount',
        data: data.map((item) => item.after_fiverr_amount),
        backgroundColor: '#008bc750',
        borderColor: '#000000',
        borderWidth: borderWidth,
        borderRadius: borderRadius,
      },

      {
        label: 'Bonus',
        data: data.map((item) => item.bonus),
        backgroundColor: '#db9a00',
        borderColor: '#000000',
        borderWidth: borderWidth,
        borderRadius: borderRadius,
      },
      // Other datasets can be added here if needed
      // ...
    ],
  };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: title,
  //     },
  //     tooltip: {
  //       callbacks: {
  //         label: function (context) {
  //           const value = context.raw;
  //           return `${label}: ${formatter(value)}`;
  //         },
  //       },
  //     },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       title: {
  //         display: true,
  //         text: yAxisTitle,
  //       },
  //       ticks: {
  //         callback: function (value) {
  //           return formatter(value);
  //         },
  //       },
  //     },
  //     x: {
  //       beginAtZero: true,
  //       title: {
  //         display: true,
  //         text: xAxisTitle,
  //       },
  //     },
  //   },
  // };
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
          color: 'rgba(255, 255, 255, 0.2)', // X-axis grid lines color
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
