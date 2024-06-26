import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import ProductFetch from '../../../hooks/ProductsFetch'
import {Link} from 'react-router-dom'
import ImgRender from '../../../components/imgRender/ImgRender'
const Header = ({catrgorys,setCategory}) => {
  const {data}=ProductFetch('/get_header')
  console.log(data)
  return (
    <div>
      <ContentWrapper className="bg-white p-4 md:w-[95%] w-full mx-auto rounded-lg   shadow-m" >
  

          <div className="flex max-md:flex-col justify-between mt-4 gap-5 max-md:items-center md:p-5">
                <div className='max-md:order-2 text-2xl md:border-r md:w-[20%] p-2 w-full'>
                      <ul className='flex max-md:text-xl overflow-hidden max-md:w-full gap-2 md:flex-col  h-full  justify-between items-between'>
                        {catrgorys?.map((item,key)=>(
                           <li onClick={()=>(setCategory(item))} className="cursor-pointer text-gray-600 max-w-[150px] text-[clamp(10px,2vw,20px)] min-md:break-word  " key={key}>{item}</li>
                        ))}
                      
                      </ul>
                      
                    
                </div>
                <Link className='w-full' to={`/products/${data?.product_product_id}`}>
                <div class="w-full h-full md:aspect-[4/2] aspect-[4/3] bg-cover bg-center" style={{backgroundImage: `url('${data.image_link}')`}}></div>
                </Link>
          </div>
          </ContentWrapper>
      </div>
  )
}

export default Header