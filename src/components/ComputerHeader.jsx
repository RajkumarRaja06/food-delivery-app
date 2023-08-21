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

const ComputerHeader = () => {
  const { showCartFunc, cartItems } = CartConsumer();
  const { login, userLoginData, isMenu, setIsMenu, logout } = UserConsumer();

  return (
    <nav className='computerHeader'>
      <div className='computerHeader-logo'>
        <img src={logo} alt='Profile Picture ' />
        <p className='computerHeader-logo-name'>Food</p>
      </div>
      <div className='computerHeader-menu'>
        <ul className='computerHeader-menu-links'>
          <li>Home</li>
          <li>Menu</li>
          <li>About us</li>
          <li>Services</li>
        </ul>
        <motion.div
          className='computerHeader-cartContainer'
          whileTap={{ scale: 0.6 }}
          onClick={() => showCartFunc()}
        >
          {cartItems && cartItems.length > 0 && (
            <p className='computerHeader-cart-count'>{cartItems.length}</p>
          )}
          <GiBeachBag className='computerHeader-cart' />
        </motion.div>
        <div className='computerHeader-auth'>
          <motion.img
            whileTap={{ scale: 0.6 }}
            img
            src={userLoginData ? userLoginData.photoURL : avatar}
            alt='Avatar '
            onClick={login}
          />
          {isMenu && (
            <div
              className='computerHeader-loginContainer'
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

              <div className='computerHeader-logout' onClick={logout}>
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

export default ComputerHeader;
