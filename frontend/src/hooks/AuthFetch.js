import {useState,useEffect} from 'react'
import {API_BASE} from '../utlis/api'

const AuthFetch = (authToken,url) => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    useEffect(() => {
        setLoading(true)
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchData = async() =>{
        try{
            const res = await fetch(API_BASE+url, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer `+String(authToken.access),
                'Content-Type': 'application/json'
              }
            },signal)
            const response=await res.json()
            if(res.ok){
              setData(response)
            }
            if(response?.code ==="token_not_valid"){
              throw new Error('token_not_valid');
            }
      
        }catch(err){
            if (err.name === 'AbortError') {
                console.log('Request was aborted');
                return;
            }
            setError(err)
            
        }
        finally{
            setLoading(false)
        }
        
    }
    fetchData()
    return ()=>{
            abortController.abort();
    }

            
      }, [authToken,url])

    return {data, loading, error}


}

export default AuthFetch

