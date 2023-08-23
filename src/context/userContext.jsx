import { useState, useEffect, createContext, useContext } from 'react';

import { auth, provider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userLoginData, setUserLoginData] = useState(null);
  const [isMenu, setIsMenu] = useState(false);
  const [authContainer, setAuthContainer] = useState(false);

  const userInfo =
    localStorage.getItem('user') === 'undefined'
      ? localStorage.clear()
      : JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setUserLoginData(userInfo);
  }, []);

  const login = async () => {
    if (!userLoginData) {
      setAuthContainer(!authContainer);
      const { user } = await signInWithPopup(auth, provider);
      const { providerData } = user;
      localStorage.setItem('user', JSON.stringify(providerData[0]));
      setUserLoginData(JSON.parse(localStorage.getItem('user')));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUserLoginData('');
  };

  return (
    <UserContext.Provider
      value={{
        userLoginData,
        setUserLoginData,
        login,
        isMenu,
        setIsMenu,
        logout,
        authContainer,
        setAuthContainer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const UserConsumer = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider, UserConsumer };
