import { BiSolidLeftArrowCircle } from 'react-icons/bi';
import { MdOutlineClear } from 'react-icons/md';
import '../../styles/cart.css';
import { FaRupeeSign } from 'react-icons/fa';
import { BsFilePlusFill, BsFileMinusFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { CartConsumer } from '../../context/cartContext';

const Cart = () => {
  const { showCartFunc } = CartConsumer();

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
        <div className='cartHeader-cancelBtn'>
          <p>Clear</p>
          <span>
            <MdOutlineClear />
          </span>
        </div>
      </div>
      <div className='cartMain'>
        <div className='cartItemContainer'>
          <div className='cartItem'>
            <div className='cartItem-left'>
              <img
                src='https://firebasestorage.googleapis.com/v0/b/fooddeliveryapp-e0bc5.appspot.com/o/Images%2F1691939248951%2Fc7.png?alt=media&token=b4b72a09-f5b5-4c3b-aff9-d4dc5be6a716'
                alt='img'
              />
              <div className='cartItem-details'>
                <h5>Chicken 65</h5>
                <div className='cartItem-priceContainer'>
                  <span className='cartItemPriceIcon'>
                    <FaRupeeSign />
                  </span>
                  <span className='cartItemPrice'>150</span>
                </div>
              </div>
            </div>
            <div className='cartItem-right'>
              <span>
                <BsFilePlusFill />
              </span>
              <p>
                <p>55</p>
              </p>
              <span>
                <BsFileMinusFill />
              </span>
            </div>
          </div>
        </div>
        <div className='cartTotalContainer'>
          <div className='subTotal'>
            <p>Sub Total</p>
            <div className='cartAmtContainer'>
              <span className='cartAmtContainer-icon'>
                <FaRupeeSign />
              </span>
              <span className='cartAmtContainer-price'>5525</span>
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
              <span className='cartAmtContainer-totalPrice'>25</span>
            </div>
          </div>
          <button className='cartCheckOut-btn'>Check Out</button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
