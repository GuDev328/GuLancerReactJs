import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import React from "react";

ChartJS.register(Tooltip, Legend, ArcElement);

// eslint-disable-next-line react/prop-types
const PieChart = ({ dataSource = [], className }) => {
  const labels = dataSource.map((item) => item.label);
  const dataValues = dataSource.map((item) => item.value);

  const chartData = {
    labels,
    datasets: [
      {
        label: null,
        data: dataValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E7E9ED",
          "#FF6384",
          "#36A2EB",
          "#FFCE56", // nhiều màu thêm nếu data dài
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  if (dataSource.length === 0) {
    return <div className="text-center text-gray-500">Không có dữ liệu</div>;
  }

  return (
    <div className={className}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
