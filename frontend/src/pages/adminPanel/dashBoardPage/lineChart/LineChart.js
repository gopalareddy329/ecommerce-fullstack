import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale,LineElement, LinearScale,Title, PointElement, LineController } from 'chart.js';
Chart.register(CategoryScale, LinearScale,Title,LineElement, PointElement, LineController);



let options = {
    responsive: true,
    plugins: {
      title: {
         display: true,
         text: 'Bar Graph'
       },
       legend:{
        display: true,
        position:"bottom",
       }
    },
    
    scales: {
      x: {
        title: {
            display: true,
            text: 'x-axis'
        }
        ,
        grid: {
          display: false
        }
      },
      y: {
        
        title: {
          display: true,
          text: 'y-axis'
        },
        grid: {
          display: false
        }
      },
    },
  };
  
let data = {
    labels: 'loading',
    datasets: [],
    
  };
const LineChart = ({metaData}) => {
    data.labels=[200,400,600,800,1000,1200,1400]
    metaData.data.filter((item,key)=>{
      data.datasets.push({
        label:"label",
        data:item,
        borderColor: metaData.colors[key],
        fill: false,
      })
      return null
    })
    

    options.plugins.title.text=metaData?.title
    options.scales.x.title.text=metaData?.xtitle
    options.scales.y.title.text=metaData?.ytitle

  return (
    <div className='w-full h-full'>
      <Line data={data} options={options}/>
    </div>
  )
}

export default LineChart