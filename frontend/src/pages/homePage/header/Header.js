import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

const Header = () => {
  return (
    <div className="">
      <ContentWrapper className="bg-white p-4 md:w-[95%] w-full mx-auto rounded-lg shadow-md">
  

          <div className="flex max-md:flex-col justify-between mt-4 gap-5 max-md:items-center md:p-5">
                <div className='max-md:order-2 text-2xl md:border-r md:w-[20%] p-2 w-full'>
                      <ul className='md:leading-[3rem] max-md:flex max-md:text-xl max-md:w-full  justify-between items-between'>
                          <li className="text-gray-600">Wine</li>
                          <li className="text-gray-600">Fruits</li>
                          <li className="text-gray-600">Gold</li>
                          <li className="text-gray-600">Meat</li>
                      </ul>
                    
                </div>
                <div className="text-gray-600 ">
                  <img alt="header" className='md:aspect-[4/2] aspect-[4/3] object-cover' src="https://www.superiorssteakhouse.com/assets/uploads/2017/12/wine-header.jpg"/>
                </div>
          </div>
          </ContentWrapper>
      </div>
  )
}

export default Header