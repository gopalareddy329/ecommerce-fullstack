import React from 'react'
import Card from './card/Card'
import ContentWrapper from '../contentWrapper/ContentWrapper'


const Products = ({data,error,loading}) => {

  if(error){
    return <div>Error</div>
  }
  
  return (
    <div>
      <ContentWrapper className="mx-auto ">

            <div className='text-black  mx-auto container flex flex-wrap   gap-5'>
              {loading  && <Card  loading={loading} numItems={30} />}
             
                  {data && data?.map((item,key) => (
                  <div className='w-[300px]' key={key}>
                    <Card item={item} loading={loading}/>
                  </div>
                  ))}
              
            </div>

      </ContentWrapper>
        
    </div>
  )
}

export default Products