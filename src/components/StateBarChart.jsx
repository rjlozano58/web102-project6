import React, { useState, useEffect } from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StateBarChart = ({ bars }) => {
  const [stateCounts, setStateCounts] = useState({});

  useEffect(() => {
    const counts = {};
    bars.forEach(bar => {
      counts[bar.state] = (counts[bar.state] || 0) + 1;
    });
    setStateCounts(counts);
  }, [bars]);

  const data = {
    labels: Object.keys(stateCounts),
    datasets: [
      {
        label: 'Number of Bars',
        backgroundColor: '#ffda75',
        borderColor: 'black',
        borderWidth: 2,
        data: Object.values(stateCounts),
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color:'white',
          font: {
            size: 20, // Change the font size of the x-axis labels
            color:'white'
          },
        },
      },
      y: {
        ticks: {
          color:'white',
          font: {
            size: 20, // Change the font size of the y-axis labels
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Number of Bars in Each State',
        color:'white',
        font: {
          weight: 'bold', // Make the title bold
        },
      },
      subtitle: {
        display: true,
        text: 'Your Subtitle Here',
        color:'white',
        font: {
          weight: 'bold', // Make the subtitle bold
        },
      },
      legend: {
        labels: {
          color:'white',
          font: {
            size: 12, // Change the font size of the legend labels
          },
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StateBarChart;
