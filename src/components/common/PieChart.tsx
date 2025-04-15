import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = (props) => {
  const {
    data,
    title = '',
    cutout = 0,
    backgroundColor,
    borderColor,
    borderWidth = 0.5,
    legendPosition = 'bottom',

    maintainAspectRatio = true,
    width = '',
    height = '',
    className = '',
  } = props;

  const generateColorArray = (count, alpha = 0.6) => {
    const baseColors = [
      [25, 199, 132],
      [54, 12, 215],
      [255, 306, 86],
      [75, 192, 192],
      [103, 12, 255],
      [255, 150, 64],
      [100, 200, 83],
      [200, 100, 25],
      [255, 50, 250],
    ];

    return Array.from({ length: count }, (_, i) => {
      const [r, g, b] = baseColors[i % baseColors.length];
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    });
  };

  // Use dynamic colors if not provided via props
  const bgColor = backgroundColor ?? generateColorArray(data.length, 0.6);
  const bColor = borderColor ?? generateColorArray(data.length, 1);

  // Format data for ChartJS
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Order Amount',
        data: data.map((item) => item.order_amount),
        backgroundColor: bgColor,
        borderColor: bColor,
        borderWidth: borderWidth,
        cutout: cutout,
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
