import React from 'react'
import Card from './card/Card'
import ProductsFetch from '../../hooks/ProductsFetch'
import ContentWrapper from '../contentWrapper/ContentWrapper'


const Products = () => {
  const {data,error,loading}=ProductsFetch('https://dummyjson.com/products')

  if(error){
    return <div>Error</div>
  }
  
  return (
    <div>
      <ContentWrapper>

            <div className='text-black  mx-auto flex flex-wrap justify-center  gap-5'>
              {loading  && <Card  loading={loading} numItems={30} />}
             
                  {data && data?.products?.map(item => (
                  <div className='w-[300px]' key={item.id}>
                    <Card item={item} loading={loading}/>
                  </div>
                  ))}
              
            </div>

      </ContentWrapper>
        
    </div>
  )
}

export default Products