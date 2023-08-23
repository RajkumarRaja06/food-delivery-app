import {
  useState,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import reducer from '../utils/reducer/cartReducer';

const CartContext = createContext();

const initialState = {
  cartItems: [],
  subTotal: 0,
  itemPrice: 0,

  cartShow: false,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showCartFunc = () => {
    dispatch({ type: 'SET_SHOW_CART', cartShow: !state.cartShow });
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', item: item });
    toast.success('Successfully Add To Cart');
  };

  const removeToCart = (item) => {
    dispatch({ type: 'REMOVE_TO_CART', item: item });
    toast.success('Successfully removed from the cart');
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Successfully Clear Cart');
  };

  useEffect(() => {
    dispatch({ type: 'UPDATE_PRICE' });
  }, [state.cartItems]);

  return (
    <CartContext.Provider
      value={{ ...state, showCartFunc, addToCart, removeToCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

const CartConsumer = () => {
  return useContext(CartContext);
};

export { CartContext, CartProvider, CartConsumer };
