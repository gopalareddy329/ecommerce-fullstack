import React from 'react'

const ImgRender = ({src,alt,className}) => {
    const changeImage = (e)=>{

        e.target.src="https://i.pinimg.com/originals/2e/60/07/2e60079f1e36b5c7681f0996a79e8af4.jpg"
    }
  return (
    <img onError={(e)=>{changeImage(e)}} alt={alt} src={src} className={className}/>
  )
}

export default ImgRender