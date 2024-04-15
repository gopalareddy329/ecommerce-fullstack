import { PieChart as Pie} from 'react-minimal-pie-chart';

import React from 'react'
import Legend from '../../../../components/legend/Legend';

var data=[]

const PieChart = ({metaData}) => {
  console.log(metaData)
    metaData.data.filter((item,key)=>{
        data.push({
          title:metaData.legendLabels[key],
          value:item,
          color: metaData.colors[key],
        })
        return null
      })
      
      
  return (
    <div className='w-full h-full flex flex-col relative p-2'>
        <h1 className='mx-auto'>{metaData.title}</h1>
        <div className="flex flex-col absolute  text-[10px] right-0 bottom-0" >
                <Legend data={data}/>
        </div>
        <div className='w-full h-[90%]  flex justify-center items-center'>
            <Pie className='hover:text-[4px] text-[0px] h-full w-full' label={({ dataEntry }) => `${dataEntry.percentage.toFixed(2)} %`}
                data={data}
                />;
        </div>
    </div>
  )
}

export default PieChart