import logo from '../../public/images/logo.png';
import avatar from '../../public/images/avatar.png';
import '../styles/header.css';
import { GiBeachBag } from 'react-icons/gi';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { UserConsumer } from '../context/userContext';
import { CartConsumer } from '../context/cartContext';

const MobileHeader = () => {
  const { showCartFunc, cartItems } = CartConsumer();
  const { login, userLoginData, isMenu, setIsMenu, logout } = UserConsumer();

  return (
    <nav className='mobileHeader'>
      <div
        className='mobileHeader-cartContainer'
        onClick={() => showCartFunc()}
      >
        {cartItems && cartItems.length > 0 && (
          <p className='mobileHeader-cart-count'>{cartItems.length}</p>
        )}
        <GiBeachBag className='mobileHeader-cart' />
      </div>
      <div className='mobileHeader-logo'>
        <img src={logo} alt='Profile Picture ' />
        <p className='mobileHeader-logo-name'>Food</p>
      </div>
      <div className='mobileHeader-menu'>
        <div className='mobileHeader-auth'>
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={userLoginData ? userLoginData.photoURL : avatar}
            alt='Avatar '
            onClick={login}
          />
          {isMenu && (
            <div
              className='mobileHeader-menu-links'
              onClick={() => {
                setIsMenu(!isMenu);
              }}
            >
              {userLoginData &&
              userLoginData.email === 'rajkumarrajaco@gmail.com' ? (
                <Link to='createItem' className='computerHeader-addItem'>
                  <span>Add Item</span>
                  <span>
                    <BsPlusCircleDotted />
                  </span>
                </Link>
              ) : (
                <></>
              )}
              <ul>
                <li>Home</li>
                <li>Menu</li>
                <li>About us</li>
                <li>Services</li>
              </ul>
              <div className='mobileHeader-logout' onClick={logout}>
                <span>Logout</span>
                <span>
                  <FiLogOut />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MobileHeader;
