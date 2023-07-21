import {configureStore} from '@reduxjs/toolkit'
import theamReducer from './theamReducer';
import cartReducer from './cartReducer';
const store = configureStore({
    reducer:{
        theam:theamReducer,
        cart:cartReducer
    }
})

export default store;