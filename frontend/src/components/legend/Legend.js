import React from 'react'

const Legend = ({data}) => {
  return (
    <div>
        {data.map((item, index) => (
                
                <div key={index} className="flex items-center mb-2">
                <div style={{backgroundColor:`${item.color}`}} className={`w-4 h-4 mr-2`}></div>
                <span>{item.title}</span>
                </div>
        ))}
    </div>
  )
}

export default Legend