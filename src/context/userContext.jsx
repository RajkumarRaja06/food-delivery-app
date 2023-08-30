import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from 'react';

import { auth, provider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { storage } from '../utils/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getProfileData } from '../utils/firebaseFunction';

import profileReducer from '../utils/reducer/profileReducer';
import { toast } from 'react-toastify';

const initialState = {
  profileData: [],
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const [userLoginData, setUserLoginData] = useState(null);
  const [isMenu, setIsMenu] = useState(false);
  const [authContainer, setAuthContainer] = useState(false);
  const [isUserLogIn, setIsUserLogIn] = useState(userLoginData);

  const [isEditing, setIsEditing] = useState(false);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [selectCity, setSelectCity] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState('');

  const userInfo =
    localStorage.getItem('user') === 'undefined'
      ? localStorage.clear()
      : JSON.parse(localStorage.getItem('user'));

  const fetchProfileData = async () => {
    await getProfileData().then((data) => {
      dispatch({ type: 'GET_PROFILE_DATA', profileData: data });
    });
  };

  const login = async () => {
    if (!userLoginData) {
      setAuthContainer(!authContainer);
      const { user } = await signInWithPopup(auth, provider);
      const { providerData } = user;
      localStorage.setItem('user', JSON.stringify(providerData[0]));
      setUserLoginData(JSON.parse(localStorage.getItem('user')));
      setIsUserLogIn(true);
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUserLoginData('');
    setIsUserLogIn(false);
  };

  const getUserProfile = () => {
    setEmail(userInfo.email);
    const filterUser = state.profileData.find(
      (item) => item.email === userInfo.email
    );
    if (filterUser) {
      if (filterUser === 'undefined') {
        setIsEditing(false);
        setName();
        setSelectCity();
        setGender();
        setImage();
        setNumber();
      } else {
        setIsEditing(true);
        setId(filterUser.id);
        setEmail(filterUser.email);
        setName(filterUser.name);
        setSelectCity(filterUser.selectCity);
        setGender(filterUser.gender);
        setImage(filterUser.image);
        setNumber(filterUser.number);
      }
    }
  };

  const getImageUrl = (event) => {
    const imageFile = event.target.files[0];

    const storageRef = ref(
      storage,
      `FoodUsersProfile/${Date.now()}/${imageFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            toast.info('Upload is Paused!');
            break;
          case 'running':
            toast.warning('Waiting for Image Upload!!');
            break;
        }
      },
      (error) => {
        console.log('Error', error);
        toast.error('Error... Try Again!');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          toast.success('Image Uploaded Successfully!');
        });
      }
    );
  };

  const emptyValue = () => {
    setName(null);
    setEmail(null);
    setNumber(null);
    setSelectCity(null);
    setGender(null);
    setImage(null);
  };

  useEffect(() => {
    setUserLoginData(userInfo);
    fetchProfileData();
  }, []);

  useEffect(() => {
    userInfo ? setIsUserLogIn(true) : setIsUserLogIn(false);
  }, [userLoginData]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        userLoginData,
        setUserLoginData,
        login,
        isMenu,
        setIsMenu,
        logout,
        authContainer,
        setAuthContainer,
        isUserLogIn,
        setIsUserLogIn,
        id,
        setId,
        name,
        setName,
        email,
        setEmail,
        number,
        setNumber,
        selectCity,
        setSelectCity,
        gender,
        setGender,
        image,
        setImage,
        isEditing,
        setIsEditing,
        getUserProfile,
        getImageUrl,
        emptyValue,
        fetchProfileData,
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
