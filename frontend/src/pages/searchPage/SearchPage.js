import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Category from './category/Category';
import ProductsFetch from '../../hooks/ProductsFetch';
import ProductsList from './productsList/ProductsList';
const SearchPage = () => {
    const {query}=useParams()
    const [selectCategory,setSelectCategory]=useState(null)
    const {data}=ProductsFetch("/search_product/"+query+"?category="+selectCategory)
    
    const [categorys,setCategorys]=useState(null)
    
    useEffect(() => {
        const selectRandomElements = (arr, count) => {
            const result = [];
            const length = arr.length;
            for (let i = 0; i < count; i++) {
              const randomIndex = Math.floor(Math.random() * length);
              result.push(arr[randomIndex]);
            }
            return result;
          };
        if (data && data.result){
          var strings = data?.result.map(item => item?.category.split(/[&|]/));
          strings=strings.flat();
          let uniqueArray = [...new Set(strings)];
    
        
          let a=selectRandomElements(uniqueArray,5)
          setCategorys(a)
    
    
        }
      }, [data])
  return (
    <div className='max-md:mt-4'>
        <ContentWrapper>
            {categorys && <Category categorys={categorys} setSelectCategory={setSelectCategory}/>}
            <div className='mt-4'>
                <h1 className='text-[2rem] font-[500]'>Searching for {query}</h1>
                <div>
                    <ProductsList data={data}/>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default SearchPage