import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: ['Principal', 'Total Interest'],
    datasets: [
      {
        data: [data.loanAmount, data.totalInterest],
        backgroundColor: ['#3B82F6', '#EF4444'],
        borderColor: ['#fff'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#1F2937',
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Loan Breakdown',
        color: '#1F2937',
        font: {
          size: 18,
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;