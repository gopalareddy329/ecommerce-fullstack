import React, { useEffect, useState } from 'react'
import {FaHistory} from 'react-icons/fa'
import {AiFillBell} from 'react-icons/ai'
import {BsFillSunFill} from 'react-icons/bs'
import Chart from '../components/Chart.png'
import { csv } from 'd3-request';
import url from '../data/data.csv';


const Dashboard = () => {
    const [data, setData] = useState([]);


    useEffect( ()=>{
        const load = async () =>{
            await csv(url,function   (err, item){
                setData(item)
                
           }
           )
           
        }
        load();
    })
    

  return (
    
    <div className='p-0 poppins m-0 block bg-[#1C1C1C] text-white h-screen'>
      <div className='flex justify-between p-5 items-center border-b-[1px] border-gray-500'>
            <div>
                <span className='text-[30px]'>Dashboard / Default</span>
            </div>
            <div className='flex justify-between gap-8 items-center'>
                <input className='rounded-[8px] bg-gray-700 bg-opacity-[80%] p-[4px] px-4 shadow-xl placeholder-white placeholder-opacity-[80%]' placeholder="Search" type='text'/>
                <span><BsFillSunFill/></span>
                <span><FaHistory/></span>
                <span><AiFillBell/></span>
            </div>
      </div>

      <div className='p-5 block'>
        <div>
            <select className='bg-transparent font-inner text-[14px] font-[600] '>
                <option>Today</option>
                <option>Month</option>
                <option>Year</option>
            </select>
        </div>

        <div className='my-[16px] inline-flex gap-5 w-[100%] justify-center '>
        <div className='w-[30vw] max-w-[300px] bg-[#E3F5FF] text-black p-6 rounded-[10px]'>
                <h2 className='font-[600] text-[14px] '>Total Sales</h2>
                <div className='inline-flex justify-between gap-4 items-center leading-[50px] w-[100%]'>
                    <span className='font-[600] text-[24px] '>{data.length}</span>

                </div>
            </div>
            <div className='w-[30vw] max-w-[300px]  bg-[#E3F5FF] text-black p-6 rounded-[10px]'>
                <h2 className='font-[600] text-[14px] '>This Month Sales</h2>
                <div className='inline-flex justify-between gap-4 items-center leading-[50px] w-[100%]'>
                    <span className='font-[600] text-[24px] '>34000</span>
                    <span className='justify-end'>+11.0.1%</span>
                </div>
            </div>
            <div className='w-[30vw] max-w-[300px] bg-[#E3F5FF] text-black p-6 rounded-[10px]'>
                <h2 className='font-[600] text-[14px] '>Today Sales</h2>
                <div className='inline-flex justify-between gap-4 items-center leading-[50px] w-[100%]'>
                    <span className='font-[600] text-[24px] '>721</span>
                    <span className='justify-end'>+11.0.1%</span>
                </div>
            </div>
            
        </div>

        <div className='grid grid-cols-my-grid mt-10 gap-8 max-h-[350px]'>

            <div className='block bg-zinc-800 p-5 rounded-[15px] max-h-[450px]'>
                <div className='text-[1.2vw] flex justify-between w-[100%]'>
                    <h3 className='font-bold text-opacity-[100%]'>Total Sales</h3>
                    <h5 className='text-white text-opacity-[40%]'>Operating Status</h5>
                    <h5 className='text-white text-opacity-[40%]'>Current Week</h5>
                </div>
                <div className=' h-[100%] max-h-[400px]' >
                    <img src={Chart} className='w-[100%] max-h-[300px]' alt='graph'/>
                   
                </div>

            </div>

            <div className='bg-zinc-800 p-5 text-[16px] leading-[40px] rounded-[15px]'>
                <h1 className='font-bold text-[24px]'>Top</h1>
                <div className='flex justify-between'><span>Google</span><span>80%</span></div>
                <div className='flex justify-between'><span>youtube</span><span>80%</span></div>
                <div className='flex justify-between'><span>Instagram</span><span>80%</span></div>
                <div className='flex justify-between'><span>Google</span><span>80%</span></div>

            </div>
            
        </div>
        <div>
            
        </div>

      </div>
      
    </div>
  )
}

export default Dashboard
