import React from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Slidertag = ({images,type}) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        
      };
      var imas=[
        images.filter((item,key)=>{
          if(item.type==="slider")
          if(type === "all") return true
          else if(item.category === type)
              return true
          return false
            
        })
    ]


    
  return (
    <div>
        <Slider  className='w-[300px] ' autoplay={true} {...settings}>
                    {imas[0].slice(0,5).map((items,key)=> <div key={key} className='h-[300px] '> <img className='mx-auto h-full  max-w-full' src={items.imgUrl} alt={items.title}></img></div>)}
        </Slider>
      
    </div>
  )
}

export default Slidertag
