import logo from '../../public/images/logo.png';
import avatar from '../../public/images/avatar.png';
import emoji from '../../public/images/emoji.svg';
import '../styles/header.css';
import { GiBeachBag } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import { UserConsumer } from '../context/userContext';
import { CartConsumer } from '../context/cartContext';

const ComputerHeader = () => {
  const { showCartFunc, cartItems } = CartConsumer();
  const {
    login,
    userLoginData,
    isMenu,
    setIsMenu,
    logout,
    authContainer,
    setAuthContainer,
    isUserLogIn,
  } = UserConsumer();

  const notifyMsg = () => {
    toast.warning('Please LogIn!');
  };

  const loginEventHandler = () => {
    login();
    setAuthContainer(!authContainer);
  };

  return (
    <nav className='computerHeader'>
      <Link className='computerHeader-logo' to='/'>
        <img src={logo} alt='Profile Picture ' />
        <p className='computerHeader-logo-name'>
          Quick<span>eat</span>
        </p>
      </Link>
      <div className='computerHeader-menu'>
        <ul className='computerHeader-menu-links'>
          <li>
            <a href='#home'>Home</a>
          </li>
          <li>
            <a href='#menu'>Hot Dishes</a>
          </li>
          <li>
            <a href='#about'>Menu</a>
          </li>
          <li>
            <a href='#services'>Contact Us</a>
          </li>
        </ul>
        <motion.div
          className='computerHeader-cartContainer'
          whileTap={{ scale: 0.6 }}
          onClick={isUserLogIn ? () => showCartFunc() : notifyMsg}
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
            src={userLoginData ? emoji : avatar}
            alt='Avatar '
            onClick={
              userLoginData ? login : () => setAuthContainer(!authContainer)
            }
          />
          {authContainer && (
            <div className='computerHeader-authContainer'>
              <p onClick={loginEventHandler}>Google</p>
              <p onClick={() => setAuthContainer(!authContainer)}>
                <Link to='loginCredentials'>Login Credentials</Link>
              </p>
            </div>
          )}

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

              <div className='computerHeader-profile'>
                <Link to='profile'>
                  <span>Profile</span>
                  <span>
                    <CgProfile />
                  </span>
                </Link>
              </div>
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
