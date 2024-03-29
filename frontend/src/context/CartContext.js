// CartContext.js
import React, { createContext, useReducer } from 'react';

const CartContext = createContext();
export default CartContext
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
  const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);

  if (existingItemIndex !== -1) {
    // Item already exists in the cart, increase its quantity
    const updatedItems = state.items.map((item, index) => {
      if (index === existingItemIndex) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    return {
      ...state,
      items: updatedItems,
    };
  } else {
    // Item doesn't exist in the cart, add it
    return {
      ...state,
      items: [...state.items, { ...action.payload, quantity: 1 }],
    };
  }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
      case 'DECREASE_QUANTITY':
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: Math.max(item.quantity - 1, 0), // Ensure quantity doesn't go below 0
                }
              : item
          ).filter(item => item.quantity > 0), // Remove items with quantity 0
        };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};


