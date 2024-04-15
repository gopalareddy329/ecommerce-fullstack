import React from 'react';
import { Bar } from 'react-chartjs-2';

const HistogramGraph = ({ chartData }) => {
  // Chart data
  const data = {
    labels: chartData.bins.map(value => value.toFixed(2)), // Use bin values as x-labels
    datasets: [
      {
        label: 'Frequency',
        data: chartData.frequencys,
        backgroundColor: chartData.colors, 
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
         display: true,
         text: chartData.title
       },
       
    },
    
    scales: {
      x: {
        stacked: true,
        title: {
            display: true,
            text: chartData.xtitle,
            
        },
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: chartData.ytitle
        },
        grid: {
          display: false
        }
        
       
        
      },
    },
  };
  



  return <Bar data={data} options={options} />;
};

export default HistogramGraph;
