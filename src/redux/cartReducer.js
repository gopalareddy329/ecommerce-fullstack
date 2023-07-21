import { createSlice } from "@reduxjs/toolkit";
const counter=0
const cartReducer = createSlice({
    name:'cart',
    initialState:[{counter}],
    reducers:{
        addtocart(state,action){
            state.push(action.payload)
            state[0].counter +=parseFloat(action.payload.price)
        },
        updatetocart(state,action){
            const {id} =action.payload
            const existingPost=state.find(item => item.id === id)
            if(existingPost){
                existingPost.quantity +=1
                state[0].counter +=parseFloat(existingPost.price)
            
            }
           
        }

    }
})

export const {addtocart,updatetocart} = cartReducer.actions
export default cartReducer.reducer;