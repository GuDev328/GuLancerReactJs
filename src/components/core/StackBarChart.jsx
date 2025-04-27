import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// eslint-disable-next-line react/prop-types
const StackedBarChart = ({ dataSource = [], className }) => {
  if (dataSource.length === 0) {
    return <div className="text-center text-gray-500">Không có dữ liệu</div>;
  }

  // Lấy các nhãn (labels) cột
  const labels = dataSource.map((item) => item.label);

  // Xác định tất cả các keys trừ "label"
  const valueKeys = Object.keys(dataSource[0]).filter((key) => key !== "label");

  // Định nghĩa màu cho từng valueKey
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#8BC34A",
    "#E91E63",
    "#00BCD4",
    "#9C27B0",
  ];

  // Tạo datasets
  const datasets = valueKeys.map((key, index) => ({
    label: key,
    data: dataSource.map((item) => item[key]),
    backgroundColor: colors[index % colors.length],
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
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={className}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StackedBarChart;
