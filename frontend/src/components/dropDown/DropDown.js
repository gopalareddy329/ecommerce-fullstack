import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";



const DropDown = ({options,setSelectCategory}) => {
  const [selected, setSelected] = useState([]);
  
  useEffect(()=>{
    setSelectCategory(selected.map((item)=>(item.value)))
  },[selected,setSelectCategory])

  return (
    <div>
     <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Filter By"}
        hasSelectAll={false}
        disableSearch={true}
      />
    </div>
  );
};

export default DropDown;