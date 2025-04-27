import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// eslint-disable-next-line react/prop-types
const PointStylingChart = ({ dataSource = [], className }) => {
  if (dataSource.length === 0) {
    return <div className="text-center text-gray-500">Không có dữ liệu</div>;
  }

  const labels = dataSource.map((item) => item.label);

  const valueKeys = Object.keys(dataSource[0]).filter((key) => key !== "label");

  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  const datasets = valueKeys.map((key, index) => ({
    label: key,
    data: dataSource.map((item) => item[key]),
    borderColor: colors[index % colors.length],
    backgroundColor: colors[index % colors.length],
    pointBackgroundColor: colors[index % colors.length], // màu nền point
    pointBorderColor: "#fff", // viền trắng
    pointRadius: 5, // kích thước point
    pointHoverRadius: 7, // kích thước khi hover
    pointStyle: "circle", // kiểu point: circle, rect, triangle, cross, star...
    tension: 0.4, // bo tròn line
    fill: false,
  }));

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={className}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PointStylingChart;
