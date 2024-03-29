import React, { useContext ,useEffect} from 'react'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Card from '../../components/products/card/Card'
import ProductFetch from '../../hooks/ProductsFetch'
import AuthContext from '../../context/AuthContext'
const ForYouPage = () => {
    const {data,loading}=ProductFetch("https://dummyjson.com/products/2")
    const {authToken} =useContext(AuthContext)
    useEffect(() => {
      console.log(authToken)
        fetch('http://localhost:8000/api/get_personal_info/', {
            method: 'PUT', // or 'POST', 'PUT', etc. depending on your API endpoint
            headers: {
              'Authorization': `Bearer `+String(authToken.access), // Include the authentication token in the headers
              'Content-Type': 'application/json' // Set content type if necessary
            },
            body:JSON.stringify({
                "maritalstatus":"Married",
                "education":"Graduation",
                "income":200000
            })
          })
            .then(response => {
              
              return response.json();
            })
            .then(data => {
              // Handle the response data
              console.log(data);
            })
            .catch(error => {
              // Handle errors
              console.error('There was an error!', error);
            });
          
    }, [authToken])
    
  return (
    <div>
        <ContentWrapper>
            <div className='my-10 mx-auto  '>
                <div>
                    <h1 className='text-red-500 border-l-[5px] border-red-500 p-2'>Recommend For You</h1>
                </div>
                <div className='flex flex-wrap gap-5 mt-5 items-center  mx-auto justify-center'>
                  {loading  ? (<Card  loading={loading} numItems={30} />):
                  (
                    [...Array(30)].map((_,key)=>(
                    <div key={key} className=''>
                        <Card  item={data} />
                    </div>
                    ))
                  )}
                </div>

            </div>
        </ContentWrapper>
    </div>
  )
}

export default ForYouPage