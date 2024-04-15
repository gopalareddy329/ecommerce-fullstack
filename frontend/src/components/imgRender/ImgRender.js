import React,{useState} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ImgRender = ({src,alt,className}) => {
    const [isLoading, setIsLoading] = useState(true);
    const handleImageLoad = () => {
        setIsLoading(false);
      };
    const changeImage = (e)=>{

        e.target.src="https://i.pinimg.com/originals/2e/60/07/2e60079f1e36b5c7681f0996a79e8af4.jpg"
        setIsLoading(false)
    }
  return (

    <div className="w-full h-full">
            {isLoading && (
            <div className={' w-full h-full ' +className}>
                <div className={'rounded-[12px] w-full h-full min-h-[300px]  skeleton '}>
                    <div className={'flex flex-col ' }>
                        <div className='w-full h-full mb-[10px] '></div>
                        <div className='h-full  '></div>
                    </div>
                </div>
            </div>
        )}


          {!isLoading && (
            <LazyLoadImage 
            onLoad={handleImageLoad}
            onError={(e)=>(changeImage(e))}
            alt={alt} 
            src={src} 
            effect="blur"
            className={className || ""}
            />
          )}
    </div>
  )
}

export default ImgRender