import  { useEffect, useState } from 'react'
//import API_BASE from '../utlis/api'

const ProductsFetch = (url) => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    useEffect(()=>{
        setLoading(true)
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchData = async() =>{
            try{
                const res= await fetch(url,signal)
                const response = await res.json()
                setData(response);
                
            }
            catch(err){
                if (err.name === 'AbortError') {
                    console.log('Request was aborted');
                    return;
                }
                setError(err)
                console.log("Error",(err))
            }
            finally{
                setLoading(false)
            }

        }
        fetchData()
        return ()=>{
            abortController.abort();
        }
    },[url])
  return {data, loading, error}
}

export default ProductsFetch