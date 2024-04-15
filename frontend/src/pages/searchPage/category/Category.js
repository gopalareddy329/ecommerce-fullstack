import React, { useEffect, useState } from 'react'
import DropDown from '../../../components/dropDown/DropDown'
const Category = ({categorys,setSelectCategory}) => {
    const [options,setOptions]=useState(null)
    useEffect(() => {
      var temp = [];
      categorys?.map((item) => {
          temp.push({ label: item, value: item });
          return null
      });
      setOptions(temp);
  }, []);
  
  return (
    <div className=' w-full  px-2 max-w-[20rem] mx-auto'>
        {options && <DropDown options={options} setSelectCategory={setSelectCategory}/>}
    </div>
  )
}

export default Category