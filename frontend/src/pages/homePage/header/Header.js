import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

const Header = ({catrgorys,setCategory}) => {
  return (
    <div className="">
      <ContentWrapper className="bg-white p-4 md:w-[95%] w-full mx-auto rounded-lg shadow-md">
  

          <div className="flex max-md:flex-col justify-between mt-4 gap-5 max-md:items-center md:p-5">
                <div className='max-md:order-2 text-2xl md:border-r md:w-[20%] p-2 w-full'>
                      <ul className='flex max-md:text-xl overflow-hidden max-md:w-full gap-2 md:flex-col  h-full  justify-between items-between'>
                        {catrgorys?.map((item,key)=>(
                           <li onClick={()=>(setCategory(item))} className="cursor-pointer text-gray-600 max-w-[150px] text-[clamp(10px,2vw,20px)] min-md:break-word  " key={key}>{item}</li>
                        ))}
                      
                      </ul>
                    
                </div>
                <div className="text-gray-600 ">
                  <img alt="header" className='md:aspect-[4/2] aspect-[4/3] object-cover' src="https://assets-global.website-files.com/5b5729421aca332c60585f78/62f41942e8da7967a4964400_ecommerce-product-pages.webp"/>
                </div>
          </div>
          </ContentWrapper>
      </div>
  )
}

export default Header