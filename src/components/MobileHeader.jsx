import logo from '../../public/images/logo.png';
import avatar from '../../public/images/avatar.png';
import emoji from '../../public/images/emoji.svg';
import '../styles/header.css';
import { GiBeachBag } from 'react-icons/gi';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';

import { UserConsumer } from '../context/userContext';
import { CartConsumer } from '../context/cartContext';
import { toast } from 'react-toastify';

const MobileHeader = () => {
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
    getUserProfile,
  } = UserConsumer();

  const notifyMsg = () => {
    toast.warning('Please LogIn!');
  };

  const loginEventHandler = () => {
    login();
    setAuthContainer(!authContainer);
  };

  return (
    <nav className='mobileHeader'>
      <div
        className='mobileHeader-cartContainer'
        onClick={isUserLogIn ? () => showCartFunc() : notifyMsg}
      >
        {cartItems && cartItems.length > 0 && (
          <p className='mobileHeader-cart-count'>{cartItems.length}</p>
        )}
        <GiBeachBag className='mobileHeader-cart' />
      </div>
      <Link className='mobileHeader-logo' to='/'>
        <img src={logo} alt='Profile Picture ' />
        <p className='mobileHeader-logo-name'>
          Quick<span>eat</span>
        </p>
      </Link>
      <div className='mobileHeader-menu'>
        <div className='mobileHeader-auth'>
          <motion.img
            whileTap={{ scale: 0.6 }}
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
              <div className='mobileHeader-profile'>
                <Link to='profile' onClick={() => getUserProfile()}>
                  <span>Profile</span>
                  <span>
                    <CgProfile />
                  </span>
                </Link>
              </div>
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
