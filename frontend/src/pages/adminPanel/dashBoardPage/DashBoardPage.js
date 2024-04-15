import React, { useContext, useEffect, useState } from 'react';
import { Line, Bar, Pie, Scatter } from 'react-chartjs-2';
import BarChart from './barChart/BarChart';
import PieChart from './pieChart/PieChart';
import HistogramChart from './histChart/HistChart';
//import { Chart, CategoryScale, LinearScale,Title, PointElement, LineController, BarElement } from 'chart.js';
import LineChart from './lineChart/LineChart';
//import { Chart as ChartJS, LineElement,ArcElement } from 'chart.js';
//Chart.register(CategoryScale, LinearScale,Title, PointElement, LineController, BarElement,ArcElement);
//ChartJS.register(LineElement, PointElement, LinearScale);
// Your component code here
import AuthFetch from '../../../hooks/AuthFetch';
import AuthContext from '../../../context/AuthContext'
const metaData={
  title:"Parallel Coordinate Plot of Product Attributes",
  data:[[65, 59, 80, 81, 56, 55, 40],[28, 48, 40, 19, 86, 27, 90],[20, 40, 50, 29, 96, 25, 90]],
  xlables:[65, 59, 80, 81, 56, 55, 40],
  colors:["rgba(0,1,192,0.5)","rgba(70,100,19,0.5)","rgba(255,0,19,0.5)"],
  xtitle:"Attribute",
  ytitle:"Value",
  legendLabels:["rating","discounted_price","rating_count"]
}

const BarGrahpData  ={
  title:"Parallel Coordinate Plot of Product Attributes",
  data:[
    [863., 221., 92., 56., 41., 23., 14., 16., 10., 28., 16., 6., 13., 3., 10., 3., 3., 6., 1., 3., 2., 2., 3., 2., 4., 3., 1., 1., 1., 4.],
    [1.101e+03, 1.390e+02, 3.300e+01, 3.700e+01, 3.000e+01, 1.000e+01, 3.000e+01, 1.400e+01, 9.000e+00, 8.000e+00, 7.000e+00, 3.000e+00, 4.000e+00, 5.000e+00, 7.000e+00, 3.000e+00, 7.000e+00, 2.000e+00, 3.000e+00, 0.000e+00, 0.000e+00, 2.000e+00, 2.000e+00, 3.000e+00, 0.000e+00, 0.000e+00, 0.000e+00, 1.000e+00, 0.000e+00, 0.000e+00],
],
  colors:["rgba(255,0,0,1)","rgba(0,0,255,1)","rgba(0,0,255,1)"],
  xtitle:"Attribute",
  ytitle:"Value",
  legendLabels:["rating","discounted_price","rating_count"]
}

function Dashboard() {
  const [results,setResults]=useState(null)
  const {authToken} =useContext(AuthContext)
  const {data}=AuthFetch(authToken,'/get_graph_data')
  useEffect(()=>{
    console.log(data)
  },[data])
  

  
  return (
    <div className='w-full h-full ml-5'>
       <h1 className=' mx-auto text-center py-2 text-[32px] font-[500] w-full'>Dashboard</h1>
      <div className="flex flex-wrap justify-center gap-2">
        {/* <div className='w-[600px] h-[300px] bg-white shadow-xl p-2'>
          <LineChart metaData={metaData}/>
        </div> */}
        
            {data?.result?.bar?.map((item,key)=>(
              <div  key={key} className='w-[600px] h-[300px] bg-white shadow-xl p-2'>
                
                <BarChart results={item}/>
              </div>
            ))} 

        

            {data?.result?.hist?.map((item,key)=>(
                <div key={key} className='w-[600px] h-[300px] bg-white shadow-xl p-2'>
                    <HistogramChart chartData={item}/>
                </div>
            ))}

            {data?.result?.hist?.map((item,key)=>(
                <div key={key} className='w-[600px] h-[300px] bg-white shadow-xl p-2'>
                    {data?.result?.pie &&(<PieChart metaData={data?.result?.pie[0]}/>)}
                </div>
            ))}

            {data?.result?.line?.map((item,key)=>(
                <div key={key} className='w-[600px] h-[300px] bg-white shadow-xl p-2'>
                    {data?.result?.pie &&(<LineChart metaData={data?.result?.line[0]}/>)}
                </div>
            ))}
          
       
      

        
        {/* <ResizeableDiv>

          
        </ResizeableDiv> */}
      </div>
      {/* <Bar data={data} options={options} />
       />
      <Scatter data={data} options={options} /> */}
    </div>
  );
}

export default Dashboard;