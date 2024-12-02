import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const BalanceChart = ({ data }) => {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Balance",
        data: data,
        fill: false,
        borderColor: "#6366F1", // Tailwind indigo-500
        tension: 0.4,
        pointBackgroundColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 3,
        pointHoverBackgroundColor: "#6366F1",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}k`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          callback: (value) => `${value}k`,
          font: {
            family: "Inter, sans-serif",
          },
        },
        grid: {
          color: "#F3F4F6", // Tailwind gray-200
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Inter, sans-serif",
          },
        },
      },
    },
  };

  return (
    <div className="h-64 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default BalanceChart;
