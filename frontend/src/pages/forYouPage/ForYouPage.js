import React, { useContext } from 'react'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import AuthFetch from '../../hooks/AuthFetch'
import AuthContext from '../../context/AuthContext'
import Products from '../../components/products/Products'
const ForYouPage = () => {
  const {authToken} =useContext(AuthContext)

  const {data,loading,error}=AuthFetch(authToken,"/predict_user/30")
 
    
  return (
    <div>
        <ContentWrapper>
            <div className='my-10 mx-auto  '>
                <div>
                    <h1 className='text-red-500 border-l-[5px] border-red-500 p-2'>Recommend For You</h1>
                </div>
                <div className='mt-20'>
                      <Products data={data.result} loading={loading} error={error}/>
                </div>

            </div>
        </ContentWrapper>
    </div>
  )
}

export default ForYouPage