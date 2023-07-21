import { createSlice } from "@reduxjs/toolkit";


const theamSlice = createSlice({
    name:'theam',
    initialState:{
        theam:'#1F2937',
        color:'#FFF',
        color1:'#374151'
    },
    reducers:{
        updateTheam(state){
            if(state.theam === 'white'){
                state.theam = '#1F2937'
                state.color  ='#FFF'
                state.color1 = '#374151'
            }
            else{
                state.theam = 'white'
                state.color  ='#1F2937'
                state.color1 = '#fbf8f8'
                
            }
        }
    }
})
export const {updateTheam} =theamSlice.actions
export default theamSlice.reducer;