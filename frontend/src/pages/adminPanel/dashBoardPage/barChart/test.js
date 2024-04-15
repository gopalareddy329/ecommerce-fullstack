import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart,BarElement} from 'chart.js';
Chart.register(BarElement);






var options = {
    responsive: true,
    plugins: {
      title: {
         display: true,
         text: 'Bar Graph'
       },
       
    },
    
    scales: {
      x: {
        stacked: true,
        title: {
            display: true,
            text: 'x-axis',
            
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'y-axis'
        },
        
       
        
      },
    },
  };
  
var data = {
    labels: 'loading',
    datasets: [
      
    ],
  };


const BarChart = ({BarGrahpData}) => {
  var labels=[0,10000,20000,30000,40000,50000,60000]
    data.labels=labels
    BarGrahpData.data.filter((item,key)=>{
      data.datasets.push({
        label:"label",
        data:item,
        backgroundColor: BarGrahpData.colors[key],
       
      })
      return null
    })
    options.plugins.title.text=BarGrahpData?.title
    options.scales.x.title.text=BarGrahpData?.xtitle
    options.scales.y.title.text=BarGrahpData?.ytitle
  return (
    <div className='w-full h-full'>
        <Bar data={data} options={options}/>
    </div>
  )
}

export default BarChart