import { BiSolidLeftArrowCircle } from 'react-icons/bi';
import { MdOutlineClear } from 'react-icons/md';
import '../../styles/cart.css';
import { FaRupeeSign } from 'react-icons/fa';
import { BsFilePlusFill, BsFileMinusFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { CartConsumer } from '../../context/cartContext';

import emptyCart from '../../../public/images/emptyCart.svg';
import { useEffect, useState } from 'react';

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const {
    showCartFunc,
    cartItems,
    addToCart,
    removeToCart,
    clearCart,
    subTotal,
    itemPrice,
  } = CartConsumer();

  useEffect(() => {
    setCartData(cartItems);
  }, [cartItems]);

  return (
    <section className='cart'>
      <div className='cartHeader'>
        <motion.div
          className='cartHeader-icon'
          whileTap={{ scale: 0.6 }}
          onClick={() => showCartFunc()}
        >
          <BiSolidLeftArrowCircle />
        </motion.div>
        <p className='cartHeader-title'>Cart</p>
        <motion.div
          whileTap={{ scale: 0.6 }}
          className='cartHeader-cancelBtn'
          onClick={clearCart}
        >
          <p>Clear</p>
          <span>
            <MdOutlineClear />
          </span>
        </motion.div>
      </div>
      {cartData && cartData.length !== 0 ? (
        <div className='cartMain'>
          <div className='cartItemContainer'>
            {cartItems &&
              cartItems.map((item) => {
                const { id, imageUrl, title, quantity, price } = item;
                return (
                  <div className='cartItem' key={id}>
                    <div className='cartItem-left'>
                      <img src={imageUrl} alt={title} />
                      <div className='cartItem-details'>
                        <h5>{title}</h5>
                        <div className='cartItem-priceContainer'>
                          <span className='cartItemPriceIcon'>
                            <FaRupeeSign />
                          </span>
                          <span className='cartItemPrice'>
                            {price * quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='cartItem-right'>
                      <span onClick={() => addToCart(item)}>
                        <BsFilePlusFill />
                      </span>
                      <p>
                        <p>{quantity}</p>
                      </p>
                      <span onClick={() => removeToCart(item)}>
                        <BsFileMinusFill />
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className='cartTotalContainer'>
            <div className='subTotal'>
              <p>Sub Total</p>
              <div className='cartAmtContainer'>
                <span className='cartAmtContainer-icon'>
                  <FaRupeeSign />
                </span>
                <span className='cartAmtContainer-price'>{subTotal}</span>
              </div>
            </div>
            <div className='delivery'>
              <p>Delivery</p>
              <div className='cartAmtContainer'>
                <span className='cartAmtContainer-icon'>
                  <FaRupeeSign />
                </span>
                <span className='cartAmtContainer-price'>25</span>
              </div>
            </div>
            <div className='total'>
              <p>Total</p>
              <div className='cartAmtContainer'>
                <span className='cartAmtContainer-totalIcon'>
                  <FaRupeeSign />
                </span>
                <span className='cartAmtContainer-totalPrice'>
                  {25 + subTotal}
                </span>
              </div>
            </div>
            <button className='cartCheckOut-btn'>Check Out</button>
          </div>
        </div>
      ) : (
        <div className='emptyCart'>
          <img src={emptyCart} alt='Empty Cart' />
          <h2>Add some items to your cart</h2>
        </div>
      )}
    </section>
  );
};

export default Cart;
