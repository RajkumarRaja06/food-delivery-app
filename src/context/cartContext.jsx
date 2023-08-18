import {
  useState,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import reducer from '../utils/reducer/cartReducer';

const CartContext = createContext();

const initialState = {
  cartItems: [],
  cartShow: false,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showCartFunc = () => {
    dispatch({ type: 'SET_SHOW_CART', cartShow: !state.cartShow });
  };

  return (
    <CartContext.Provider value={{ ...state, showCartFunc }}>
      {children}
    </CartContext.Provider>
  );
};

const CartConsumer = () => {
  return useContext(CartContext);
};

export { CartContext, CartProvider, CartConsumer };
