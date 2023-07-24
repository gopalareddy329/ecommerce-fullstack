import React from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Slidertag = ({images,type,height}) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 100,

        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        
      };
      var imas=[
        images.filter((item,key)=>{
          if(item.type==="slider"){
          if(type === "all") return true
          else if(item.category === type)
              return true
          }
          else if(item.type==="shop-slider") return true
          return false
        
            
        })
    ]

    console.log(height)
    
  return (

        <Slider    {...settings}>
                    {imas[0].slice(0,5).map((items,key)=> <div key={key}  className={`h-300px] p-2  max-md:max-h-[300px]`}> <img className={`mx-auto h-[${height}px]   max-w-full`} src={items.imgUrl} alt={items.title}></img></div>)}
        </Slider>
      

  )
}

export default Slidertag
