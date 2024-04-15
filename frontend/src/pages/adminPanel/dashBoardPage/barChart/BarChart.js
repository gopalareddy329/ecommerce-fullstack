import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart,BarElement} from 'chart.js';
Chart.register(BarElement);








const BarChart = ({results}) => {
  const [openList,setOpenList]=useState(false)
  const options = {
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
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
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
  
  const data = {
    labels: 'loading',
    datasets: [
      
    ],
  };

  var label=results.x
    if (label[0].length >20) {
      label=[...Array(results.x.length).keys()]
    } 

    data.labels=label
    data.datasets.push({
      label:"label",
      data:results.y,
      backgroundColor: results.colors,
     
    })
    options.plugins.title.text=results?.title
    options.scales.x.title.text=results?.xtitle
    options.scales.y.title.text=results?.ytitle
  
  return (
    <div className='w-full h-full ' onClick={()=>(setOpenList(!openList))} >
        <div className='w-full h-full'>
          
            <Bar className=''  data={data} options={options} />
       
        </div>
        
        <ul className={'fixed transform transition-all z-20 w-[95%] ease-in-out duration-500  bg-gray-200 p-5  flex  h-fit flex-wrap gap-2  right-0 bottom-0 '+(openList ? 'translate-y-[0px]':'translate-y-[290px]')}>
              {openList && data.labels.map((item)=>(
                <li>
                  {item}:{results.x[item]}
                </li>
              ))}
        </ul>
       
    </div>
  )
}

export default BarChart